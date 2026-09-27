interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
}

function ProgressRing({ progress, size = 220, strokeWidth = 12 }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  return (
    <svg width={size} height={size} className="progress-ring">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#F0D8B0"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="progress-ring-fill"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}

export default ProgressRing