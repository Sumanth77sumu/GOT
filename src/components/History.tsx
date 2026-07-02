import { useRef, type MouseEvent } from 'react'
import './History.css'

const History = () => {
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
    <section id="history" className="history-section">
      <div
        ref={wrapRef}
        className="history-video-perspective"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={videoWrapRef} className="history-video-wrap">
          <video
            className="history-video"
            src="/video/history.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <div ref={glareRef} className="history-video-glare" />
        </div>
      </div>

      <div className="history-overlay" />

      <header className="history-header">
        <p className="history-eyebrow">A THOUSAND YEARS OF WAR</p>
        <div className="history-ornament">
          <span className="history-ornament-line" />
          <span className="history-ornament-rune">✦</span>
          <span className="history-ornament-line" />
        </div>
        <h1 className="history-title">
          The History<br />
          <em>of Westeros</em>
        </h1>
      </header>
    </section>
  )
}

export default History
