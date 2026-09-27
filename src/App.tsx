import { useEffect, useState } from 'react'
import ProgressRing from './components/ProgressRing'
import './App.css'

const DURATION_OPTIONS = [5, 10, 15]

function App() {
  const [selectedMinutes, setSelectedMinutes] = useState(10)
  const [remainingSeconds, setRemainingSeconds] = useState(selectedMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const intervalId = setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          setIsRunning(false)
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning])

  function handleSelectDuration(minutes: number) {
    setSelectedMinutes(minutes)
    setRemainingSeconds(minutes * 60)
    setIsRunning(false)
  }

  function handleStart() {
    setIsRunning(true)
  }

  function handleReset() {
    setIsRunning(false)
    setRemainingSeconds(selectedMinutes * 60)
  }

  const totalSeconds = selectedMinutes * 60
  const progress = remainingSeconds / totalSeconds
  const minutesDisplay = Math.floor(remainingSeconds / 60)
  const secondsDisplay = remainingSeconds % 60
  const isFinished = remainingSeconds === 0

  return (
    <div className="app">
      <div className="dim-overlay" style={{ opacity: (1 - progress) * 0.55 }} />

      <div className="content">
        <h1>Wind Down</h1>

        <div className="duration-picker">
          {DURATION_OPTIONS.map((minutes) => (
            <button
              key={minutes}
              className={`duration-btn ${selectedMinutes === minutes ? 'active' : ''}`}
              onClick={() => handleSelectDuration(minutes)}
              disabled={isRunning}
            >
              {minutes} min
            </button>
          ))}
        </div>

        <div className="ring-wrap">
          <ProgressRing progress={progress} />
          <p className="time-display">
            {String(minutesDisplay).padStart(2, '0')}:{String(secondsDisplay).padStart(2, '0')}
          </p>
        </div>

        {isFinished && <p className="finished-message">Time to sleep 🌙</p>}

        <div className="controls">
          {!isRunning && !isFinished && (
            <button className="action-btn" onClick={handleStart}>
              Start
            </button>
          )}
          {isRunning && (
            <button className="action-btn" onClick={() => setIsRunning(false)}>
              Pause
            </button>
          )}
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default App