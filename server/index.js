const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sourav-portfolio'
    await mongoose.connect(mongoURI)
    console.log('✅ MongoDB Connected Successfully')
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message)
    process.exit(1)
  }
}

// Contact Message Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  service: {
    type: String,
    required: true,
    enum: ['Logo Design', 'Branding', 'Social Media Creatives', 'Posters & Ads', 'Other']
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new'
  }
})

const Contact = mongoose.model('Contact', contactSchema)

// Admin User Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['admin', 'super_admin'],
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
})

const Admin = mongoose.model('Admin', adminSchema)

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Auth Middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    const admin = await Admin.findById(decoded.id).select('-password')
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      })
    }

    req.admin = admin
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token.'
    })
  }
}

// Create default admin user
const createDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ username: 'admin' })
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10)
      const defaultAdmin = new Admin({
        username: 'admin',
        email: 'admin@souravverma.com',
        password: hashedPassword,
        role: 'super_admin'
      })
      await defaultAdmin.save()
      console.log('🔐 Default admin created: username: admin, password: admin123')
    }
  } catch (error) {
    console.error('Error creating default admin:', error)
  }
}

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  body('service')
    .isIn(['Logo Design', 'Branding', 'Social Media Creatives', 'Posters & Ads', 'Other'])
    .withMessage('Please select a valid service'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
]

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Sourav Portfolio API is running',
    timestamp: new Date().toISOString()
  })
})

// Submit contact form
app.post('/api/contact', validateContact, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { name, email, service, message } = req.body

    // Create new contact message
    const newContact = new Contact({
      name,
      email,
      service,
      message
    })

    await newContact.save()

    console.log(`📧 New contact message from ${name} (${email})`)

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      data: {
        id: newContact._id,
        name: newContact.name,
        createdAt: newContact.createdAt
      }
    })

  } catch (error) {
    console.error('❌ Contact form error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// Admin Authentication Routes

// Admin Login
app.post('/api/admin/login', [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { username, password } = req.body

    // Find admin
    const admin = await Admin.findOne({ username })
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, admin.password)
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Update last login
    admin.lastLogin = new Date()
    await admin.save()

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin
        }
      }
    })

  } catch (error) {
    console.error('❌ Admin login error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Admin Dashboard Stats
app.get('/api/admin/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalMessages = await Contact.countDocuments()
    const newMessages = await Contact.countDocuments({ status: 'new' })
    const readMessages = await Contact.countDocuments({ status: 'read' })
    const repliedMessages = await Contact.countDocuments({ status: 'replied' })

    // Messages by service
    const messagesByService = await Contact.aggregate([
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 }
        }
      }
    ])

    // Recent messages (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentMessages = await Contact.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    })

    res.json({
      success: true,
      data: {
        totalMessages,
        newMessages,
        readMessages,
        repliedMessages,
        recentMessages,
        messagesByService
      }
    })

  } catch (error) {
    console.error('❌ Admin stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Get all messages (admin only - enhanced)
app.get('/api/admin/messages', authenticateAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const status = req.query.status
    const service = req.query.service
    const search = req.query.search

    // Build filter
    const filter = {}
    if (status && status !== 'all') filter.status = status
    if (service && service !== 'all') filter.service = service
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ]
    }

    const messages = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-__v')

    const total = await Contact.countDocuments(filter)

    res.json({
      success: true,
      data: {
        messages,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })

  } catch (error) {
    console.error('❌ Get admin messages error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Update message status (admin only)
app.patch('/api/admin/messages/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      })
    }

    const message = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: message
    })

  } catch (error) {
    console.error('❌ Update message status error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Delete message (admin only)
app.delete('/api/admin/messages/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params

    const message = await Contact.findByIdAndDelete(id)

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      })
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    })

  } catch (error) {
    console.error('❌ Delete message error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Error handler
app.use((error, req, res, next) => {
  console.error('❌ Server Error:', error)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  })
})

// Start server
const startServer = async () => {
  await connectDB()
  await createDefaultAdmin()
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📱 API Health: http://localhost:${PORT}/api/health`)
    console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`)
    console.log(`🔐 Admin Login: http://localhost:${PORT}/api/admin/login`)
  })
}

startServer().catch(error => {
  console.error('❌ Failed to start server:', error)
  process.exit(1)
})

module.exports = app