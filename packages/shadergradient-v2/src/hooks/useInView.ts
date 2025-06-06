import { useEffect, useState, useRef } from 'react'

export function useInView(enabled: boolean = true, threshold: number = 0.1) {
  const [isInView, setIsInView] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold,
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [enabled, threshold])

  return { isInView, containerRef }
}
