// Quick MongoDB connection test
const mongoose = require('mongoose')
require('dotenv').config({ path: './server/.env' })

const testConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB connection...')
    console.log('Connection string:', process.env.MONGODB_URI?.replace(/\/\/.*:.*@/, '//***:***@'))
    
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB connection successful!')
    
    // Test creating a document
    const testSchema = new mongoose.Schema({ test: String })
    const TestModel = mongoose.model('Test', testSchema)
    
    const doc = new TestModel({ test: 'connection test' })
    await doc.save()
    console.log('✅ Database write test successful!')
    
    await TestModel.deleteOne({ _id: doc._id })
    console.log('✅ Database delete test successful!')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ MongoDB connection failed:')
    console.error('Error:', error.message)
    
    if (error.message.includes('authentication failed')) {
      console.log('\n💡 Solutions:')
      console.log('1. Check your username and password in the connection string')
      console.log('2. Make sure the database user exists in MongoDB Atlas')
      console.log('3. Check if IP address is whitelisted (0.0.0.0/0 for all)')
    }
    
    process.exit(1)
  }
}

testConnection()