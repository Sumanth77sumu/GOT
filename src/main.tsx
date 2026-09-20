import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenis } from './lib/lenis'

gsap.registerPlugin(ScrollTrigger)

// Keep ScrollTrigger's pinned/scrubbed sections (the WesterosChronicles
// hero) in sync with Lenis's own virtual scroll position. Without this,
// ScrollTrigger only hears the native scroll events Lenis is intercepting
// and smoothing out, so its pin/scrub math desyncs from what's actually
// on screen — visible as the page appearing to jump or "half scroll".
lenis.on('scroll', ScrollTrigger.update)

// Drive Lenis off GSAP's own ticker instead of a separate
// requestAnimationFrame loop, so both update on the exact same frame
// rather than racing each other.
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

const rootElement = document.getElementById('root') as HTMLElement
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
