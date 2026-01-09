#!/usr/bin/env node

/**
 * Development Startup Script
 * Helps you start both backend and frontend for testing
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting development environment...\n');

// Start backend
console.log('📡 Starting backend server...');
const backend = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true
});

// Wait a bit for backend to start
setTimeout(() => {
  console.log('\n🌐 Starting frontend...');
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'client'),
    stdio: 'inherit',
    shell: true
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    backend.kill();
    frontend.kill();
    process.exit();
  });

}, 3000);

console.log('\n📋 Development URLs:');
console.log('🔗 Frontend: http://localhost:5173');
console.log('🔗 Backend: http://localhost:5000');
console.log('🔗 Admin Login: http://localhost:5173/admin/login');
console.log('\n🔐 Default Admin Credentials:');
console.log('👤 Username: admin');
console.log('🔑 Password: admin123');
console.log('\n⚠️  Press Ctrl+C to stop both servers');