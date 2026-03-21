import { Metaballs } from '@paper-design/shaders-react'

function MetaballsBackground() {
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
        colors={['#ff10f0', '#ccff00', '#00ffff']}
        colorBack="#00000000"
        count={4}
        size={0.85}
        speed={1}
        offsetX={-0.5}
        webGlContextAttributes={{ alpha: true, premultipliedAlpha: false }}
      />
    </div>
  )
}

export default MetaballsBackground
