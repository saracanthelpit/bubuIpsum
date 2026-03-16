import { useState, useEffect } from 'react'
import { Metaballs } from '@paper-design/shaders-react'

function MetaballsBackground() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Metaballs
        width={dimensions.width}
        height={dimensions.height}
        colors={['#ff10f0', '#ccff00', '#00ffff']}
        colorBack="#00000000"
        count={4}
        size={0.85}
        speed={0.5}
        offsetX={-0.5}
        webGlContextAttributes={{ alpha: true, premultipliedAlpha: false }}
      />
    </div>
  )
}

export default MetaballsBackground
