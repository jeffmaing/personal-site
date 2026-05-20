import { useRef, useEffect, useState } from 'react'

/**
 * Hook: animate a number from 0 to target when scrolled into view
 * Uses IntersectionObserver for trigger
 */
export function useAnimatedNumber(
  target: number,
  options?: {
    duration?: number   // animation duration in ms (default: 1200)
    threshold?: number  // intersection threshold (default: 0.3)
    delay?: number      // delay before animation starts in ms (default: 0)
  }
): { ref: React.RefObject<HTMLDivElement | null>; value: number } {
  const { duration = 1200, threshold = 0.3, delay = 0 } = options ?? {}
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [started, threshold])

  useEffect(() => {
    if (!started) return

    const timer = setTimeout(() => {
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setValue(target)
        }
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timer)
  }, [started, target, duration, delay])

  return { ref: ref as React.RefObject<HTMLDivElement | null>, value }
}

/**
 * Hook: generic IntersectionObserver for visibility
 */
export function useInView(threshold = 0.1): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)  // 默认可见，避免初始空白

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref as React.RefObject<HTMLDivElement | null>, visible]
}

export function useWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return w
}
