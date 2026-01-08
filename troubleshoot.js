#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🔧 Portfolio Troubleshooting Tool\n')

// Function to check if command exists
const commandExists = (command) => {
  try {
    execSync(`${command} --version`, { stdio: 'ignore' })
    return true
  } catch (error) {
    return false
  }
}

// Function to check if port is in use
const checkPort = (port) => {
  try {
    const result = execSync(`netstat -an | findstr :${port}`, { encoding: 'utf8' })
    return result.trim().length > 0
  } catch (error) {
    return false
  }
}

// Function to run command safely
const runCommand = (command, description) => {
  try {
    console.log(`🔍 ${description}...`)
    const result = execSync(command, { encoding: 'utf8' })
    console.log(`✅ ${description}: OK`)
    return result.trim()
  } catch (error) {
    console.log(`❌ ${description}: FAILED`)
    console.log(`   Error: ${error.message}`)
    return null
  }
}

console.log('='.repeat(50))
console.log('SYSTEM REQUIREMENTS CHECK')
console.log('='.repeat(50))

// Check Node.js
const nodeVersion = runCommand('node --version', 'Node.js version')
if (nodeVersion) {
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])
  if (majorVersion >= 16) {
    console.log(`   ✅ Node.js ${nodeVersion} is compatible`)
  } else {
    console.log(`   ❌ Node.js ${nodeVersion} is too old. Need v16+`)
  }
}

// Check npm
const npmVersion = runCommand('npm --version', 'npm version')
if (npmVersion) {
  console.log(`   ✅ npm ${npmVersion} is available`)
}

// Check Git
if (commandExists('git')) {
  const gitVersion = runCommand('git --version', 'Git version')
  console.log(`   ✅ Git is available`)
} else {
  console.log(`   ⚠️  Git not found (optional)`)
}

console.log('\n' + '='.repeat(50))
console.log('PROJECT STRUCTURE CHECK')
console.log('='.repeat(50))

// Check project folders
const folders = ['client', 'server', 'mobile']
folders.forEach(folder => {
  if (fs.existsSync(folder)) {
    console.log(`✅ ${folder}/ folder exists`)
    
    // Check package.json
    const packagePath = path.join(folder, 'package.json')
    if (fs.existsSync(packagePath)) {
      console.log(`   ✅ ${folder}/package.json exists`)
    } else {
      console.log(`   ❌ ${folder}/package.json missing`)
    }
    
    // Check node_modules
    const nodeModulesPath = path.join(folder, 'node_modules')
    if (fs.existsSync(nodeModulesPath)) {
      console.log(`   ✅ ${folder}/node_modules exists`)
    } else {
      console.log(`   ⚠️  ${folder}/node_modules missing - run npm install`)
    }
  } else {
    console.log(`❌ ${folder}/ folder missing`)
  }
})

console.log('\n' + '='.repeat(50))
console.log('ENVIRONMENT CHECK')
console.log('='.repeat(50))

// Check .env file
const envPath = path.join('server', '.env')
if (fs.existsSync(envPath)) {
  console.log('✅ server/.env file exists')
  try {
    const envContent = fs.readFileSync(envPath, 'utf8')
    if (envContent.includes('MONGODB_URI')) {
      console.log('   ✅ MONGODB_URI configured')
    } else {
      console.log('   ⚠️  MONGODB_URI not found in .env')
    }
  } catch (error) {
    console.log('   ❌ Cannot read .env file')
  }
} else {
  console.log('❌ server/.env file missing')
  console.log('   💡 Run: npm run setup')
}

console.log('\n' + '='.repeat(50))
console.log('PORT AVAILABILITY CHECK')
console.log('='.repeat(50))

// Check ports
const ports = [5173, 5000, 19000, 19001, 19002]
ports.forEach(port => {
  if (checkPort(port)) {
    console.log(`⚠️  Port ${port} is in use`)
    console.log(`   💡 Run: npx kill-port ${port}`)
  } else {
    console.log(`✅ Port ${port} is available`)
  }
})

console.log('\n' + '='.repeat(50))
console.log('MONGODB CHECK')
console.log('='.repeat(50))

// Check MongoDB
if (commandExists('mongod')) {
  console.log('✅ MongoDB is installed locally')
  runCommand('mongod --version', 'MongoDB version')
} else {
  console.log('⚠️  MongoDB not found locally')
  console.log('   💡 Use MongoDB Atlas or install locally')
}

console.log('\n' + '='.repeat(50))
console.log('EXPO/MOBILE CHECK (Optional)')
console.log('='.repeat(50))

// Check Expo CLI
if (commandExists('expo')) {
  console.log('✅ Expo CLI is installed')
  runCommand('expo --version', 'Expo CLI version')
} else {
  console.log('⚠️  Expo CLI not found')
  console.log('   💡 Install: npm install -g @expo/cli')
}

// Check EAS CLI
if (commandExists('eas')) {
  console.log('✅ EAS CLI is installed')
  runCommand('eas --version', 'EAS CLI version')
} else {
  console.log('⚠️  EAS CLI not found')
  console.log('   💡 Install: npm install -g eas-cli')
}

console.log('\n' + '='.repeat(50))
console.log('QUICK FIXES')
console.log('='.repeat(50))

console.log('🔧 Common Solutions:')
console.log('')
console.log('1. Install all dependencies:')
console.log('   npm run install-all')
console.log('')
console.log('2. Kill ports in use:')
console.log('   npx kill-port 5173 5000')
console.log('')
console.log('3. Reset everything:')
console.log('   npm run clean')
console.log('   npm run install-all')
console.log('')
console.log('4. Start development:')
console.log('   npm run dev')
console.log('')
console.log('5. Check API health:')
console.log('   http://localhost:5000/api/health')
console.log('')
console.log('6. Install mobile tools:')
console.log('   npm install -g @expo/cli eas-cli')

console.log('\n🎯 Need more help? Check COMPLETE_SETUP_GUIDE.md')
console.log('📧 Contact: souravverma5436@gmail.com')