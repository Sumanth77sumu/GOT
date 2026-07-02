import { useRef, type MouseEvent } from 'react'
import './TheWorld.css'

const TheWorld = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const videoWrapRef = useRef<HTMLDivElement | null>(null)
  const glareRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect || !videoWrapRef.current || !glareRef.current) return

    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const x = (px - 0.5) * 12
    const y = (py - 0.5) * 12

    videoWrapRef.current.style.transform =
      `perspective(1400px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.035)`
    glareRef.current.style.setProperty('--glare-x', `${px * 100}%`)
    glareRef.current.style.setProperty('--glare-y', `${py * 100}%`)
  }

  const handleMouseEnter = () => {
    videoWrapRef.current?.classList.add('is-hovering')
  }

  const handleMouseLeave = () => {
    videoWrapRef.current?.classList.remove('is-hovering')
    if (videoWrapRef.current) videoWrapRef.current.style.transform = ''
  }

  return (
    <section id="world" className="world-section">
      <div
        ref={wrapRef}
        className="world-video-perspective"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={videoWrapRef} className="world-video-wrap">
          <video
            className="world-video"
            src="/video/the_world.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <div ref={glareRef} className="world-video-glare" />
        </div>
      </div>

      <div className="world-overlay" />

      <header className="world-header">
        <p className="world-eyebrow">A LAND OF SEVEN KINGDOMS</p>
        <div className="world-ornament">
          <span className="world-ornament-line" />
          <span className="world-ornament-rune">✦</span>
          <span className="world-ornament-line" />
        </div>
        <h1 className="world-title">
          The World<br />
          <em>of Westeros</em>
        </h1>
      </header>
    </section>
  )
}

export default TheWorld
