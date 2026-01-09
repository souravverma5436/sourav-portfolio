# 🔧 Login Issue Troubleshooting Guide

## 🚨 **Common Login Issues & Solutions**

### **Issue 1: "Cannot connect to server"**
**Cause**: Backend server is not running
**Solution**:
```bash
# Start the backend server
cd server
npm start
```
**Expected output**: `🚀 Server running on port 5000`

### **Issue 2: "Invalid credentials"**
**Cause**: Admin user not created or wrong credentials
**Solution**: Use the correct default credentials:
- **Username**: `admin`
- **Password**: `admin123`

### **Issue 3: CORS errors in browser console**
**Cause**: Frontend can't connect to backend due to CORS
**Solution**: Backend CORS is already configured for localhost

### **Issue 4: Network timeout**
**Cause**: Backend taking too long to respond
**Solution**: Check MongoDB connection in backend

## 🔍 **Step-by-Step Debugging**

### **Step 1: Check Backend Server**
```bash
cd server
npm start
```
**Look for**:
- ✅ `✅ MongoDB Connected Successfully`
- ✅ `🔐 Default admin created: username: admin, password: admin123`
- ✅ `🚀 Server running on port 5000`

### **Step 2: Test Backend API**
Run the test script:
```bash
node test-login.js
```
**Expected output**:
- ✅ Health check successful
- ✅ Login successful with token

### **Step 3: Check Frontend**
```bash
cd client
npm run dev
```
**Look for**:
- ✅ Frontend running on `http://localhost:5173` or `http://localhost:5174`

### **Step 4: Test Login in Browser**
1. Go to `http://localhost:5173/admin/login`
2. Enter credentials: `admin` / `admin123`
3. Check browser console for errors
4. Check Network tab for API calls

## 🔧 **Quick Fixes**

### **Fix 1: Reset Admin User**
If admin user is corrupted, reset it:
```javascript
// Add this to server/index.js temporarily
const resetAdmin = async () => {
  await Admin.deleteOne({ username: 'admin' });
  console.log('Admin user deleted, will be recreated on next start');
};
// Call resetAdmin() before createDefaultAdmin()
```

### **Fix 2: Check MongoDB Connection**
Make sure your `.env` file has the correct MongoDB URI:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key
```

### **Fix 3: Clear Browser Storage**
Clear localStorage and try again:
```javascript
// In browser console
localStorage.clear()
```

### **Fix 4: Check Port Conflicts**
If port 5000 is busy, change it in `server/index.js`:
```javascript
const PORT = process.env.PORT || 5001; // Change to 5001
```
Then update frontend API_BASE_URL to `http://localhost:5001`

## 🐛 **Debug Mode**

### **Enable Debug Logging**
The AdminLogin component now has enhanced logging. Check browser console for:
- 🔍 Login attempt details
- ✅ Successful responses
- ❌ Error details with specific causes

### **Backend Debug**
Add this to see what's happening in the backend:
```javascript
// In server/index.js, add before the login endpoint
app.use('/api/admin/login', (req, res, next) => {
  console.log('🔍 Login attempt:', req.body);
  next();
});
```

## 📋 **Checklist Before Testing**

- [ ] Backend server is running (`npm start` in server folder)
- [ ] MongoDB is connected (check server logs)
- [ ] Frontend is running (`npm run dev` in client folder)
- [ ] Using correct credentials: `admin` / `admin123`
- [ ] No CORS errors in browser console
- [ ] Network tab shows API call to `http://localhost:5000/api/admin/login`

## 🎯 **Expected Login Flow**

1. **User enters credentials** → Frontend validates fields
2. **Frontend sends POST request** → `http://localhost:5000/api/admin/login`
3. **Backend validates credentials** → Checks against MongoDB
4. **Backend returns JWT token** → Frontend stores in localStorage
5. **Frontend redirects** → `/admin/dashboard`
6. **Navbar updates** → Shows "Logout" instead of "Login"

## 🚨 **If Still Not Working**

### **Check These Files**:
1. `server/.env` - MongoDB URI and JWT_SECRET
2. `server/index.js` - Admin creation and login endpoint
3. `client/src/pages/AdminLogin.jsx` - API URL and error handling

### **Common Error Messages**:
- **"Cannot connect to server"** → Backend not running
- **"Invalid credentials"** → Wrong username/password
- **"Validation failed"** → Password less than 6 characters
- **"Network Error"** → CORS or connection issue

### **Last Resort**:
1. Delete `node_modules` in both client and server
2. Run `npm install` in both folders
3. Restart both servers
4. Clear browser cache and localStorage

## 🎉 **Success Indicators**

When login works correctly, you should see:
- ✅ "Login successful!" toast message
- ✅ Redirect to `/admin/dashboard`
- ✅ Navbar shows "Logout" button
- ✅ Admin dashboard loads with message stats
- ✅ Browser console shows successful API responses

**If you're still having issues, check the browser console and server logs for specific error messages!**