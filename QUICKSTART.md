# 🚀 Quick Start Guide

Get Sourav Verma's portfolio website running in 5 minutes!

## Prerequisites
- Node.js 16+ installed
- MongoDB running (local or Atlas)

## 1. Setup (One Command)
```bash
npm run setup
```

This will:
- Install all dependencies (frontend + backend)
- Create environment file
- Verify Node.js version

## 2. Start Development
```bash
npm run dev
```

This starts both:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 3. Test Everything

### ✅ Check these work:
- [ ] Website loads at http://localhost:5173
- [ ] Navigation between pages
- [ ] Animated cursor follows mouse
- [ ] Contact form submits (check browser console)
- [ ] Instagram links open correctly
- [ ] Portfolio modal opens/closes
- [ ] All animations play smoothly

### 🔧 If contact form fails:
1. Check MongoDB is running
2. Check server logs in terminal
3. Verify API at http://localhost:5000/api/health

## 4. Customize

### Update Contact Info (client/src/pages/Contact.jsx):
```javascript
// Line ~25-35
const contactMethods = [
  {
    title: 'Design Portfolio',
    link: 'https://instagram.com/YOUR_DESIGN_HANDLE',
    // ...
  },
  {
    title: 'Personal Profile', 
    link: 'https://instagram.com/YOUR_PERSONAL_HANDLE',
    // ...
  },
  {
    title: 'Email Me',
    link: 'mailto:YOUR_EMAIL@gmail.com',
    // ...
  }
]
```

### Update Personal Details (multiple files):
- Name: Search for "Sourav Verma" and replace
- Email: Search for "souravverma5436@gmail.com" and replace
- Instagram handles: Update @sv_desizns and @its_sverma

## 5. Deploy

### Frontend (Vercel/Netlify):
```bash
cd client
npm run build
# Upload dist/ folder
```

### Backend (Railway/Render):
```bash
# Deploy server/ folder
# Set start command: npm start
# Add MongoDB_URI environment variable
```

## 🆘 Troubleshooting

### Port already in use:
```bash
# Kill processes on ports
npx kill-port 5173 5000
```

### MongoDB connection error:
```bash
# Start local MongoDB
mongod

# Or update server/.env with Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sourav-portfolio
```

### Dependencies issues:
```bash
npm run clean
npm run setup
```

## 📱 Mobile App Ready

The code is structured for easy conversion to:
- React Native (reuse components)
- Expo (quick mobile deployment)  
- WebView app (wrap in native container)

## 🎨 Key Features Working

✅ **All Functional:**
- Custom animated cursor
- 3D particle background  
- Smooth page transitions
- Portfolio modal gallery
- Working contact form
- Instagram/email links
- Responsive design
- Dark theme with glassmorphism

✅ **No Placeholders:**
- Real working buttons
- Actual form submission
- Live animations
- Functional navigation

---

**Need help?** Check the full README.md or contact souravverma5436@gmail.com