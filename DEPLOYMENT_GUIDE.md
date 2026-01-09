# Complete Deployment Guide 🚀

This guide will help you deploy the Sourav Portfolio project to GitHub, Render (backend), and Netlify (frontend).

## 📋 Prerequisites

- GitHub account
- Render account (render.com)
- Netlify account (netlify.com)
- MongoDB Atlas account (for database)

## 🗂️ Project Structure

```
sourav-portfolio/
├── client/                 # React frontend (Netlify)
├── server/                 # Node.js backend (Render)
├── mobile/                 # React Native app (optional)
├── package.json           # Root package.json
└── README.md
```

## 🔧 Step 1: Prepare for Deployment

### 1.1 Update Environment Variables

**Backend (.env file in server/ directory):**
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=production
```

**Frontend (.env.production file in client/ directory):**
```env
VITE_API_BASE_URL=https://your-backend-name.onrender.com
```

### 1.2 Update CORS Configuration

In `server/index.js`, update the CORS origins with your actual Netlify URL:
```javascript
origin: [
  'https://your-actual-netlify-site.netlify.app',
  /\.netlify\.app$/,
  // ... other origins
]
```

## 🐙 Step 2: Deploy to GitHub

### 2.1 Initialize Git Repository

```bash
# In your project root directory
git init
git add .
git commit -m "Initial commit: Complete portfolio project"
```

### 2.2 Create GitHub Repository

1. Go to GitHub.com and create a new repository
2. Name it `sourav-portfolio` (or your preferred name)
3. Don't initialize with README (we already have files)

### 2.3 Push to GitHub

```bash
# Replace with your actual GitHub repository URL
git remote add origin https://github.com/yourusername/sourav-portfolio.git
git branch -M main
git push -u origin main
```

## 🖥️ Step 3: Deploy Backend to Render

### 3.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up/login with your GitHub account

### 3.2 Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:

**Basic Settings:**
- **Name**: `sourav-portfolio-backend` (or your choice)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables:**
Add these in the Render dashboard:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random string (generate one)
- `NODE_ENV`: `production`

### 3.3 Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://your-service-name.onrender.com`

## 🌐 Step 4: Deploy Frontend to Netlify

### 4.1 Update Environment Variables

Update `client/.env.production` with your actual Render backend URL:
```env
VITE_API_BASE_URL=https://your-actual-backend.onrender.com
```

### 4.2 Create Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with your GitHub account

### 4.3 Deploy from GitHub

1. Click "New site from Git"
2. Choose GitHub and authorize
3. Select your repository
4. Configure build settings:

**Build Settings:**
- **Base directory**: `client`
- **Build command**: `npm run build`
- **Publish directory**: `client/dist`

**Environment Variables:**
- `VITE_API_BASE_URL`: `https://your-backend-name.onrender.com`

### 4.4 Deploy

1. Click "Deploy site"
2. Wait for deployment (2-5 minutes)
3. Note your frontend URL: `https://random-name.netlify.app`

### 4.5 Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Add custom domain if you have one
3. Configure DNS settings as instructed

## 🔄 Step 5: Update CORS Configuration

After getting your Netlify URL, update the backend CORS configuration:

1. Edit `server/index.js`
2. Replace placeholder URLs with actual ones:
```javascript
origin: [
  'https://your-actual-netlify-site.netlify.app',
  /\.netlify\.app$/,
  // ... keep other origins
]
```
3. Commit and push changes
4. Render will auto-deploy the updated backend

## ✅ Step 6: Test Deployment

### 6.1 Test Backend

Visit your Render backend URL + `/api/health`:
```
https://your-backend.onrender.com/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Sourav Portfolio API is running",
  "timestamp": "2024-01-09T..."
}
```

### 6.2 Test Frontend

1. Visit your Netlify URL
2. Test all pages: Home, About, Portfolio, Services, Contact
3. Test contact form submission
4. Test admin login: `/admin/login`
   - Username: `admin`
   - Password: `admin123`

### 6.3 Test Integration

1. Submit a contact form message
2. Login to admin dashboard
3. Verify message appears in admin panel
4. Test portfolio and services management

## 🔧 Step 7: Environment-Specific Configuration

### 7.1 Development Environment

Create `client/.env.local` for local development:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 7.2 Production Environment

Netlify automatically uses `.env.production` or environment variables set in dashboard.

## 📱 Step 8: Mobile App (Optional)

If you want to deploy the mobile app:

### 8.1 Expo EAS Build

```bash
cd mobile
npm install -g @expo/cli
eas build --platform all
```

### 8.2 App Store Deployment

Follow Expo documentation for App Store and Google Play deployment.

## 🚨 Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure Netlify URL is added to CORS origins
- Check environment variables are set correctly

**API Connection Failed:**
- Verify VITE_API_BASE_URL is correct
- Check Render backend is running
- Verify MongoDB connection

**Build Failures:**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check build logs for specific errors

**Admin Login Issues:**
- Ensure JWT_SECRET is set in production
- Check MongoDB connection
- Verify admin user was created

### Logs and Debugging

**Render Logs:**
- Go to your Render service dashboard
- Click "Logs" tab to see server logs

**Netlify Logs:**
- Go to your Netlify site dashboard
- Click "Functions" → "View logs"

**Browser Console:**
- Open browser dev tools
- Check console for JavaScript errors
- Check network tab for API call failures

## 🔄 Continuous Deployment

Both Render and Netlify support automatic deployment:

- **Push to GitHub** → **Auto-deploy to both platforms**
- **No manual deployment needed** after initial setup
- **Environment variables** persist across deployments

## 🎉 Success Checklist

- ✅ Code pushed to GitHub
- ✅ Backend deployed to Render
- ✅ Frontend deployed to Netlify
- ✅ Database connected (MongoDB Atlas)
- ✅ Environment variables configured
- ✅ CORS properly configured
- ✅ Contact form working
- ✅ Admin dashboard accessible
- ✅ Portfolio/Services management working
- ✅ All pages loading correctly

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review deployment logs
3. Verify environment variables
4. Test API endpoints individually
5. Check browser console for errors

---

**Your portfolio is now live! 🚀**

- **Frontend**: https://your-site.netlify.app
- **Backend**: https://your-backend.onrender.com
- **Admin**: https://your-site.netlify.app/admin/login

Remember to update the URLs in this guide with your actual deployment URLs!