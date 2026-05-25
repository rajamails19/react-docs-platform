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

function RajaPanel() {
  return (
    // fixed on ALL screen sizes — top bar on mobile, right panel on xl+
    <aside className="fixed top-0 left-0 right-0 xl:left-auto xl:right-0 xl:top-0 xl:w-[300px] xl:h-screen z-50 flex items-center xl:flex-col xl:justify-center p-3 xl:p-6 xl:text-center border-b border-gray-200 dark:border-gray-800 xl:border-b-0 xl:border-l bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
      {/* Photo — compact circle on mobile, large on desktop */}
      <div className="w-10 h-10 xl:w-full xl:h-auto xl:aspect-square rounded-full overflow-hidden border-2 xl:border-4 border-brand-600 shadow-md xl:shadow-2xl flex-shrink-0 xl:mb-6">
        <img
          src="/Raja.jpg"
          alt="Raja"
          className="w-full h-full object-cover object-[center_0%] xl:translate-y-4"
        />
      </div>
      {/* Name + title */}
      <div className="flex flex-col ml-3 xl:ml-0 xl:mb-6">
        <h3 className="text-sm xl:text-xl font-bold text-gray-900 dark:text-white leading-tight xl:mb-1">Raja</h3>
        <p className="text-brand-600 dark:text-brand-400 italic text-xs xl:text-lg leading-tight mt-0.5">Founder & Visionary</p>
      </div>
      {/* Quote — desktop only */}
      <p className="hidden xl:block text-sm text-gray-400 dark:text-gray-500 leading-relaxed italic">
        "Empowering developers to build the future, one component at a time."
      </p>
    </aside>
  )
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <ProgressProvider>
          {/* Fixed Raja photo panel — visible on xl+ screens */}
          <RajaPanel />
          {/* Main content — push right margin to make room for the fixed panel */}
          <div className="pt-16 xl:pt-0 xl:mr-[300px]">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"            element={<Home />} />
                <Route path="/docs/*"      element={<TutorialPage />} />
                <Route path="/bookmarks"   element={<BookmarksPage />} />
                <Route path="*"            element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </ProgressProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
