#!/usr/bin/env node

/**
 * Login Test Script
 * Tests the admin login functionality
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000';

async function testLogin() {
  console.log('🔍 Testing admin login...');
  console.log(`📡 API URL: ${API_BASE_URL}/api/admin/login`);
  
  try {
    // Test health endpoint first
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/api/health`);
    console.log('✅ Health check:', healthResponse.data);
    
    // Test login
    console.log('\n2. Testing admin login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/api/admin/login`, {
      username: 'admin',
      password: 'admin123'
    });
    
    console.log('✅ Login successful!');
    console.log('📋 Response:', loginResponse.data);
    
  } catch (error) {
    console.log('❌ Login failed!');
    
    if (error.response) {
      console.log('📋 Error response:', error.response.data);
      console.log('📋 Status code:', error.response.status);
    } else if (error.request) {
      console.log('📋 No response received. Is the server running?');
      console.log('📋 Make sure to start the server with: cd server && npm start');
    } else {
      console.log('📋 Error:', error.message);
    }
  }
}

// Run the test
testLogin();