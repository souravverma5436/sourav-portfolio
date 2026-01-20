# Complete Setup & Deployment Guide 🚀

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account
- MongoDB Atlas account (free)
- Render account (free)
- Netlify account (free)

## 🔧 Local Development Setup

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/sourav-portfolio.git
cd sourav-portfolio

# Install all dependencies
npm run install-all
```

### Step 2: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account

2. **Create Cluster**:
   - Create a new cluster (free tier)
   - Choose cloud provider and region
   - Wait for cluster to be created

3. **Create Database User**:
   - Go to Database Access
   - Add new database user
   - Username: `portfoliouser`
   - Password: Generate secure password
   - Give "Read and write to any database" permissions

4. **Configure Network Access**:
   - Go to Network Access
   - Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
   - This is required for Render deployment

5. **Get Connection String**:
   - Go to Database → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

### Step 3: Environment Variables

**Backend (.env in server/ directory)**:
```env
MONGODB_URI=mongodb+srv://portfoliouser:yourpassword@cluster0.xxxxx.mongodb.net/sourav-portfolio?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-32-character-secret-key-here
NODE_ENV=development
PORT=5000
```

**Frontend (.env.local in client/ directory)**:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### Step 4: Start Development

```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run server  # Backend: http://localhost:5000
npm run client  # Frontend: http://localhost:5173
```

### Step 5: Test Local Setup

1. **Backend Health Check**: http://localhost:5000/api/health
2. **Frontend**: http://localhost:5173
3. **Admin Login**: http://localhost:5173/admin/login
   - Username: `admin`
   - Password: `admin123`

## 🌐 Production Deployment

### Step 1: GitHub Repository

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Complete portfolio project"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/sourav-portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Render

1. **Create Render Account**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub account

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Service**:
   - **Name**: `sourav-portfolio-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Set Environment Variables**:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your-super-secure-32-character-secret-key
   NODE_ENV=production
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Note your backend URL: `https://your-service-name.onrender.com`

6. **Test Backend**:
   - Visit: `https://your-service-name.onrender.com/api/health`
   - Should show database connected: true

### Step 3: Deploy Frontend to Netlify

1. **Update Environment Variables**:
   - Edit `client/.env.production`:
   ```env
   VITE_API_BASE_URL=https://your-actual-render-service.onrender.com
   ```

2. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Update production API URL"
   git push origin main
   ```

3. **Create Netlify Account**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub account

4. **Deploy Site**:
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select your repository

5. **Configure Build Settings**:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`

6. **Set Environment Variables**:
   - Go to Site settings → Environment variables
   - Add: `VITE_API_BASE_URL` = `https://your-render-service.onrender.com`

7. **Deploy**:
   - Click "Deploy site"
   - Wait 2-5 minutes for deployment
   - Note your frontend URL: `https://random-name.netlify.app`

### Step 4: Update CORS Configuration

1. **Update Backend CORS**:
   - Edit `server/index.js`
   - Add your Netlify URL to CORS origins:
   ```javascript
   origin: [
     'https://your-actual-netlify-site.netlify.app',
     /\.netlify\.app$/,
     // ... other origins
   ]
   ```

2. **Commit and Push**:
   ```bash
   git add .
   git commit -m "Update CORS for production"
   git push origin main
   ```

3. **Render will auto-deploy** the updated backend

## ✅ Testing Production Deployment

### Frontend Testing
- [ ] Home page loads correctly
- [ ] About page displays properly
- [ ] Portfolio page shows items and filtering works
- [ ] Services page displays with INR pricing
- [ ] Contact form submits successfully
- [ ] Admin login works
- [ ] Admin dashboard fully functional
- [ ] Mobile responsiveness verified

### Backend Testing
- [ ] Health endpoint: `GET /api/health`
- [ ] Contact form: `POST /api/contact`
- [ ] Portfolio API: `GET /api/portfolio`
- [ ] Services API: `GET /api/services`
- [ ] Admin login: `POST /api/admin/login`

### Integration Testing
- [ ] Contact form saves to database
- [ ] Admin can view submitted messages
- [ ] Portfolio management works (CRUD operations)
- [ ] Services management works (CRUD operations)

## 🚨 Troubleshooting

### MongoDB Connection Issues
1. **Check IP Whitelist**: Must include `0.0.0.0/0`
2. **Verify Connection String**: No special characters in password
3. **Database User Permissions**: Must have read/write access

### CORS Errors
1. **Check Environment Variables**: Verify `VITE_API_BASE_URL`
2. **Update CORS Origins**: Add your Netlify URL to backend

### Build Failures
1. **Node.js Version**: Ensure compatibility
2. **Dependencies**: Run `npm install` in correct directories
3. **Environment Variables**: Verify all required variables are set

## 🔄 Making Updates

### Code Changes
```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main
```

Both Render and Netlify will automatically deploy your changes.

### Environment Variables
- **Render**: Update in service dashboard → Environment
- **Netlify**: Update in site settings → Environment variables

## 📞 Support Resources

- **Render Documentation**: https://render.com/docs
- **Netlify Documentation**: https://docs.netlify.com
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

## 🎉 Success!

After completing this guide, you'll have:

- ✅ **Live Portfolio Website**: Professional portfolio with modern design
- ✅ **Admin Dashboard**: Full content management system
- ✅ **Contact Form**: Working contact form with database storage
- ✅ **Mobile Responsive**: Works perfectly on all devices
- ✅ **Production Ready**: Deployed on professional platforms

**Your portfolio is now live and ready to showcase amazing design work! 🚀**

---

**Live URLs** (update with your actual URLs):
- **Website**: https://your-site.netlify.app
- **Admin**: https://your-site.netlify.app/admin/login
- **API**: https://your-backend.onrender.com