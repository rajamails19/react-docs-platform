import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ProgressProvider } from '@/contexts/ProgressContext'
import { Home } from '@/pages/Home'

const TutorialPage   = lazy(() => import('@/pages/TutorialPage').then(m => ({ default: m.TutorialPage })))
const BookmarksPage  = lazy(() => import('@/pages/BookmarksPage').then(m => ({ default: m.BookmarksPage })))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-brand-600 border-t-transparent animate-spin" />
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <ProgressProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/docs/*"      element={<TutorialPage />} />
              <Route path="/bookmarks"   element={<BookmarksPage />} />
              <Route path="*"            element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ProgressProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
