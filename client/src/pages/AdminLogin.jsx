import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { apiClient } from '../utils/api'

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!credentials.username || !credentials.password) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)

    try {
      console.log('🔍 Attempting login with:', { username: credentials.username })
      
      const response = await apiClient.adminLogin(credentials)

      console.log('✅ Login response:', response.data)

      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.data.token)
        localStorage.setItem('adminUser', JSON.stringify(response.data.data.admin))
        toast.success('Login successful!')
        // Trigger a storage event to update navbar
        window.dispatchEvent(new Event('storage'))
        navigate('/admin/dashboard')
      }
    } catch (error) {
      console.error('❌ Login error:', error)
      
      if (error.response) {
        // Server responded with error
        const errorMessage = error.response.data?.message || 'Login failed'
        toast.error(errorMessage)
        console.log('📋 Server error:', error.response.data)
      } else if (error.request) {
        // Network error
        toast.error('Cannot connect to server. Please check if the backend is running.')
        console.log('📋 Network error. Is the server running on http://localhost:5000?')
      } else {
        // Other error
        toast.error('An unexpected error occurred')
        console.log('📋 Unexpected error:', error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-dark">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full"
      >
        <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient mb-2">
              Admin Login
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Access the admin dashboard
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-lighter border border-gray-600 rounded-lg sm:rounded-xl focus:border-primary focus:outline-none transition-colors cursor-hover text-sm sm:text-base"
                placeholder="Enter username"
                disabled={isLoading}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-lighter border border-gray-600 rounded-lg sm:rounded-xl focus:border-primary focus:outline-none transition-colors cursor-hover text-sm sm:text-base"
                placeholder="Enter password"
                disabled={isLoading}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 cursor-hover text-sm sm:text-base ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary to-secondary hover:scale-105 hover:shadow-lg hover:shadow-primary/25'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500"
          >
            Authorized access only
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements - Hidden on mobile */}
      <motion.div
        className="hidden sm:block fixed top-20 left-10 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 pointer-events-none"
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hidden sm:block fixed bottom-20 right-10 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-secondary to-accent rounded-lg opacity-20 pointer-events-none"
        animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

export default AdminLogin
