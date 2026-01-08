import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="cursor-hover">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-gradient"
            >
              SV
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`cursor-hover transition-colors duration-300 ${
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
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden cursor-hover"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block cursor-hover transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-white hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar