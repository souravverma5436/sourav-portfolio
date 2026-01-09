# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Frontend (Vercel):
1. Push code to GitHub
2. Connect to Vercel
3. Build settings:
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/dist`
4. Deploy

#### Backend (Railway):
1. Connect GitHub repo
2. Deploy from `server/` folder
3. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   NODE_ENV=production
   ```

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend (Netlify):
1. Drag & drop `client/dist` folder after running `npm run build`
2. Or connect GitHub and set:
   - Build Command: `cd client && npm run build`
   - Publish Directory: `client/dist`

#### Backend (Render):
1. Connect GitHub
2. Set:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
3. Add environment variables

### Option 3: Full Stack on Railway/Render

1. Deploy entire repository
2. Build Command: `npm run install-all && cd client && npm run build`
3. Start Command: `cd server && npm start`
4. Add MongoDB environment variable

## MongoDB Setup

### MongoDB Atlas (Recommended):
1. Create account at mongodb.com/atlas
2. Create cluster
3. Get connection string
4. Replace in environment variables

### Local MongoDB:
```bash
# Install MongoDB
# Start service
mongod

# Use local connection
MONGODB_URI=mongodb://localhost:27017/sourav-portfolio
```

## Environment Variables

```bash
# Production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sourav-portfolio
PORT=5000
NODE_ENV=production
```

## Custom Domain Setup

1. Add custom domain in hosting platform
2. Update CORS settings in server if needed
3. Update API endpoints in client if using different domains

## Performance Optimizations

- Enable gzip compression
- Set up CDN for static assets
- Configure caching headers
- Optimize images and assets

---

**Your portfolio is now ready for production! 🎉**