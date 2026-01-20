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

// Enhanced CORS configuration for Netlify frontend
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'https://sourav-portfolio.netlify.app', // Replace with your actual Netlify URL
    'https://your-netlify-site.netlify.app', // Replace with your actual Netlify URL
    /\.netlify\.app$/,  // Allow all Netlify subdomains
    /localhost:\d+$/    // Allow all localhost ports
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false
}))
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Handle preflight requests
app.options('*', cors(corsOptions))

// MongoDB Connection with enhanced error handling for Render
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    console.log('🔄 Connecting to MongoDB...')
    console.log('📍 Environment:', process.env.NODE_ENV)

    // Enhanced connection options for Render deployment
    const options = {
      dbName: "sourav-portfolio",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      retryWrites: true,
      w: 'majority'
    };

    await mongoose.connect(mongoURI, options);

    console.log("✅ MongoDB Connected Successfully");
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err)
    })
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected')
    })
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected')
    })
    
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    
    // More detailed error logging for debugging
    if (error.code === 'ENOTFOUND' || error.code === 'ENONAME') {
      console.error('🌐 DNS Resolution Error - Check your MongoDB URI')
      console.error('💡 Make sure your MongoDB cluster is accessible and the URI is correct')
      console.error('🔧 Verify IP whitelist in MongoDB Atlas includes 0.0.0.0/0 for Render')
    }
    
    if (error.name === 'MongoServerSelectionError') {
      console.error('🔒 Server Selection Error - Check network access and authentication')
      console.error('💡 Verify credentials and network access in MongoDB Atlas')
    }
    
    // In production, don't exit immediately - allow server to start
    if (process.env.NODE_ENV === 'production') {
      console.log('⚠️ Starting server without database connection - will retry...')
      // Don't exit in production, let the server start
    } else {
      process.exit(1);
    }
  }
};


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
  phone: {
    type: String,
    required: false,
    trim: true,
    maxlength: 20,
    match: [/^[\+]?[0-9\s\-\(\)]{10,20}$/, 'Please enter a valid phone number']
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

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  category: {
    type: String,
    required: true,
    enum: ['Logo Design', 'Branding', 'Social Media Creatives', 'Posters & Ads']
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema)

// Services Schema (INR pricing only)
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  priceINR: {
    type: Number,
    required: true,
    min: 0
  },
  features: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const Service = mongoose.model('Service', serviceSchema)

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

// Create default services
const createDefaultServices = async () => {
  try {
    const serviceCount = await Service.countDocuments()
    if (serviceCount === 0) {
      const defaultServices = [
        {
          name: 'Logo Design',
          description: 'Create memorable and impactful logos that represent your brand identity perfectly',
          priceINR: 4150,
          features: ['Custom Logo Design', 'Multiple Concepts', 'Vector Files', 'Brand Guidelines']
        },
        {
          name: 'Branding',
          description: 'Complete brand identity solutions including logo, colors, typography, and guidelines',
          priceINR: 16600,
          features: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guidelines', 'Business Cards']
        },
        {
          name: 'Social Media Creatives',
          description: 'Eye-catching social media graphics that boost engagement and brand awareness',
          priceINR: 2490,
          features: ['Instagram Posts', 'Story Templates', 'Facebook Covers', 'LinkedIn Graphics']
        },
        {
          name: 'Posters & Ads',
          description: 'Compelling poster designs and advertisements that capture attention and drive action',
          priceINR: 3320,
          features: ['Event Posters', 'Print Ads', 'Digital Banners', 'Promotional Materials']
        }
      ]

      await Service.insertMany(defaultServices)
      console.log('🎨 Default services created')
    }
  } catch (error) {
    console.error('Error creating default services:', error)
  }
}

// Create default portfolio items
const createDefaultPortfolio = async () => {
  try {
    const portfolioCount = await Portfolio.countDocuments()
    if (portfolioCount === 0) {
      const defaultPortfolio = [
        {
          title: 'Modern Tech Logo',
          category: 'Logo Design',
          description: 'Clean and modern logo design for a tech startup',
          imageUrl: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Tech+Logo',
          tags: ['Logo', 'Branding', 'Tech']
        },
        {
          title: 'Restaurant Branding',
          category: 'Branding',
          description: 'Complete brand identity for a premium restaurant',
          imageUrl: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Restaurant+Brand',
          tags: ['Branding', 'Identity', 'Food']
        },
        {
          title: 'Social Media Campaign',
          category: 'Social Media Creatives',
          description: 'Engaging social media graphics for fashion brand',
          imageUrl: 'https://via.placeholder.com/400x300/06b6d4/ffffff?text=Social+Campaign',
          tags: ['Social Media', 'Fashion', 'Campaign']
        },
        {
          title: 'Fitness App Logo',
          category: 'Logo Design',
          description: 'Dynamic logo design for fitness application',
          imageUrl: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Fitness+Logo',
          tags: ['Logo', 'App', 'Fitness']
        }
      ]

      await Portfolio.insertMany(defaultPortfolio)
      console.log('🖼️ Default portfolio items created')
    }
  } catch (error) {
    console.error('Error creating default portfolio:', error)
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
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 10, max: 20 })
    .matches(/^[\+]?[0-9\s\-\(\)]{10,20}$/)
    .withMessage('Please enter a valid phone number (10-20 digits)'),
  body('service')
    .isIn(['Logo Design', 'Branding', 'Social Media Creatives', 'Posters & Ads', 'Other'])
    .withMessage('Please select a valid service'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
]

// Routes

// Enhanced health check with database status
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState
  const dbStatusText = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  }

  res.json({ 
    status: 'OK', 
    message: 'Sourav Portfolio API is running',
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatusText[dbStatus] || 'unknown',
      connected: dbStatus === 1
    },
    environment: process.env.NODE_ENV || 'development',
    port: PORT
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

    const { name, email, phone, service, message } = req.body

    // Create new contact message
    const newContact = new Contact({
      name,
      email,
      phone: phone || undefined, // Only include if provided
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

// Portfolio API Routes

// Get all portfolio items
app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolioItems = await Portfolio.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select('-__v')

    res.json({
      success: true,
      data: portfolioItems
    })
  } catch (error) {
    console.error('❌ Get portfolio error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Get all portfolio items (admin only)
app.get('/api/admin/portfolio', authenticateAdmin, async (req, res) => {
  try {
    const portfolioItems = await Portfolio.find()
      .sort({ createdAt: -1 })
      .select('-__v')

    res.json({
      success: true,
      data: portfolioItems
    })
  } catch (error) {
    console.error('❌ Get admin portfolio error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Create portfolio item (admin only)
app.post('/api/admin/portfolio', authenticateAdmin, [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required and must be less than 100 characters'),
  body('description').trim().isLength({ min: 1, max: 500 }).withMessage('Description is required and must be less than 500 characters'),
  body('category').isIn(['Logo Design', 'Branding', 'Social Media Creatives', 'Posters & Ads']).withMessage('Invalid category'),
  body('imageUrl').trim().isURL().withMessage('Valid image URL is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
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

    const { title, description, category, imageUrl, tags } = req.body

    const newPortfolioItem = new Portfolio({
      title,
      description,
      category,
      imageUrl,
      tags: tags || []
    })

    await newPortfolioItem.save()

    res.status(201).json({
      success: true,
      message: 'Portfolio item created successfully',
      data: newPortfolioItem
    })
  } catch (error) {
    console.error('❌ Create portfolio error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Update portfolio item (admin only)
app.put('/api/admin/portfolio/:id', authenticateAdmin, [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required and must be less than 100 characters'),
  body('description').trim().isLength({ min: 1, max: 500 }).withMessage('Description is required and must be less than 500 characters'),
  body('category').isIn(['Logo Design', 'Branding', 'Social Media Creatives', 'Posters & Ads']).withMessage('Invalid category'),
  body('imageUrl').trim().isURL().withMessage('Valid image URL is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
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

    const { id } = req.params
    const { title, description, category, imageUrl, tags, isActive } = req.body

    const updatedItem = await Portfolio.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        imageUrl,
        tags: tags || [],
        isActive: isActive !== undefined ? isActive : true,
        updatedAt: new Date()
      },
      { new: true }
    )

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      })
    }

    res.json({
      success: true,
      message: 'Portfolio item updated successfully',
      data: updatedItem
    })
  } catch (error) {
    console.error('❌ Update portfolio error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Delete portfolio item (admin only)
app.delete('/api/admin/portfolio/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params

    const deletedItem = await Portfolio.findByIdAndDelete(id)

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      })
    }

    res.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    })
  } catch (error) {
    console.error('❌ Delete portfolio error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Services API Routes

// Get all services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select('-__v')

    res.json({
      success: true,
      data: services
    })
  } catch (error) {
    console.error('❌ Get services error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Get all services (admin only)
app.get('/api/admin/services', authenticateAdmin, async (req, res) => {
  try {
    const services = await Service.find()
      .sort({ createdAt: -1 })
      .select('-__v')

    res.json({
      success: true,
      data: services
    })
  } catch (error) {
    console.error('❌ Get admin services error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Create service (admin only)
app.post('/api/admin/services', authenticateAdmin, [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
  body('description').trim().isLength({ min: 1, max: 500 }).withMessage('Description is required and must be less than 500 characters'),
  body('priceINR').isNumeric().isFloat({ min: 0 }).withMessage('Price in INR must be a positive number'),
  body('features').optional().isArray().withMessage('Features must be an array')
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

    const { name, description, priceINR, features } = req.body

    const newService = new Service({
      name,
      description,
      priceINR,
      features: features || []
    })

    await newService.save()

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: newService
    })
  } catch (error) {
    console.error('❌ Create service error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Update service (admin only)
app.put('/api/admin/services/:id', authenticateAdmin, [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
  body('description').trim().isLength({ min: 1, max: 500 }).withMessage('Description is required and must be less than 500 characters'),
  body('priceINR').isNumeric().isFloat({ min: 0 }).withMessage('Price in INR must be a positive number'),
  body('features').optional().isArray().withMessage('Features must be an array')
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

    const { id } = req.params
    const { name, description, priceINR, features, isActive } = req.body

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name,
        description,
        priceINR,
        features: features || [],
        isActive: isActive !== undefined ? isActive : true,
        updatedAt: new Date()
      },
      { new: true }
    )

    if (!updatedService) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: updatedService
    })
  } catch (error) {
    console.error('❌ Update service error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// Delete service (admin only)
app.delete('/api/admin/services/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params

    const deletedService = await Service.findByIdAndDelete(id)

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    })
  } catch (error) {
    console.error('❌ Delete service error:', error)
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
// Start server with graceful error handling
const startServer = async () => {
  try {
    // Try to connect to database
    await connectDB()
    
    // Only create default data if database is connected
    if (mongoose.connection.readyState === 1) {
      await createDefaultAdmin()
      await createDefaultServices()
      await createDefaultPortfolio()
    } else {
      console.log('⚠️ Database not connected - skipping default data creation')
    }
  } catch (error) {
    console.error('⚠️ Database setup failed:', error.message)
    console.log('🔄 Server will start without database connection')
  }
  
  // Start the server regardless of database connection
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📱 API Health: http://localhost:${PORT}/api/health`)
    console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`)
    console.log(`🔐 Admin Login: http://localhost:${PORT}/api/admin/login`)
    console.log(`🌐 Environment: ${process.env.NODE_ENV}`)
    
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️ Server started without database connection')
      console.log('🔄 Database connection will be retried automatically')
    }
  })

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully')
    server.close(() => {
      console.log('✅ Server closed')
      mongoose.connection.close(false, () => {
        console.log('✅ Database connection closed')
        process.exit(0)
      })
    })
  })
}

startServer().catch(error => {
  console.error('❌ Failed to start server:', error)
  // Don't exit in production, let the process manager handle it
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1)
  }
})

module.exports = app