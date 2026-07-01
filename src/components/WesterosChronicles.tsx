import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './WesterosChronicles.css'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({
  ignoreMobileResize: true,
})

type ChronicleChapter = {
  id: string
  progress: [number, number]
  title: string
  subtitle: string
  body: string
  sigil: string
}

const CHRONICLE_CHAPTERS: ChronicleChapter[] = [
  {
    id: 'prologue',
    progress: [0, 0.12],
    title: 'The Ancient Chronicles',
    subtitle: 'A SONG OF ICE AND FIRE',
    body: 'In the beginning, there were only the words of the Maesters — secrets sealed within ancient tomes, waiting for a hand brave enough to open them.',
    sigil: '✦',
  },
  {
    id: 'winterfell',
    progress: [0.12, 0.30],
    title: 'The North Remembers',
    subtitle: 'HOUSE STARK — WINTERFELL',
    body: 'Winter is coming. Beyond the ancient walls, the cold whispers of the North carry stories older than the Wall itself.',
    sigil: '⚔',
  },
  {
    id: 'westeros',
    progress: [0.30, 0.52],
    title: 'The Seven Kingdoms',
    subtitle: 'THE REALM OF WESTEROS',
    body: "From the Eyrie's clouded peaks to the red sands of Dorne — seven kingdoms, one throne, a thousand reasons to bleed.",
    sigil: '♜',
  },
  {
    id: 'kings-landing',
    progress: [0.52, 0.70],
    title: 'Where Crowns Are Won',
    subtitle: "KING'S LANDING — THE CAPITAL",
    body: 'The city that swallows kings whole. Gold and treachery perfume the air. Every smile here conceals a blade.',
    sigil: '👑',
  },
  {
  id: 'dragons',
  progress: [0.00, 0.12],
  title: 'The Last Dragons',
  subtitle: 'FIRE MADE FLESH',
  body: 'Once they ruled the skies with flame and shadow. Though their roar has faded into legend, the world still trembles at the memory of dragons.',
  sigil: '🐉',
},
{
  id: 'the-wall',
  progress: [0.12, 0.24],
  title: 'The Wall',
  subtitle: 'THE NIGHT\'S WATCH',
  body: 'For eight thousand years, an endless wall of ice has guarded the realm. Beyond it lies a darkness that neither kings nor kingdoms can command.',
  sigil: '🧊',
},
{
  id: 'winterfell',
  progress: [0.24, 0.36],
  title: 'The North Remembers',
  subtitle: 'HOUSE STARK — WINTERFELL',
  body: 'Honor is the currency of the North. Beneath ancient weirwoods and endless snows, loyalty endures long after crowns have fallen.',
  sigil: '🐺',
},
{
  id: 'iron-throne',
  progress: [0.84, 1.0],
  title: 'The Iron Throne',
  subtitle: 'POWER DEMANDS A PRICE',
  body: 'Forged from the swords of defeated kings, the Iron Throne has never belonged to the worthy alone. Every ruler must decide what they are willing to sacrifice for it.',
  sigil: '♔',
},
]

const CHRONICLE_SCROLL_LENGTH = CHRONICLE_CHAPTERS.length * 2
const TOTAL_CHAPTERS = CHRONICLE_CHAPTERS.length

CHRONICLE_CHAPTERS.forEach((chapter, index) => {
  chapter.progress = [
    index / TOTAL_CHAPTERS,
    (index + 1) / TOTAL_CHAPTERS,
  ]
})

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const invlerp = (a: number, b: number, v: number) => clamp((v - a) / (b - a), 0, 1)

type Props = {
    showCharacters: boolean;
    setShowCharacters: React.Dispatch<React.SetStateAction<boolean>>;
};

