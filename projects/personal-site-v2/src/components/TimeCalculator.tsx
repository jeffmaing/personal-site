import { useState, useEffect, useRef } from 'react'

/**
 * Hook: smoothly animate a number from current value to target
 * Unlike useAnimatedNumber (which animates once on scroll),
 * this one reacts to value changes in real-time.
 */
function useSmoothNumber(target: number, duration = 600): number {
  const [value, setValue] = useState(target)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(target)
  const prevTargetRef = useRef<number>(target)

  useEffect(() => {
    if (target === prevTargetRef.current) return
    const from = prevTargetRef.current
    prevTargetRef.current = target
    startRef.current = from

    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + eased * (target - from)
      setValue(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setValue(target)
      }
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return value
}

export default function TimeCalculator() {
  const [weeklyHours, setWeeklyHours] = useState<string>('10')
  const hours = Math.max(0, Math.min(168, Number(weeklyHours) || 0))

  // Real-time calculations
  const savedYearly = hours * 52 * 0.6
  const savedDays = savedYearly / 8
  const savedWeeks = savedDays / 5

  // Animated values
  const animSavedYearly = useSmoothNumber(savedYearly, 500)
  const animSavedDays = useSmoothNumber(savedDays, 500)
  const animSavedWeeks = useSmoothNumber(savedWeeks, 500)

  // Format: show 1 decimal if < 100, else integer
  const fmt = (n: number) => {
    const rounded = Math.round(n)
    if (n < 100 && n !== Math.round(n)) return n.toFixed(1)
    return rounded.toLocaleString()
  }

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: 'clamp(32px, 5vw, 56px)',
        maxWidth: '680px',
        margin: '0 auto 64px',
        boxShadow: '0 2px 20px rgba(91, 125, 177, 0.08), 0 1px 4px rgba(0,0,0,0.04)',
        border: '1px solid rgba(91, 125, 177, 0.06)',
      }}
    >
      {/* Title */}
      <h3
        style={{
          fontSize: 'clamp(22px, 3.5vw, 30px)',
          fontWeight: 700,
          color: '#1e2a3a',
          textAlign: 'center',
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}
      >
        AI 能帮你省多少时间？
      </h3>
      <p
        style={{
          fontSize: '14px',
          color: '#999',
          textAlign: 'center',
          marginBottom: '36px',
        }}
      >
        假设 AI 能自动化你 60% 的重复工作
      </p>

      {/* Input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '44px',
          flexWrap: 'wrap',
        }}
      >
        <label
          style={{
            fontSize: '15px',
            color: '#6b7a8d',
            fontWeight: 500,
          }}
        >
          每周花多少小时做重复工作？
        </label>
        <div
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <input
            type="number"
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(e.target.value)}
            min={0}
            max={168}
            style={{
              width: '100px',
              padding: '12px 50px 12px 16px',
              fontSize: '20px',
              fontWeight: 600,
              color: '#5b7db1',
              background: '#f7f8fc',
              border: '2px solid rgba(91, 125, 177, 0.15)',
              borderRadius: '12px',
              outline: 'none',
              textAlign: 'center',
              transition: 'border-color 0.3s ease',
              MozAppearance: 'textfield',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(91, 125, 177, 0.5)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(91, 125, 177, 0.15)')}
          />
          <span
            style={{
              position: 'absolute',
              right: '14px',
              fontSize: '12px',
              color: '#aaa',
              fontWeight: 500,
              pointerEvents: 'none',
            }}
          >
            小时/周
          </span>
        </div>
      </div>

      {/* Results */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '36px',
        }}
      >
        {/* Card 1 */}
        <ResultCard
          value={fmt(animSavedYearly)}
          label="每年可节省"
          unit="小时"
          color="#5b7db1"
        />
        {/* Card 2 */}
        <ResultCard
          value={fmt(animSavedDays)}
          label="相当于"
          unit="个工作日"
          color="#5b7db1"
        />
        {/* Card 3 */}
        <ResultCard
          value={fmt(animSavedWeeks)}
          label="相当于"
          unit="周生命"
          color="#52b788"
        />
      </div>

      {/* Bottom tagline */}
      <p
        style={{
          textAlign: 'center',
          fontSize: '15px',
          color: '#888',
          lineHeight: 1.7,
          margin: 0,
          padding: '20px 0 0',
          borderTop: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        这些时间，你可以用来做更有价值的事
      </p>
    </div>
  )
}

function ResultCard({
  value,
  label,
  unit,
  color,
}: {
  value: string
  label: string
  unit: string
  color: string
}) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px 8px',
        background: '#f7f8fc',
        borderRadius: '14px',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div
        style={{
          fontSize: 'clamp(32px, 5vw, 44px)',
          fontWeight: 800,
          color,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '6px',
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: '13px', color: '#999', lineHeight: 1.5 }}>
        <span style={{ fontWeight: 500, color: '#6b7a8d' }}>{label}</span>
        <span style={{ marginLeft: '4px' }}>{unit}</span>
      </div>
    </div>
  )
}
