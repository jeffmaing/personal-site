import { useRef, useState, useCallback, type CSSProperties, type ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  maxTilt?: number        // max rotation in degrees (default: 2.5)
  perspective?: number    // perspective value (default: 1000)
  className?: string
  style?: CSSProperties
  onClick?: () => void
  onHoverChange?: (hovered: boolean) => void  // notify parent of hover state
}

/**
 * Subtle 3D tilt on hover — McKinsey consulting aesthetic.
 * Wraps any card content and applies perspective-based rotation
 * following the cursor position. Shadow shifts in tilt direction.
 */
export default function TiltCard({
  children,
  maxTilt = 2.5,
  perspective = 1000,
  className,
  style,
  onClick,
  onHoverChange,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({})
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width   // 0–1
      const y = (e.clientY - rect.top) / rect.height    // 0–1

      // Center is 0.5, so offset range is -0.5 to +0.5
      const offsetX = (x - 0.5) * 2   // -1 to 1
      const offsetY = (y - 0.5) * 2   // -1 to 1

      // rotateY follows horizontal position (left = negative tilt)
      // rotateX follows vertical position (top = negative tilt)
      const rotateY = offsetX * maxTilt
      const rotateX = -offsetY * maxTilt

      // Shadow shifts opposite to tilt direction for depth illusion
      const shadowX = offsetX * 8
      const shadowY = offsetY * 8
      const shadowBlur = 24 + Math.abs(offsetX) * 8
      const shadowSpread = 4
      const shadowOpacity = 0.06 + Math.abs(offsetX) * 0.03

      setTiltStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
        boxShadow: `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px ${shadowBlur.toFixed(1)}px ${shadowSpread}px rgba(0,0,0,${shadowOpacity.toFixed(3)})`,
        transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
      })
    },
    [maxTilt, perspective],
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
    onHoverChange?.(true)
  }, [onHoverChange])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    onHoverChange?.(false)
    // Smooth return to flat
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`,
      boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
      transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
    })
  }, [perspective, onHoverChange])

  return (
    <div
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        ...tiltStyle,
        willChange: isHovering ? 'transform, box-shadow' : 'auto',
      }}
    >
      {children}
    </div>
  )
}
