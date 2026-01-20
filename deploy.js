#!/usr/bin/env node

console.log('🚀 Sourav Portfolio - Deployment Helper')
console.log('=====================================')
console.log('')

console.log('📋 Your Deployment URLs:')
console.log('🐙 GitHub: https://github.com/souravverma5436/sourav-portfolio')
console.log('🖥️  Render:  https://sv-portfolio-6qp6.onrender.com')
console.log('🌐 Netlify: https://svfiles.netlify.app')
console.log('')

console.log('✅ Configuration Updated:')
console.log('- Backend CORS: svfiles.netlify.app')
console.log('- Frontend API: sv-portfolio-6qp6.onrender.com')
console.log('')

console.log('📝 Next Steps:')
console.log('1. Run: git add .')
console.log('2. Run: git commit -m "Fix production deployment - CORS and API centralization"')
console.log('3. Run: git push origin main')
console.log('')

console.log('🔧 Render Environment Variables:')
console.log('MONGODB_URI=your_mongodb_atlas_connection_string')
console.log('JWT_SECRET=your-super-secure-32-character-secret-key')
console.log('NODE_ENV=production')
console.log('')

console.log('🌐 Netlify Environment Variables:')
console.log('VITE_API_URL=https://sv-portfolio-6qp6.onrender.com')
console.log('')

console.log('🎯 After deployment, test:')
console.log('- Health: https://sv-portfolio-6qp6.onrender.com/api/health')
console.log('- Admin: https://svfiles.netlify.app/admin/login')
console.log('- Use your admin credentials to login')