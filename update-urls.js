#!/usr/bin/env node

/**
 * URL Update Script for Netlify + Render Deployment
 * 
 * Usage: node update-urls.js YOUR_RENDER_URL YOUR_NETLIFY_URL
 * Example: node update-urls.js https://my-backend.onrender.com https://my-site.netlify.app
 */

const fs = require('fs');
const path = require('path');

// Get URLs from command line arguments
const [,, renderUrl, netlifyUrl] = process.argv;

if (!renderUrl || !netlifyUrl) {
  console.log('❌ Usage: node update-urls.js YOUR_RENDER_URL YOUR_NETLIFY_URL');
  console.log('📝 Example: node update-urls.js https://my-backend.onrender.com https://my-site.netlify.app');
  process.exit(1);
}

console.log('🔄 Updating URLs...');
console.log(`📡 Render Backend: ${renderUrl}`);
console.log(`🌐 Netlify Frontend: ${netlifyUrl}`);

// Files to update in frontend
const frontendFiles = [
  'client/src/pages/AdminDashboard.jsx',
  'client/src/pages/Portfolio.jsx',
  'client/src/pages/Services.jsx',
  'client/src/pages/AdminLogin.jsx',
  'client/src/pages/Contact.jsx'
];

// Update frontend files
frontendFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the placeholder URL
    const updated = content.replace(
      /const API_BASE_URL = 'https:\/\/your-render-backend\.onrender\.com'/g,
      `const API_BASE_URL = '${renderUrl}'`
    );
    
    if (updated !== content) {
      fs.writeFileSync(filePath, updated);
      console.log(`✅ Updated ${filePath}`);
    } else {
      console.log(`⚠️  No changes needed in ${filePath}`);
    }
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
});

// Update backend CORS configuration
const backendFile = 'server/index.js';
if (fs.existsSync(backendFile)) {
  let content = fs.readFileSync(backendFile, 'utf8');
  
  // Replace the placeholder Netlify URL
  const updated = content.replace(
    /'https:\/\/your-netlify-site\.netlify\.app'/g,
    `'${netlifyUrl}'`
  );
  
  if (updated !== content) {
    fs.writeFileSync(backendFile, updated);
    console.log(`✅ Updated ${backendFile}`);
  } else {
    console.log(`⚠️  No changes needed in ${backendFile}`);
  }
} else {
  console.log(`❌ File not found: ${backendFile}`);
}

console.log('');
console.log('🎉 URL update complete!');
console.log('');
console.log('📋 Next steps:');
console.log('1. Deploy backend to Render');
console.log('2. Build frontend: cd client && npm run build');
console.log('3. Deploy frontend to Netlify');
console.log('4. Test all functionality');
console.log('');
console.log('🔐 Admin login: username: admin, password: admin123');