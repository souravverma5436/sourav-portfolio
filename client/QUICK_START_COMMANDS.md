# ⚡ Quick Start Commands

## 🚀 Fastest Way to Run Everything

### 1. One-Command Setup
```bash
npm run install-all
```

### 2. Start Web Application
```bash
npm run dev
```
**Opens:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Admin: http://localhost:5173/admin/login (admin/admin123)

### 3. Start Mobile App (Optional)
```bash
cd mobile && npm start
```
**Then:** Scan QR code with Expo Go app on your phone

---

## 📱 Individual Commands

### Frontend Only
```bash
cd client
npm install
npm run dev
```

### Backend Only
```bash
cd server
npm install
npm run dev
```

### Mobile Only
```bash
cd mobile
npm install
npm start
```

---

## 🔧 If Something Breaks

### Reset Everything
```bash
npm run clean
npm run install-all
npm run dev
```

### Kill Ports
```bash
npx kill-port 5173 5000
```

### Check Health
```bash
# Backend health check
curl http://localhost:5000/api/health

# Or visit in browser
http://localhost:5000/api/health
```

---

## 📋 What You'll See

### ✅ Success Indicators:
- **Frontend**: Portfolio website loads with animations
- **Backend**: API health endpoint returns success
- **Admin**: Can login with admin/admin123
- **Mobile**: QR code appears, app loads on phone

### ❌ Common Issues:
- **Port in use**: Run `npx kill-port 5173 5000`
- **MongoDB error**: Start MongoDB or check Atlas connection
- **Dependencies**: Run `npm run clean && npm run install-all`

---

## 🎯 Test Everything Works

### Web (http://localhost:5173)
- [ ] Pages load and navigate
- [ ] Contact form submits
- [ ] Instagram links work
- [ ] Animations are smooth

### Admin (http://localhost:5173/admin/login)
- [ ] Login with admin/admin123
- [ ] Dashboard shows stats
- [ ] Can view/manage messages

### Mobile (Expo Go App)
- [ ] Scan QR code
- [ ] App loads on phone
- [ ] Navigation works
- [ ] Touch interactions responsive

**🎉 All working? You're ready to go!**