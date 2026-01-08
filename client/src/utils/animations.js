// Brand Animation System
// Consistent, premium animations across the portfolio

export const brandAnimations = {
  // Timing constants
  timing: {
    fast: 0.3,
    medium: 0.6,
    slow: 1.0,
    extraSlow: 1.5
  },

  // Easing curves
  easing: {
    smooth: [0.25, 0.1, 0.25, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.175, 0.885, 0.32, 1.275],
    sharp: [0.4, 0, 0.2, 1]
  },

  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },

  // Staggered reveal for lists/grids
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  },

  // Magnetic hover effect
  magneticHover: {
    whileHover: { 
      scale: 1.05,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
    },
    whileTap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  },

  // Soft glow hover
  glowHover: {
    whileHover: {
      boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
      transition: { duration: 0.3 }
    }
  },

  // Card hover with lift
  cardHover: {
    whileHover: {
      y: -10,
      scale: 1.02,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
    }
  },

  // Floating animation
  floating: {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },

  // Pulse animation
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },

  // Slide in from directions
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  },

  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  },

  slideInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  },

  // Modal animations
  modalBackdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },

  modalContent: {
    initial: { opacity: 0, scale: 0.8, y: 50 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.3 }
    }
  },

  // Button animations
  buttonPrimary: {
    whileHover: { 
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
      transition: { duration: 0.3 }
    },
    whileTap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  },

  buttonSecondary: {
    whileHover: { 
      scale: 1.05,
      borderColor: "#8b5cf6",
      color: "#8b5cf6",
      transition: { duration: 0.3 }
    },
    whileTap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  },

  // Text animations
  textReveal: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  },

  // Counter animation
  counter: {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: 0.2
      }
    }
  },

  // Loading animations
  spinner: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  },

  // Parallax scroll effect
  parallax: (offset = 50) => ({
    initial: { y: offset },
    animate: { y: 0 },
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
  })
}

// Viewport animation variants
export const viewportAnimations = {
  // Animate when element enters viewport
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    },
    viewport: { once: true, margin: "-100px" }
  },

  fadeInLeft: {
    initial: { opacity: 0, x: -60 },
    whileInView: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    },
    viewport: { once: true, margin: "-100px" }
  },

  fadeInRight: {
    initial: { opacity: 0, x: 60 },
    whileInView: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    },
    viewport: { once: true, margin: "-100px" }
  },

  scaleInView: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    },
    viewport: { once: true, margin: "-100px" }
  }
}

// Animation utilities
export const animationUtils = {
  // Create staggered animation for children
  createStagger: (staggerDelay = 0.1, childDelay = 0.2) => ({
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay
      }
    }
  }),

  // Create delayed animation
  createDelay: (delay = 0.2) => ({
    transition: { delay }
  }),

  // Create spring animation
  createSpring: (stiffness = 300, damping = 30) => ({
    type: "spring",
    stiffness,
    damping
  })
}