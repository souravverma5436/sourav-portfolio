import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('adminToken')
      setIsLoggedIn(!!token)
    }
    
    checkAuthStatus()
    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener('storage', checkAuthStatus)
    
    return () => window.removeEventListener('storage', checkAuthStatus)
  }, [location])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setIsLoggedIn(false)
    navigate('/')
    setIsMobileMenuOpen(false)
    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'))
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <Link to="/" className="cursor-hover">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl sm:text-2xl font-bold text-gradient"
            >
              SV
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`cursor-hover transition-colors duration-300 text-sm lg:text-base ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-white hover:text-primary'
                }`}
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </motion.span>
              </Link>
            ))}
            
            {/* Login/Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="cursor-hover"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 text-sm lg:text-base"
                >
                  Logout
                </motion.button>
              </button>
            ) : (
              <Link
                to="/admin/login"
                className="cursor-hover"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 text-sm lg:text-base"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden cursor-hover p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white"
              />
              <motion.div
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-white"
              />
              <motion.div
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden glass backdrop-blur-md rounded-b-2xl"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 cursor-hover transition-colors duration-300 rounded-lg mx-2 ${
                        location.pathname === item.path
                          ? 'text-primary bg-primary/10'
                          : 'text-white hover:text-primary hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Login/Logout Button */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="px-2 pt-2"
                >
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 cursor-hover"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/admin/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 cursor-hover"
                    >
                      Login
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar