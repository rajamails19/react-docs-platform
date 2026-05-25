import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ProgressProvider } from '@/contexts/ProgressContext'
import { Home } from '@/pages/Home'

const TutorialPage  = lazy(() => import('@/pages/TutorialPage').then(m => ({ default: m.TutorialPage })))
const BookmarksPage = lazy(() => import('@/pages/BookmarksPage').then(m => ({ default: m.BookmarksPage })))

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

interface RajaPanelProps {
  isOpen: boolean
  onToggle: () => void
}

function RajaPanel({ isOpen, onToggle }: RajaPanelProps) {
  return (
    <>
      {/* ── Mobile / tablet: always-visible horizontal top bar (below xl) ── */}
      <aside className="xl:hidden fixed top-0 left-0 right-0 z-50 flex items-center p-3 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-600 shadow-md flex-shrink-0">
          <img src="/Raja.jpg" alt="Raja" className="w-full h-full object-cover object-[center_0%]" />
        </div>
        <div className="flex flex-col ml-3">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Raja</h3>
          <p className="text-brand-600 dark:text-brand-400 italic text-xs leading-tight mt-0.5">Founder & Visionary</p>
        </div>
      </aside>

      {/* ── Desktop: collapsible right panel (xl+) ── */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 300 : 44 }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="hidden xl:flex xl:flex-col xl:fixed xl:right-0 xl:top-0 xl:h-screen z-50 overflow-hidden border-l border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm"
      >
        {/* Collapse / expand toggle — sits on the left edge of the panel */}
        <button
          onClick={onToggle}
          title={isOpen ? 'Minimise panel' : 'Expand panel'}
          className="absolute top-1/2 -translate-y-1/2 left-1.5 z-10 flex h-8 w-5 items-center justify-center rounded bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          {isOpen ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>

        {/* Content fades in/out with the panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="panel-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col items-center justify-center flex-1 p-6 text-center"
            >
              <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-brand-600 shadow-2xl mb-6">
                <img
                  src="/Raja.jpg"
                  alt="Raja"
                  className="w-full h-full object-cover object-[center_0%] translate-y-4"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Raja</h3>
              <p className="text-brand-600 dark:text-brand-400 italic text-lg leading-tight mb-6">
                Founder & Visionary
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed italic">
                "Empowering developers to build the future, one component at a time."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
  )
}

export default function App() {
  // Persist open/closed preference in localStorage
  const [panelOpen, setPanelOpen] = useState<boolean>(() => {
    try { return localStorage.getItem('raja-panel') !== 'closed' }
    catch { return true }
  })

  const togglePanel = () => {
    setPanelOpen(prev => {
      const next = !prev
      try { localStorage.setItem('raja-panel', next ? 'open' : 'closed') } catch {}
      return next
    })
  }

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <ProgressProvider>
          <RajaPanel isOpen={panelOpen} onToggle={togglePanel} />

          {/*
            Content wrapper:
            - pt-16 on mobile: clears the fixed top bar (RajaPanel)
            - xl:pt-0: RajaPanel becomes a right panel, no top offset needed
            - xl:mr-[300px] / xl:mr-[44px]: mirror the panel's open/closed width
            - transition-[margin-right]: smooth CSS slide that mirrors the spring
          */}
          <div
            className={[
              'pt-16 xl:pt-0',
              'transition-[margin-right] duration-300 ease-out',
              panelOpen ? 'xl:mr-[300px]' : 'xl:mr-[44px]',
            ].join(' ')}
          >
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
