import React from 'react'
import { motion } from 'framer-motion'

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Logo Design',
      description: 'Create memorable and impactful logos that represent your brand identity perfectly',
      features: ['Custom Logo Design', 'Multiple Concepts', 'Vector Files', 'Brand Guidelines'],
      price: 'Starting at $299',
      icon: '🎨',
      gradient: 'from-primary to-secondary'
    },
    {
      id: 2,
      title: 'Branding',
      description: 'Complete brand identity solutions including logo, colors, typography, and guidelines',
      features: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guidelines', 'Business Cards'],
      price: 'Starting at $799',
      icon: '🏢',
      gradient: 'from-secondary to-accent'
    },
    {
      id: 3,
      title: 'Social Media Creatives',
      description: 'Eye-catching social media graphics that boost engagement and brand awareness',
      features: ['Instagram Posts', 'Story Templates', 'Facebook Covers', 'LinkedIn Graphics'],
      price: 'Starting at $199',
      icon: '📱',
      gradient: 'from-accent to-primary'
    },
    {
      id: 4,
      title: 'Posters & Ads',
      description: 'Compelling poster designs and advertisements that capture attention and drive action',
      features: ['Event Posters', 'Print Ads', 'Digital Banners', 'Promotional Materials'],
      price: 'Starting at $149',
      icon: '📢',
      gradient: 'from-primary via-secondary to-accent'
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Understanding your brand, goals, and target audience'
    },
    {
      step: '02',
      title: 'Concept',
      description: 'Creating initial design concepts and ideas'
    },
    {
      step: '03',
      title: 'Design',
      description: 'Developing and refining the chosen concept'
    },
    {
      step: '04',
      title: 'Delivery',
      description: 'Final files and brand guidelines delivery'
    }
  ]

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
              My Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional design services to elevate your brand and create lasting impressions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="glass rounded-3xl p-8 card-hover cursor-hover group relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Service Icon */}
                <motion.div
                  className="text-6xl mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.icon}
                </motion.div>

                {/* Service Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + idx * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gradient">
                    {service.price}
                  </span>
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-dark-light/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gradient mb-4">
              My Design Process
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A structured approach to ensure every project delivers exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Step Number */}
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.step}
                </motion.div>

                {/* Step Content */}
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>

                {/* Connection Line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your design needs and create something amazing together
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="btn-primary cursor-hover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.a>
              <motion.a
                href="https://instagram.com/sv_desizns"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary cursor-hover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20"
            animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-lg opacity-20"
            animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>
    </div>
  )
}

export default Services