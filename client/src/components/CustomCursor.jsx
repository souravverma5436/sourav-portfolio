import React, { useEffect, useState } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const updateFollower = () => {
      setFollowerPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.1,
        y: prev.y + (position.y - prev.y) * 0.1
      }))
    }

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.classList.contains('cursor-hover')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    const followerInterval = setInterval(updateFollower, 16)

    return () => {
      document.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      clearInterval(followerInterval)
    }
  }, [position])

  return (
    <>
      <div
        className={`cursor ${isHovering ? 'cursor-hover' : ''} ${isClicking ? 'cursor-click' : ''}`}
        style={{
          left: position.x - 10,
          top: position.y - 10,
        }}
      />
      <div
        className="cursor-follower"
        style={{
          left: followerPosition.x - 20,
          top: followerPosition.y - 20,
        }}
      />
    </>
  )
}

export default CustomCursor