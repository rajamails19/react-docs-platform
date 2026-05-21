import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el  = document.documentElement
      const top = el.scrollTop || document.body.scrollTop
      const height = el.scrollHeight - el.clientHeight
      setProgress(height > 0 ? (top / height) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
