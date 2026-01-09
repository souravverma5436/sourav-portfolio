import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    let animationFrame

    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const smoothFollow = () => {
      if (cursorRef.current && followerRef.current) {
        const cursor = cursorRef.current
        const follower = followerRef.current
        
        // Smooth cursor movement
        cursor.style.transform = `translate3d(${position.x - 6}px, ${position.y - 6}px, 0)`
        
        // Smooth follower with delay
        const followerX = parseFloat(follower.style.left) || position.x - 20
        const followerY = parseFloat(follower.style.top) || position.y - 20
        
        const newX = followerX + (position.x - 20 - followerX) * 0.15
        const newY = followerY + (position.y - 20 - followerY) * 0.15
        
        follower.style.left = `${newX}px`
        follower.style.top = `${newY}px`
      }
      
      animationFrame = requestAnimationFrame(smoothFollow)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive = target.tagName === 'BUTTON' || 
                           target.tagName === 'A' || 
                           target.classList.contains('cursor-hover') ||
                           target.closest('button') ||
                           target.closest('a') ||
                           target.closest('.cursor-hover')
      
      setIsHovering(isInteractive)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Check if device supports hover (not touch device)
    const hasHover = window.matchMedia('(hover: hover)').matches
    
    if (hasHover) {
      document.addEventListener('mousemove', updateCursor)
      document.addEventListener('mouseover', handleMouseOver)
      document.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('mouseleave', handleMouseLeave)
      document.addEventListener('mouseenter', handleMouseEnter)
      
      smoothFollow()
    }

    return () => {
      if (hasHover) {
        document.removeEventListener('mousemove', updateCursor)
        document.removeEventListener('mouseover', handleMouseOver)
        document.removeEventListener('mousedown', handleMouseDown)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('mouseleave', handleMouseLeave)
        document.removeEventListener('mouseenter', handleMouseEnter)
      }
      
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [position])

  // Don't render on touch devices
  if (!window.matchMedia('(hover: hover)').matches) {
    return null
  }

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-mode-difference"
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />

      {/* Follower Ring */}
      <motion.div
        ref={followerRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid rgba(99, 102, 241, 0.3)',
          background: 'rgba(99, 102, 241, 0.05)',
          backdropFilter: 'blur(4px)',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovering ? 'rgba(139, 92, 246, 0.6)' : 'rgba(99, 102, 241, 0.3)',
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8
        }}
      />

      {/* Hover Glow Effect */}
      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: position.x - 30,
            top: position.y - 30,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </>
  )
}

export default CustomCursor