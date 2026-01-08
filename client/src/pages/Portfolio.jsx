import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'logo', name: 'Logo Design' },
    { id: 'branding', name: 'Branding' },
    { id: 'social', name: 'Social Media' }
  ]

  const projects = [
    {
      id: 1,
      title: 'Modern Tech Logo',
      category: 'logo',
      description: 'Clean and modern logo design for a tech startup',
      image: 'tech-logo',
      tags: ['Logo', 'Branding', 'Tech']
    },
    {
      id: 2,
      title: 'Restaurant Branding',
      category: 'branding',
      description: 'Complete brand identity for a premium restaurant',
      image: 'restaurant-brand',
      tags: ['Branding', 'Identity', 'Food']
    },
    {
      id: 3,
      title: 'Social Media Campaign',
      category: 'social',
      description: 'Engaging social media graphics for fashion brand',
      image: 'social-campaign',
      tags: ['Social Media', 'Fashion', 'Campaign']
    },
    {
      id: 4,
      title: 'Fitness App Logo',
      category: 'logo',
      description: 'Dynamic logo design for fitness application',
      image: 'fitness-logo',
      tags: ['Logo', 'App', 'Fitness']
    },
    {
      id: 5,
      title: 'Coffee Shop Identity',
      category: 'branding',
      description: 'Warm and inviting brand identity for coffee shop',
      image: 'coffee-brand',
      tags: ['Branding', 'Coffee', 'Identity']
    },
    {
      id: 6,
      title: 'Instagram Stories',
      category: 'social',
      description: 'Creative Instagram story templates',
      image: 'insta-stories',
      tags: ['Social Media', 'Instagram', 'Templates']
    }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const openModal = (project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'unset'
  }

  const nextProject = () => {
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id)
    const nextIndex = (currentIndex + 1) % projects.length
    setSelectedProject(projects[nextIndex])
  }

  const prevProject = () => {
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id)
    const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1
    setSelectedProject(projects[prevIndex])
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
              My Portfolio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore my creative journey through various design projects and visual solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-hover ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'glass text-gray-300 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="glass rounded-2xl overflow-hidden card-hover cursor-hover group"
                  onClick={() => openModal(project)}
                  whileHover={{ y: -10 }}
                >
                  {/* Project Image */}
                  <div className="relative h-64 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white opacity-80">
                        {project.image.split('-')[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-semibold">View Project</span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-dark-lighter rounded-full text-sm text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Modal Content */}
            <motion.div
              className="relative glass rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark-light rounded-full flex items-center justify-center cursor-hover hover:bg-primary transition-colors"
              >
                <span className="text-white text-xl">×</span>
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevProject}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-dark-light rounded-full flex items-center justify-center cursor-hover hover:bg-primary transition-colors"
              >
                <span className="text-white">‹</span>
              </button>
              <button
                onClick={nextProject}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-dark-light rounded-full flex items-center justify-center cursor-hover hover:bg-primary transition-colors"
              >
                <span className="text-white">›</span>
              </button>

              {/* Project Image */}
              <div className="h-96 bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                <span className="text-6xl font-bold text-white opacity-80">
                  {selectedProject.image.split('-')[0].toUpperCase()}
                </span>
              </div>

              {/* Project Details */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-gray-400">
                  <p className="mb-4">
                    This project showcases my expertise in {selectedProject.category} design, 
                    combining creativity with strategic thinking to deliver impactful visual solutions.
                  </p>
                  <p>
                    The design process involved extensive research, conceptualization, and refinement 
                    to ensure the final result perfectly aligns with the client's vision and brand identity.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Portfolio