const WesterosChronicles = ({
    showCharacters,
    setShowCharacters,
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const subtitleRef = useRef<HTMLSpanElement | null>(null)
  const bodyRef = useRef<HTMLParagraphElement | null>(null)
  const sigilRef = useRef<HTMLSpanElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const vignetteRef = useRef<HTMLDivElement | null>(null)
  const chapterLabelRef = useRef<HTMLDivElement | null>(null)
  const runeBarRef = useRef<HTMLDivElement | null>(null)
  const chapterTimelineRef = useRef<gsap.core.Timeline | null>(null)

  const [activeChapter, setActiveChapter] = useState(0)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [videoSrc, setVideoSrc] = useState('/video/one.mp4')
  const [audioSrc] = useState("/audio/got-theme.mp3")
  const [audioError, setAudioError] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const optimizedVideoChecked = useRef(false)
  const didFallback = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasUserInteracted = useRef(false)

  const navItems = [
    { label: "The World", href: "#world" },
    { label: "Characters", href: "#characters" },
    { label: "Houses", href: "#houses" },
    { label: "History", href: "#history" },
  ];

  useEffect(() => {
    const optimizedSrc = '/video/one-optimized.mp4'
    if (optimizedVideoChecked.current) return
    optimizedVideoChecked.current = true

    fetch(optimizedSrc, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          setVideoSrc(optimizedSrc)
        }
      })
      .catch(() => {
        // If the optimized video is absent, keep the original source.
      })
  }, [])

  

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => setIsAudioPlaying(false)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audioSrc])

  useEffect(() => {
    if (!audioSrc || audioError) return

    const tryPlayOnInteraction = () => {
      if (hasUserInteracted.current) return
      hasUserInteracted.current = true

      const audio = audioRef.current
      if (!audio) return

      audio.volume = 0.28
      audio.play().then(() => setIsAudioPlaying(true)).catch(() => {
        // Autoplay may still be blocked until the browser allows it.
      })
    }

    window.addEventListener('pointerdown', tryPlayOnInteraction, { once: true })
    window.addEventListener('wheel', tryPlayOnInteraction, { once: true, passive: true })
    window.addEventListener('scroll', tryPlayOnInteraction, { once: true, passive: true })

    return () => {
      window.removeEventListener('pointerdown', tryPlayOnInteraction)
      window.removeEventListener('wheel', tryPlayOnInteraction)
      window.removeEventListener('scroll', tryPlayOnInteraction)
    }
  }, [audioSrc, audioError])

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        audioRef.current?.pause()
        setIsAudioPlaying(false)
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  const prevChapter = useRef(-1)
  const transitionChapter = (idx: number) => {
    if (prevChapter.current === idx) return
    prevChapter.current = idx
    setActiveChapter(idx)

    const ch = CHRONICLE_CHAPTERS[idx]
    chapterTimelineRef.current?.kill()
    chapterTimelineRef.current = gsap.timeline()

    chapterTimelineRef.current.to([titleRef.current, subtitleRef.current, bodyRef.current, sigilRef.current], {
      y: -24,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      stagger: 0.04,
    })
      .call(() => {
        if (titleRef.current) titleRef.current.textContent = ch.title
        if (subtitleRef.current) subtitleRef.current.textContent = ch.subtitle
        if (bodyRef.current) bodyRef.current.textContent = ch.body
        if (sigilRef.current) sigilRef.current.textContent = ch.sigil
      })
      .fromTo(
        [sigilRef.current, subtitleRef.current, titleRef.current, bodyRef.current],
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.07 },
      )

    if (chapterLabelRef.current) {
      gsap.fromTo(
        chapterLabelRef.current,
        { opacity: 0, x: 12 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
      )
      chapterLabelRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(CHRONICLE_CHAPTERS.length).padStart(2, '0')}`
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onReady = () => {
      setVideoReady(true)
      video.pause()
    }

    const onVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        video.pause()
      }
    }

    video.muted = true
    video.playsInline = true
    video.setAttribute('webkit-playsinline', 'true')
    video.addEventListener('loadedmetadata', onReady)
    video.addEventListener('loadeddata', onReady)
    video.addEventListener('canplay', onReady)
    document.addEventListener('visibilitychange', onVisibilityChange)
    const readyFallbackTimer = window.setTimeout(onReady, 1200)

    if (video.readyState >= 1) onReady()

    const ch0 = CHRONICLE_CHAPTERS[0]
    if (titleRef.current) titleRef.current.textContent = ch0.title
    if (subtitleRef.current) subtitleRef.current.textContent = ch0.subtitle
    if (bodyRef.current) bodyRef.current.textContent = ch0.body
    if (sigilRef.current) sigilRef.current.textContent = ch0.sigil

    return () => {
      window.clearTimeout(readyFallbackTimer)
      video.removeEventListener('loadedmetadata', onReady)
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('canplay', onReady)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  useEffect(() => {
    if (!videoReady) return

    const video = videoRef.current
    if (!video) return

    const getScrollHeight = () => window.innerHeight * CHRONICLE_SCROLL_LENGTH
    let isChronicleActive = false
    let scrollStopTimer: ReturnType<typeof window.setTimeout> | undefined

    const playVideo = () => {
      if (document.visibilityState !== 'visible') return

      video.play().catch(() => {
        // Keep the story UI responsive even when autoplay is deferred.
      })
    }

    const pauseVideo = () => {
      if (scrollStopTimer) window.clearTimeout(scrollStopTimer)
      video.pause()
    }

    const playOnlyWhileScrolling = (velocity: number) => {
      if (!isChronicleActive || Math.abs(velocity) < 2) return

      playVideo()

      if (scrollStopTimer) window.clearTimeout(scrollStopTimer)
      scrollStopTimer = window.setTimeout(() => {
        video.pause()
      }, 180)
    }

    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: () => `+=${getScrollHeight()}`,
      pin: stickyRef.current,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => {
        isChronicleActive = true
      },
      onEnterBack: () => {
        isChronicleActive = true
      },
      onLeave: () => {
        isChronicleActive = false
        pauseVideo()
      },
      onLeaveBack: () => {
        isChronicleActive = false
        pauseVideo()
      },
    }) as any
    isChronicleActive = pinTrigger.isActive

    const setVignetteOpacity = vignetteRef.current
      ? gsap.quickSetter(vignetteRef.current, 'opacity')
      : null

   const storyTrigger = ScrollTrigger.create({
  trigger: containerRef.current,
  start: 'top top',
  end: () => `+=${getScrollHeight()}`,
  scrub: 0.35,
  invalidateOnRefresh: true,

  onUpdate: self => {
    const p = self.progress

    // Keep the video playing only while scrolling
    playOnlyWhileScrolling(self.getVelocity())

    // Dynamically adjust playback speed so the video
    // naturally reaches the end near the end of the scroll.
    if (video.readyState >= 2 && video.duration > 0) {
      const remainingVideo = Math.max(
        video.duration - video.currentTime,
        0.01
      )

      const remainingScroll = Math.max(1 - p, 0.01)

      // Approximate remaining scroll time in seconds.
      // Increase/decrease this number to tune the behaviour.
      const estimatedRemainingScrollSeconds = remainingScroll * 18

      const targetRate =
        remainingVideo / estimatedRemainingScrollSeconds

      video.playbackRate = gsap.utils.clamp(
        0.75, // minimum speed
        2.0,  // maximum speed
        targetRate
      )
    }

    if (progressRef.current) {
      gsap.set(progressRef.current, {
        scaleX: p,
        transformOrigin: 'left center',
      })
    }

    const idx = CHRONICLE_CHAPTERS.findIndex(
      c => p >= c.progress[0] && p < c.progress[1]
    )

    transitionChapter(
      idx === -1 ? CHRONICLE_CHAPTERS.length - 1 : idx
    )

    if (setVignetteOpacity) {
      setVignetteOpacity(
        0.55 + Math.sin(p * Math.PI) * 0.2
      )
    }
  },
}) as any

    const overlayTween = gsap.to(overlayRef.current, {
      background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.0) 55%)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${getScrollHeight()}`,
        scrub: 2,
        invalidateOnRefresh: true,
      },
    })

    let runeTween: gsap.core.Tween | undefined
    if (runeBarRef.current) {
      const ticks = runeBarRef.current.querySelectorAll('.rune-tick')
      runeTween = gsap.fromTo(
        ticks,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          stagger: 0.06,
          duration: 0.6,
          ease: 'elastic.out(1,0.5)',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        },
      )
    }

    const introTween = gsap.fromTo(
      [sigilRef.current, subtitleRef.current, titleRef.current, bodyRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.1, delay: 0.3 },
    )

    return () => {
      if (scrollStopTimer) window.clearTimeout(scrollStopTimer)
      storyTrigger.kill()
      pinTrigger.kill()
      chapterTimelineRef.current?.kill()
      overlayTween.kill()
      runeTween?.kill()
      introTween.kill()
    }
  }, [videoReady])

  return (
    <>
      <div className={`got-loading ${videoReady ? 'hidden' : ''}`}>
        <div className="got-loading-logo">Game of Thrones</div>
        <div className="got-loading-sub">The Chronicles of Westeros</div>
        <div className="got-loading-bar-wrap">
          <div className="got-loading-bar-fill" />
        </div>
      </div>

      <div
        ref={containerRef}
        className="got-container"
        style={{ height: `${CHRONICLE_SCROLL_LENGTH + 1}00vh` }}
      >
        <div ref={stickyRef} className="got-sticky">
          <video
            ref={videoRef}
            className="got-video"
            src={videoSrc}
            poster="/images/one.jpg"
            
            playsInline
            muted
            preload="auto"
            disablePictureInPicture
            onError={() => {
              if (!didFallback.current) {
                didFallback.current = true
                setVideoSrc('/video/one.mp4')
              }
            }}
          />

          <div ref={vignetteRef} className="got-vignette" />
          <div ref={overlayRef} className="got-overlay" />
          <div className="got-grain" />

          {['tl', 'tr', 'bl', 'br'].map(pos => (
            <div key={pos} className={`got-corner got-corner-${pos}`}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2 L2 20 M2 2 L20 2" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5" />
                <path d="M2 2 L8 8" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.4" />
                <rect x="1" y="1" width="4" height="4" fill="none" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.6" />
              </svg>
            </div>
          ))}


          <nav className="got-nav">
            <div className="got-nav-logo">Game of Thrones</div>

            <button
              type="button"
              className={`got-nav-toggle ${mobileNavOpen ? "is-open" : ""}`}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>

           <ul className={`got-nav-links ${mobileNavOpen ? "is-open" : ""}`}>
            {navItems.map((item) => (
              <li key={item.label}>
                {item.label === "Characters" ? (
                  <button
                    type="button"
                    className="got-nav-button"
                    onClick={() => {
                      setShowCharacters((prev) => !prev)
                      setMobileNavOpen(false)
                    }}
                  >
                    {showCharacters ? "Characters" : "Characters"}
                  </button>
                ) : (
                  <a href={item.href} onClick={() => setMobileNavOpen(false)}>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          </nav>

          <div ref={runeBarRef} className="got-rune-bar">
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={i} className="rune-tick" />
            ))}
          </div>

          <div className="got-content">
            <span ref={sigilRef} className="got-sigil" />
            <div className="got-divider">
              <div className="got-divider-line" />
              <div className="got-divider-diamond" />
              <div className="got-divider-line right" />
            </div>
            <span ref={subtitleRef} className="got-subtitle" />
            <h1 ref={titleRef} className="got-title" />
            <p ref={bodyRef} className="got-body" />
            <div className="got-cta-row">
              <button
                type="button"
                className="got-cta-btn"
                onClick={() => {
                  window.scrollBy({
                    top: window.innerHeight * 0.85,
                    behavior: 'smooth',
                  })
                }}
              >
                Begin the Journey
              </button>
              <button
                type="button"
                className="got-cta-ghost"
                onClick={() => {
                  document
                    .getElementById('houses')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                Explore the Realm
              </button>
              <button
                type="button"
                className="got-cta-ghost got-audio-toggle"
                onClick={() => {
                  const audio = audioRef.current
                  if (!audio || !audioSrc) return

                  if (isAudioPlaying) {
                    audio.pause()
                    setIsAudioPlaying(false)
                  } else {
                    audio.play().then(() => setIsAudioPlaying(true)).catch(() => {
                      // Autoplay may be blocked until user interacts with the page.
                    })
                  }
                }}
                disabled={audioError || !audioSrc}
              >
                {audioError
                  ? 'Theme Unavailable'
                  : isAudioPlaying
                    ? 'Pause GOT Theme'
                    : audioSrc
                      ? 'Play GOT Theme'
                      : 'Loading Theme...'}
              </button>
              <audio
                ref={audioRef}
                src={audioSrc}
                preload="auto"
                loop
                onError={() => setAudioError(true)}
              />
            </div>
          </div>

          <div className="got-right-panel">
            <div ref={chapterLabelRef} className="got-chapter-label">01 / 06</div>
            <div className="got-vert-line" />
            <div className="got-dots">
              {CHRONICLE_CHAPTERS.map((_, i) => (
                <div key={i} className={`got-dot ${i === activeChapter ? 'active' : ''}`} />
              ))}
            </div>
          </div>

          <div className="got-scroll-hint">
            <span>Scroll</span>
            <div className="arrow" />
          </div>

          <div className="got-progress-bar-wrap">
            <div ref={progressRef} className="got-progress-bar-fill" />
          </div>

        </div>
      </div>
    </>
  )
}

export default WesterosChronicles

