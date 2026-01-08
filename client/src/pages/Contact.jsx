import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const services = [
    'Logo Design',
    'Branding',
    'Social Media Creatives',
    'Posters & Ads',
    'Other'
  ]

  const contactMethods = [
    {
      title: 'Design Portfolio',
      subtitle: '@sv_desizns',
      description: 'Check out my latest design work',
      link: 'https://instagram.com/sv_desizns',
      icon: '🎨',
      gradient: 'from-primary to-secondary'
    },
    {
      title: 'Personal Profile',
      subtitle: '@its_sverma',
      description: 'Connect with me personally',
      link: 'https://instagram.com/its_sverma',
      icon: '👋',
      gradient: 'from-secondary to-accent'
    },
    {
      title: 'Email Me',
      subtitle: 'souravverma5436@gmail.com',
      description: 'Send me a direct email',
      link: 'mailto:souravverma5436@gmail.com',
      icon: '📧',
      gradient: 'from-accent to-primary'
    }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await axios.post('/api/contact', formData)
      
      if (response.data.success) {
        toast.success('Message sent successfully! I\'ll get back to you soon.')
        setFormData({
          name: '',
          email: '',
          service: '',
          message: ''
        })
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message. Please try again or contact me directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
              Let's Work Together
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to bring your vision to life? Get in touch and let's create something amazing together
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="glass rounded-3xl p-8">
              <h2 className="text-3xl font-bold mb-6">Send Me a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl focus:border-primary focus:outline-none transition-colors cursor-hover"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl focus:border-primary focus:outline-none transition-colors cursor-hover"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Service Field */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service Needed *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl focus:border-primary focus:outline-none transition-colors cursor-hover"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-dark-lighter border border-gray-600 rounded-xl focus:border-primary focus:outline-none transition-colors resize-none cursor-hover"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 cursor-hover ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-secondary hover:scale-105 hover:shadow-lg hover:shadow-primary/25'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold mb-8">Other Ways to Connect</h2>
            
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : '_self'}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                className="block glass rounded-2xl p-6 card-hover cursor-hover group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${method.gradient} rounded-xl flex items-center justify-center text-2xl`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {method.icon}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-primary font-medium">{method.subtitle}</p>
                    <p className="text-gray-400 text-sm">{method.description}</p>
                  </div>
                  
                  <motion.div
                    className="text-gray-400 group-hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.a>
            ))}

            {/* Direct Email Display */}
            <motion.div
              className="glass rounded-2xl p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <h3 className="text-lg font-semibold mb-2">Direct Email</h3>
              <a
                href="mailto:souravverma5436@gmail.com"
                className="text-primary hover:text-secondary transition-colors cursor-hover text-lg"
              >
                souravverma5436@gmail.com
              </a>
            </motion.div>

            {/* Response Time */}
            <motion.div
              className="text-center text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <p className="text-sm">
                ⚡ I typically respond within 24 hours
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="fixed top-1/4 left-10 w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full opacity-10 pointer-events-none"
        animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-1/4 right-10 w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-lg opacity-10 pointer-events-none"
        animate={{ y: [0, 30, 0], rotate: [0, -180, -360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

export default Contact