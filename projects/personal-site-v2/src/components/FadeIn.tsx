import { useInView } from '../hooks/useAnimatedNumber'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  threshold?: number
}

export function FadeIn({ children, delay = 0, threshold = 0.1 }: FadeInProps) {
  const [ref, visible] = useInView(threshold)
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(30px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  )
}
