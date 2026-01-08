import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

function Particles(props) {
  const ref = useRef()
  const [sphere] = React.useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })
  
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Particles />
      </Canvas>
      
      {/* CSS Particles for fallback */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full particle opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-dark-lighter opacity-90" />
    </div>
  )
}

export default ParticleBackground