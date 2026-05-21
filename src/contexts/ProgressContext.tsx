import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { ProgressState, Bookmark } from '@/types'

interface ProgressContextValue {
  progress: ProgressState
  markComplete: (slug: string) => void
  markInProgress: (slug: string) => void
  isComplete: (slug: string) => boolean
  addBookmark: (bookmark: Omit<Bookmark, 'addedAt'>) => void
  removeBookmark: (slug: string) => void
  isBookmarked: (slug: string) => boolean
  completionPercentage: number
  totalTopics: number
}

const TOTAL_TOPICS = 45

const ProgressContext = createContext<ProgressContextValue | null>(null)

const defaultState: ProgressState = { completed: [], inProgress: [], bookmarks: [] }

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const stored = localStorage.getItem('learning-progress')
      return stored ? JSON.parse(stored) : defaultState
    } catch {
      return defaultState
    }
  })

  useEffect(() => {
    localStorage.setItem('learning-progress', JSON.stringify(progress))
  }, [progress])

  const markComplete = (slug: string) => {
    setProgress(prev => ({
      ...prev,
      completed: prev.completed.includes(slug) ? prev.completed : [...prev.completed, slug],
      inProgress: prev.inProgress.filter(s => s !== slug),
    }))
  }

  const markInProgress = (slug: string) => {
    setProgress(prev => ({
      ...prev,
      inProgress: prev.inProgress.includes(slug) ? prev.inProgress : [...prev.inProgress, slug],
    }))
  }

  const isComplete = (slug: string) => progress.completed.includes(slug)

  const addBookmark = (bookmark: Omit<Bookmark, 'addedAt'>) => {
    setProgress(prev => {
      if (prev.bookmarks.some(b => b.slug === bookmark.slug)) return prev
      return {
        ...prev,
        bookmarks: [...prev.bookmarks, { ...bookmark, addedAt: new Date().toISOString() }],
      }
    })
  }

  const removeBookmark = (slug: string) => {
    setProgress(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.filter(b => b.slug !== slug),
    }))
  }

  const isBookmarked = (slug: string) => progress.bookmarks.some(b => b.slug === slug)

  const completionPercentage = Math.round((progress.completed.length / TOTAL_TOPICS) * 100)

  return (
    <ProgressContext.Provider value={{
      progress, markComplete, markInProgress, isComplete,
      addBookmark, removeBookmark, isBookmarked,
      completionPercentage, totalTopics: TOTAL_TOPICS,
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
