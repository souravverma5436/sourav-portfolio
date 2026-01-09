# Sourav Verma - Portfolio Website 🎨

A modern, responsive portfolio website for graphic designer Sourav Verma, built with React, Node.js, and MongoDB. Features a complete admin dashboard for content management.

![Portfolio Preview](https://via.placeholder.com/800x400/6366f1/ffffff?text=Sourav+Portfolio+Preview)

## ✨ Features

### 🎨 Frontend (React + Vite)
- **Modern Design**: Glass morphism UI with smooth animations
- **Fully Responsive**: Mobile-first design that works on all devices
- **Interactive Portfolio**: Filterable portfolio with modal views
- **Services Showcase**: Professional services with INR pricing
- **Contact Form**: Integrated contact form with phone/WhatsApp support
- **Admin Dashboard**: Complete content management system

### 🚀 Backend (Node.js + Express)
- **RESTful API**: Complete API for all frontend operations
- **Authentication**: JWT-based admin authentication
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Comprehensive input validation
- **Security**: Helmet, CORS, and security best practices

### 📱 Admin Features
- **Messages Management**: View and manage contact form submissions
- **Portfolio Management**: Add, edit, delete portfolio items
- **Services Management**: Manage services with INR pricing
- **User-Friendly Interface**: Modern dashboard with tabs and modals
- **Real-time Updates**: Instant content updates

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Git

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/sourav-portfolio.git
cd sourav-portfolio
```

### 2. Install Dependencies
```bash
npm run install-all
```

### 3. Environment Setup

**Backend (.env in server/ directory):**
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

**Frontend (.env.local in client/ directory):**
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Start Development
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run server  # Backend only
npm run client  # Frontend only
```

### 5. Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Dashboard**: http://localhost:5173/admin/login

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

## 📁 Project Structure

```
sourav-portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── main.jsx        # App entry point
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js            # Server entry point
│   ├── .env                # Environment variables
│   └── package.json
├── mobile/                 # React Native app (optional)
└── package.json            # Root package.json
```

## 🌐 Deployment

### Live Demo
- **Website**: [https://sourav-portfolio.netlify.app](https://sourav-portfolio.netlify.app)
- **Admin**: [https://sourav-portfolio.netlify.app/admin/login](https://sourav-portfolio.netlify.app/admin/login)

### Deploy Your Own

1. **GitHub**: Push code to your repository
2. **Backend**: Deploy to [Render](https://render.com)
3. **Frontend**: Deploy to [Netlify](https://netlify.com)

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📱 API Endpoints

### Public Endpoints
```
GET  /api/health           # Health check
POST /api/contact          # Submit contact form
GET  /api/portfolio        # Get portfolio items
GET  /api/services         # Get services
```

### Admin Endpoints (Authentication Required)
```
POST /api/admin/login      # Admin login
GET  /api/admin/stats      # Dashboard statistics
GET  /api/admin/messages   # Get contact messages
PATCH /api/admin/messages/:id/status  # Update message status

# Portfolio Management
GET    /api/admin/portfolio     # Get all portfolio items
POST   /api/admin/portfolio     # Create portfolio item
PUT    /api/admin/portfolio/:id # Update portfolio item
DELETE /api/admin/portfolio/:id # Delete portfolio item

# Services Management
GET    /api/admin/services      # Get all services
POST   /api/admin/services      # Create service
PUT    /api/admin/services/:id  # Update service
DELETE /api/admin/services/:id  # Delete service
```

## 🎨 Design Features

### Visual Design
- **Glass Morphism**: Modern glass-like UI elements
- **Gradient Backgrounds**: Beautiful color gradients
- **Smooth Animations**: Framer Motion powered animations
- **Responsive Typography**: Scales perfectly on all devices
- **Dark Theme**: Professional dark color scheme

### User Experience
- **Fast Loading**: Optimized images and lazy loading
- **Smooth Navigation**: Seamless page transitions
- **Mobile Optimized**: Touch-friendly interface
- **Accessibility**: WCAG compliant design
- **SEO Friendly**: Proper meta tags and structure

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start both frontend and backend
npm run client       # Start frontend only
npm run server       # Start backend only

# Building
npm run build        # Build frontend for production
npm run preview      # Preview production build

# Utilities
npm run setup        # Setup project
npm run troubleshoot # Troubleshoot issues
npm run clean        # Clean node_modules
npm test             # Run tests
```

### Environment Variables

**Frontend (client/.env.local):**
```env
VITE_API_BASE_URL=http://localhost:5000
```

**Backend (server/.env):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sourav Verma**
- Portfolio: [https://sourav-portfolio.netlify.app](https://sourav-portfolio.netlify.app)
- Instagram: [@sv_desizns](https://instagram.com/sv_desizns)
- Email: souravverma5436@gmail.com

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from various open-source icon libraries
- Images from Unsplash and placeholder services
- Community feedback and suggestions

## 📊 Project Stats

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Database**: MongoDB Atlas
- **Deployment**: Netlify + Render
- **Mobile**: React Native (optional)

---

**⭐ Star this repository if you found it helpful!**

For questions or support, please open an issue or contact [souravverma5436@gmail.com](mailto:souravverma5436@gmail.com).