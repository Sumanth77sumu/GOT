import Lenis from '@studio-freight/lenis'

/**
 * A single shared Lenis instance for the whole app.
 *
 * Any code that wants to move the scroll position (nav links, CTA buttons,
 * etc.) must call `lenis.scrollTo(...)` here instead of the native
 * `scrollIntoView` / `window.scrollTo` / `window.scrollBy`. Lenis hijacks
 * wheel/touch input and animates the scroll position itself on every
 * animation frame — if something else moves the native scroll position
 * behind its back, Lenis's next frame fights to pull it back toward the
 * target it still thinks is correct, which is what caused scrolling to
 * intermittently stall or "half scroll".
 */
export const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  touchMultiplier: 1.5,
})
