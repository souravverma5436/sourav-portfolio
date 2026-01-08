import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { brandAnimations, viewportAnimations, animationUtils } from '../utils/animations'

const Home = () => {
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0
  })

  useEffect(() => {
    const animateCounters = () => {
      const targets = { projects: 150, clients: 50, experience: 3 }
      const duration = 2000
      const steps = 60
      const stepTime = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setCounters({
          projects: Math.floor(targets.projects * progress),
          clients: Math.floor(targets.clients * progress),
          experience: Math.floor(targets.experience * progress)
        })

        if (currentStep >= steps) {
          clearInterval(interval)
          setCounters(targets)
        }
      }, stepTime)
    }

    const timer = setTimeout(animateCounters, 1000)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            {...brandAnimations.slideInUp}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              {...brandAnimations.textReveal}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-white">Hi, I'm </span>
              <span className="text-gradient">Sourav Verma</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              {...brandAnimations.textReveal}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Creative Graphic Designer & Visual Storyteller
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                onClick={() => scrollToSection('portfolio')}
                className="btn-primary cursor-hover"
                {...brandAnimations.buttonPrimary}
              >
                View Portfolio
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="btn-secondary cursor-hover"
                {...brandAnimations.buttonSecondary}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Enhanced Floating 3D Elements */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20"
            {...brandAnimations.floating}
            style={{ animationDelay: '0s' }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-lg opacity-20"
            {...brandAnimations.floating}
            style={{ animationDelay: '2s' }}
          />
          <motion.div
            className="absolute top-1/3 right-20 w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full opacity-15"
            {...brandAnimations.pulse}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            {...brandAnimations.staggerContainer}
            {...viewportAnimations.fadeInUp}
          >
            <motion.div 
              className="text-center glass rounded-2xl p-8 card-hover cursor-hover"
              {...brandAnimations.staggerItem}
              {...brandAnimations.cardHover}
              {...brandAnimations.glowHover}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-gradient mb-2"
                {...brandAnimations.counter}
                transition={{ delay: 0.2 }}
              >
                {counters.projects}+
              </motion.div>
              <p className="text-gray-300">Projects Completed</p>
            </motion.div>

            <motion.div 
              className="text-center glass rounded-2xl p-8 card-hover cursor-hover"
              {...brandAnimations.staggerItem}
              {...brandAnimations.cardHover}
              {...brandAnimations.glowHover}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-gradient mb-2"
                {...brandAnimations.counter}
                transition={{ delay: 0.4 }}
              >
                {counters.clients}+
              </motion.div>
              <p className="text-gray-300">Happy Clients</p>
            </motion.div>

            <motion.div 
              className="text-center glass rounded-2xl p-8 card-hover cursor-hover"
              {...brandAnimations.staggerItem}
              {...brandAnimations.cardHover}
              {...brandAnimations.glowHover}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-gradient mb-2"
                {...brandAnimations.counter}
                transition={{ delay: 0.6 }}
              >
                {counters.experience}+
              </motion.div>
              <p className="text-gray-300">Years Experience</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section id="portfolio" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Featured Work
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Explore some of my recent design projects and creative solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                className="glass rounded-2xl overflow-hidden card-hover cursor-hover"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: item * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="h-64 bg-gradient-to-br from-primary to-secondary opacity-80" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Project {item}</h3>
                  <p className="text-gray-400">Creative design solution</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link to="/portfolio" className="btn-primary cursor-hover">
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Let's Create Something Amazing
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Ready to bring your vision to life? Let's discuss your next project
            </p>
            <Link to="/contact" className="btn-primary cursor-hover">
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home