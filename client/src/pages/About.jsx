import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  const skills = [
    { name: 'Logo Design', level: 95 },
    { name: 'Branding', level: 90 },
    { name: 'Social Media Design', level: 88 },
    { name: 'Print Design', level: 85 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'Illustration', level: 75 }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
              About Me
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Passionate graphic designer with a love for creating visual stories that connect and inspire
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="glass rounded-3xl p-8 card-hover">
                <div className="w-full h-96 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                  <span className="text-6xl font-bold text-white">SV</span>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-full opacity-60"
                animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary rounded-lg opacity-60"
                animate={{ y: [0, 10, 0], rotate: [0, -180, -360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Creative Designer & Visual Storyteller
              </h2>
              <div className="space-y-4 text-gray-300 text-lg">
                <p>
                  Hello! I'm Sourav Verma, a passionate graphic designer with over 3 years of experience 
                  in creating compelling visual narratives. I specialize in brand identity, logo design, 
                  and social media creatives that help businesses stand out in today's competitive market.
                </p>
                <p>
                  My design philosophy centers around the belief that great design should not only look 
                  beautiful but also communicate effectively. I work closely with clients to understand 
                  their vision and translate it into impactful visual solutions.
                </p>
                <p>
                  When I'm not designing, you can find me exploring new design trends, experimenting 
                  with different art styles, or sharing my work on Instagram where I connect with 
                  fellow creatives from around the world.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://instagram.com/sv_desizns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary cursor-hover"
                >
                  Design Portfolio
                </a>
                <a
                  href="https://instagram.com/its_sverma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary cursor-hover"
                >
                  Personal Profile
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
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
              Skills & Expertise
            </h2>
            <p className="text-gray-300 text-lg">
              Areas where I excel and continue to grow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="glass rounded-xl p-6 cursor-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <span className="text-primary font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-dark-lighter rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gradient mb-4">
              My Journey
            </h2>
            <p className="text-gray-300 text-lg">
              Key milestones in my design career
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                year: '2024',
                title: 'Senior Graphic Designer',
                description: 'Leading design projects and mentoring junior designers'
              },
              {
                year: '2023',
                title: 'Freelance Designer',
                description: 'Expanded client base and specialized in brand identity'
              },
              {
                year: '2022',
                title: 'Junior Designer',
                description: 'Started professional journey in graphic design'
              }
            ].map((item, index) => (
              <motion.div
                key={item.year}
                className="flex items-center space-x-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center font-bold text-lg">
                  {item.year}
                </div>
                <div className="glass rounded-xl p-6 flex-1 cursor-hover card-hover">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About