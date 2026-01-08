#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Setting up Sourav Verma Portfolio (Web + Mobile + Admin)...\n')

// Function to run commands
const runCommand = (command, cwd = process.cwd()) => {
  try {
    console.log(`📦 Running: ${command}`)
    execSync(command, { 
      cwd, 
      stdio: 'inherit',
      env: { ...process.env, FORCE_COLOR: '1' }
    })
    console.log('✅ Success!\n')
  } catch (error) {
    console.error(`❌ Error running: ${command}`)
    console.error(error.message)
    console.log('⚠️  Continuing with setup...\n')
  }
}

// Check if Node.js version is compatible
const nodeVersion = process.version
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])

if (majorVersion < 16) {
  console.error('❌ Node.js version 16 or higher is required')
  console.error(`Current version: ${nodeVersion}`)
  process.exit(1)
}

console.log(`✅ Node.js version: ${nodeVersion}`)

// Install root dependencies
console.log('📦 Installing root dependencies...')
runCommand('npm install')

// Install client dependencies
console.log('📦 Installing client (web) dependencies...')
runCommand('npm install', path.join(process.cwd(), 'client'))

// Install server dependencies
console.log('📦 Installing server (backend) dependencies...')
runCommand('npm install', path.join(process.cwd(), 'server'))

// Install mobile dependencies (optional)
const mobilePath = path.join(process.cwd(), 'mobile')
if (fs.existsSync(mobilePath)) {
  console.log('📱 Installing mobile app dependencies...')
  runCommand('npm install', mobilePath)
} else {
  console.log('📱 Mobile folder not found, skipping mobile setup')
}

// Create environment file if it doesn't exist
const envPath = path.join(process.cwd(), 'server', '.env')
const envExamplePath = path.join(process.cwd(), '.env.example')

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('📝 Creating environment file...')
  const envContent = fs.readFileSync(envExamplePath, 'utf8')
  fs.writeFileSync(envPath, envContent)
  console.log('✅ Environment file created at server/.env')
}

console.log('\n🎉 Setup completed successfully!')
console.log('\n📋 Next steps:')
console.log('1. Make sure MongoDB is running (local or Atlas)')
console.log('2. Update server/.env with your MongoDB connection string if needed')
console.log('3. Run "npm run dev" to start web application')
console.log('4. Run "npm run mobile" to start mobile app (optional)')

console.log('\n🌐 URLs after starting:')
console.log('   Frontend:        http://localhost:5173')
console.log('   Backend:         http://localhost:5000')
console.log('   Admin Login:     http://localhost:5173/admin/login')
console.log('   API Health:      http://localhost:5000/api/health')

console.log('\n🔐 Admin Access:')
console.log('   Username: admin')
console.log('   Password: admin123')

console.log('\n📱 Mobile App:')
console.log('   Run "npm run mobile" and scan QR code with Expo Go app')

console.log('\n📧 Contact form will be available at: http://localhost:5173/contact')
console.log('\n🚀 Ready to code! Run "npm run dev" to get started.')