# Sourav Verma - Graphic Designer Portfolio

A modern, fully functional portfolio website for Sourav Verma, featuring a React frontend with Vite, Node.js/Express backend, and MongoDB database.

## 🚀 Features

### Frontend
- **React + Vite** - Fast development and build
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **React Three Fiber** - 3D particle background
- **Custom Animated Cursor** - Interactive cursor effects
- **Glassmorphism UI** - Modern glass-like design
- **Fully Responsive** - Mobile-first design
- **Dark Theme** - Professional dark color scheme

### Backend
- **Node.js + Express** - RESTful API
- **MongoDB** - Database for contact messages
- **Input Validation** - Secure form handling
- **CORS & Helmet** - Security middleware
- **Error Handling** - Comprehensive error management

### Pages
1. **Home** - Hero section with animated counters
2. **About** - Personal story and skills
3. **Portfolio** - Project showcase with modal gallery
4. **Services** - Service offerings with pricing
5. **Contact** - Working contact form + direct links

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd sourav-portfolio
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm run install-all
```

### 3. Environment Setup
```bash
# Copy environment file
cp .env.example server/.env

# Edit server/.env with your MongoDB connection
```

### 4. Start Development
```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run client  # Frontend only (http://localhost:5173)
npm run server  # Backend only (http://localhost:5000)
```

## 📁 Project Structure

```
sourav-portfolio/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── server/                # Node.js Backend
│   ├── index.js          # Server entry point
│   ├── .env              # Environment variables
│   └── package.json      # Backend dependencies
├── package.json          # Root package.json
└── README.md            # This file
```

## 🔧 Configuration

### MongoDB Setup

#### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use default connection: `mongodb://localhost:27017/sourav-portfolio`

#### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create cluster and database
3. Get connection string
4. Update `MONGODB_URI` in `server/.env`

### Environment Variables
```bash
# server/.env
MONGODB_URI=mongodb://localhost:27017/sourav-portfolio
PORT=5000
NODE_ENV=development
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Deploy with your preferred platform
```

### Full Stack (Railway/Render)
- Deploy entire repository
- Set build command: `npm run install-all && npm run build`
- Set start command: `npm start`

## 📱 Mobile App Ready

The frontend is structured for easy conversion to:
- **React Native** - Reuse components and logic
- **Expo** - Quick mobile deployment
- **WebView App** - Wrap in native container

## 🎨 Customization

### Colors (tailwind.config.js)
```javascript
colors: {
  primary: '#6366f1',    // Main brand color
  secondary: '#8b5cf6',  // Secondary brand color
  accent: '#06b6d4',     // Accent color
}
```

### Contact Information
Update in `src/pages/Contact.jsx`:
- Email: `souravverma5436@gmail.com`
- Instagram Design: `@sv_desizns`
- Instagram Personal: `@its_sverma`

## 🔗 API Endpoints

### Contact Form
```
POST /api/contact
Body: {
  name: string,
  email: string,
  service: string,
  message: string
}
```

### Get Messages (Admin)
```
GET /api/messages
```

### Health Check
```
GET /api/health
```

## ✨ Key Features Implemented

### ✅ Functional Requirements
- [x] All buttons work and navigate correctly
- [x] Contact form submits to backend
- [x] Instagram links open correctly
- [x] Email links work with mailto
- [x] Portfolio modal navigation (next/prev/close)
- [x] Smooth scrolling and animations
- [x] Custom animated cursor
- [x] 3D particle background
- [x] Responsive design

### ✅ Technical Requirements
- [x] React + Vite frontend
- [x] Node.js + Express backend
- [x] MongoDB database
- [x] Tailwind CSS styling
- [x] Framer Motion animations
- [x] Three.js 3D effects
- [x] Input validation
- [x] Error handling
- [x] CORS and security

## 🎯 Performance Optimizations

- Lazy loading for images
- Optimized animations with Framer Motion
- Efficient 3D rendering with React Three Fiber
- Minimal bundle size with Vite
- Compressed assets and code splitting

## 🔒 Security Features

- Input validation and sanitization
- CORS protection
- Helmet security headers
- Rate limiting ready
- Environment variable protection

## 📞 Support

For questions or issues:
- Email: souravverma5436@gmail.com
- Instagram: @sv_desizns

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for Sourav Verma's Design Portfolio**