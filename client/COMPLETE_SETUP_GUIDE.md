# 🚀 Complete Setup & Run Guide

## 📋 Prerequisites

Before starting, make sure you have these installed:

### Required Software:
1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - Choose one option:
   - **Local MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
   - **MongoDB Atlas** (Cloud) - [Sign up here](https://www.mongodb.com/atlas)
3. **Git** - [Download here](https://git-scm.com/)

### For Mobile Development (Optional):
4. **Expo CLI** - Install globally: `npm install -g @expo/cli`
5. **EAS CLI** - Install globally: `npm install -g eas-cli`
6. **Expo Go App** - Install on your phone from App Store/Play Store

---

## 🛠 Step 1: Project Setup

### 1.1 Clone/Download Project
```bash
# If using Git
git clone <your-repo-url>
cd sourav-portfolio

# Or extract downloaded ZIP file and navigate to folder
```

### 1.2 Install All Dependencies (One Command)
```bash
# This installs everything: root, client, server, and mobile
npm run install-all
```

**OR install manually:**
```bash
# Root dependencies
npm install

# Frontend dependencies
cd client
npm install
cd ..

# Backend dependencies
cd server
npm install
cd ..

# Mobile dependencies (optional)
cd mobile
npm install
cd ..
```

---

## 🗄️ Step 2: Database Setup

### Option A: Local MongoDB
```bash
# Start MongoDB service
# Windows:
net start MongoDB

# macOS:
brew services start mongodb/brew/mongodb-community

# Linux:
sudo systemctl start mongod
```

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account and cluster
3. Get connection string
4. Update `server/.env` file:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sourav-portfolio
```

---

## 🚀 Step 3: Running the Project

### 3.1 Quick Start (Web + Backend)
```bash
# Start both frontend and backend together
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### 3.2 Manual Start (Separate Terminals)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

---

## 📱 Step 4: Mobile App (Optional)

### 4.1 Install Mobile Dependencies
```bash
cd mobile
npm install
```

### 4.2 Start Mobile Development
```bash
# Start Expo development server
npm start
# or
expo start
```

### 4.3 Run on Device/Simulator
```bash
# Android (requires Android Studio/Emulator)
npm run android

# iOS (Mac only, requires Xcode)
npm run ios

# Or scan QR code with Expo Go app on your phone
```

---

## 🔐 Step 5: Admin Dashboard Access

### 5.1 Default Admin Credentials
- **URL**: http://localhost:5173/admin/login
- **Username**: `admin`
- **Password**: `admin123`

### 5.2 Admin Features
- View all contact messages
- Update message status (new/read/replied)
- Delete messages
- View statistics dashboard
- Filter and search messages

---

## 🌐 Step 6: Testing Everything

### 6.1 Web Application
Visit: http://localhost:5173

**Test these features:**
- [ ] Navigation between pages works
- [ ] Contact form submits successfully
- [ ] Instagram links open (@sv_desizns, @its_sverma)
- [ ] Email link opens (souravverma5436@gmail.com)
- [ ] Portfolio modal opens/closes with navigation
- [ ] Animations play smoothly
- [ ] Custom cursor follows mouse

### 6.2 Admin Dashboard
Visit: http://localhost:5173/admin/login

**Test these features:**
- [ ] Login with admin/admin123
- [ ] Dashboard shows statistics
- [ ] Messages list displays
- [ ] Can update message status
- [ ] Can delete messages
- [ ] Filters and search work

### 6.3 Mobile App
**Test these features:**
- [ ] App loads on device/simulator
- [ ] Navigation between screens works
- [ ] Touch interactions are responsive
- [ ] Animations are smooth
- [ ] Contact form works
- [ ] External links open correctly

---

## 🛠 Troubleshooting

### Common Issues & Solutions

#### 1. Port Already in Use
```bash
# Kill processes on ports
npx kill-port 5173 5000

# Or change ports in package.json scripts
```

#### 2. MongoDB Connection Error
```bash
# Check if MongoDB is running
# Local: mongod --version
# Atlas: Check connection string in server/.env
```

#### 3. Dependencies Issues
```bash
# Clear all node_modules and reinstall
npm run clean
npm run install-all
```

#### 4. Mobile App Won't Start
```bash
# Clear Expo cache
npx expo start --clear

# Reinstall mobile dependencies
cd mobile
rm -rf node_modules
npm install
```

#### 5. Admin Login Not Working
```bash
# Check server logs for errors
# Verify MongoDB is connected
# Default admin is created automatically on server start
```

#### 6. Contact Form Not Submitting
```bash
# Check backend is running on port 5000
# Check browser console for errors
# Verify API endpoint: http://localhost:5000/api/health
```

---

## 📦 Build for Production

### Web Application
```bash
# Build frontend
cd client
npm run build

# Built files will be in client/dist/
```

### Mobile Application
```bash
cd mobile

# Android APK (for testing)
eas build --platform android --profile preview

# Android AAB (for Play Store)
eas build --platform android --profile production

# iOS (for App Store)
eas build --platform ios --profile production
```

---

## 🔧 Development Commands Reference

### Root Level Commands
```bash
npm run setup          # Install all dependencies
npm run dev           # Start web + backend
npm run client        # Start frontend only
npm run server        # Start backend only
npm run mobile        # Start mobile app
npm run build         # Build web for production
npm run clean         # Clean all node_modules
```

### Mobile Specific Commands
```bash
cd mobile
npm start             # Start Expo dev server
npm run android       # Run on Android
npm run ios          # Run on iOS
eas build --platform android  # Build Android
eas build --platform ios      # Build iOS
```

---

## 📱 Mobile App Development Workflow

### 1. Development
```bash
cd mobile
npm start
# Scan QR code with Expo Go app
```

### 2. Testing on Physical Device
- Install Expo Go from App Store/Play Store
- Scan QR code from terminal
- Test all features on real device

### 3. Building for Production
```bash
# Setup EAS (first time only)
eas login
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS (requires Apple Developer account)
eas build --platform ios
```

---

## 🎯 Success Checklist

### ✅ Web Application Running
- [ ] Frontend loads at http://localhost:5173
- [ ] Backend API responds at http://localhost:5000/api/health
- [ ] Contact form submits successfully
- [ ] All animations work smoothly
- [ ] All links open correctly

### ✅ Admin Dashboard Working
- [ ] Can login at http://localhost:5173/admin/login
- [ ] Dashboard shows statistics
- [ ] Can manage messages
- [ ] All admin features functional

### ✅ Mobile App Running
- [ ] Expo development server starts
- [ ] App loads on device/simulator
- [ ] All screens navigate properly
- [ ] Touch interactions work
- [ ] Can build production versions

---

## 🆘 Need Help?

### Check These First:
1. **Node.js version**: `node --version` (should be 16+)
2. **MongoDB status**: Check if running locally or Atlas connection
3. **Port availability**: Make sure 5173 and 5000 are free
4. **Dependencies**: Run `npm run install-all` if issues persist

### Error Logs:
- **Frontend errors**: Check browser console (F12)
- **Backend errors**: Check terminal running server
- **Mobile errors**: Check Expo DevTools in browser

### Contact Information:
- **Email**: souravverma5436@gmail.com
- **Instagram**: @sv_desizns (design work)
- **Instagram**: @its_sverma (personal)

---

**🎉 You're all set! Your portfolio is ready to run across web, admin, and mobile platforms!**