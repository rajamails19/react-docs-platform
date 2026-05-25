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

const W_EXPANDED  = 300
const W_MINIMIZED = 96

interface RajaPanelProps { isOpen: boolean; onToggle: () => void }

function RajaPanel({ isOpen, onToggle }: RajaPanelProps) {
  return (
    <>
      {/* Mobile / tablet: fixed top bar */}
      <aside className="xl:hidden fixed top-0 left-0 right-0 z-50 flex items-center p-3 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-600 shadow-md flex-shrink-0">
          <img src="/Raja.jpg" alt="Raja" className="w-full h-full object-cover object-[50%_10%]" />
        </div>
        <div className="flex flex-col ml-3">
          <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Raja</span>
          <span className="text-brand-600 dark:text-brand-400 italic text-xs leading-tight mt-0.5">Founder & Visionary</span>
        </div>
      </aside>

      {/* Desktop: collapsible right panel — NO overflow-hidden so the handle can poke out */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? W_EXPANDED : W_MINIMIZED }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="hidden xl:block xl:fixed xl:right-0 xl:top-0 xl:h-screen z-50 border-l border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm"
      >
        {/* Edge handle — protrudes from the left border */}
        <button
          onClick={onToggle}
          title={isOpen ? 'Minimise' : 'Maximise'}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full z-20
                     w-4 h-14 flex items-center justify-center
                     rounded-l-lg
                     bg-gray-200 dark:bg-gray-700
                     hover:bg-brand-500 dark:hover:bg-brand-500
                     text-gray-500 hover:text-white
                     border border-r-0 border-gray-300 dark:border-gray-600
                     transition-colors duration-150 shadow"
        >
          {isOpen ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
        </button>

        {/* Inner content — overflow-hidden here to clip photo/text */}
        <div className="h-full overflow-hidden flex flex-col items-center justify-center px-4 py-6 text-center">

          {/* Photo — always visible, size changes with state */}
          <motion.div
            animate={{ width: isOpen ? 200 : 64, height: isOpen ? 200 : 64 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className={`rounded-full overflow-hidden flex-shrink-0 ${
              isOpen
                ? 'border-4 border-brand-600 shadow-2xl'
                : 'border-2 border-brand-600 shadow-md'
            }`}
          >
            <img
              src="/Raja.jpg"
              alt="Raja"
              className="w-full h-full object-cover object-[50%_10%]"
            />
          </motion.div>

          {/* Name — always visible */}
          <p
            className="font-bold text-gray-900 dark:text-white leading-tight mt-3 w-full text-center truncate transition-all duration-300"
            style={{ fontSize: isOpen ? '1.15rem' : '0.68rem' }}
          >
            Raja
          </p>

          {/* Title + quote — only when expanded */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18, delay: 0.06 }}
                className="w-full mt-1"
              >
                <p className="text-brand-600 dark:text-brand-400 italic text-base leading-tight mb-5">
                  Founder & Visionary
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed italic">
                  "Empowering developers to build the future, one component at a time."
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  )
}

export default function App() {
  const [panelOpen, setPanelOpen] = useState<boolean>(() => {
    try { return localStorage.getItem('raja-panel') !== 'minimised' }
    catch { return true }
  })

  const togglePanel = () => {
    setPanelOpen(prev => {
      const next = !prev
      try { localStorage.setItem('raja-panel', next ? 'open' : 'minimised') } catch {}
      return next
    })
  }

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <ProgressProvider>
          <RajaPanel isOpen={panelOpen} onToggle={togglePanel} />

          <div className={[
            'pt-16 xl:pt-0',
            'transition-[margin-right] duration-300 ease-out',
            panelOpen ? 'xl:mr-[300px]' : 'xl:mr-[96px]',
          ].join(' ')}>
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
