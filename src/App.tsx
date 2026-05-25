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

// Panel widths — photo is always visible in both states
const W_EXPANDED  = 300   // full: large photo + name + title + quote
const W_MINIMIZED = 96    // compact: small photo + name only

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

      {/* ── Desktop: minimisable right panel (xl+) ── */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? W_EXPANDED : W_MINIMIZED }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="hidden xl:flex xl:flex-col xl:fixed xl:right-0 xl:top-0 xl:h-screen z-50 overflow-hidden border-l border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm"
      >
        {/* ── Edge handle — subtle tab on the left border, like a panel resize grip ── */}
        <button
          onClick={onToggle}
          title={isOpen ? 'Minimise panel' : 'Maximise panel'}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20
                     flex items-center justify-center
                     w-3 h-12 rounded-l-md
                     bg-gray-200/80 dark:bg-gray-700/80
                     hover:bg-brand-500 dark:hover:bg-brand-500
                     text-gray-400 hover:text-white
                     border border-r-0 border-gray-300 dark:border-gray-600
                     cursor-pointer transition-all duration-150 shadow-sm group"
        >
          {isOpen
            ? <ChevronRight size={10} className="shrink-0" />
            : <ChevronLeft  size={10} className="shrink-0" />}
        </button>

        {/* ── Photo + info — always visible, layout scales with state ── */}
        <div className="flex flex-col items-center justify-center flex-1 px-3 pb-4 text-center min-w-0">

          {/* Photo circle — large when expanded, compact when minimised */}
          <motion.div
            animate={{ width: isOpen ? 200 : 60, height: isOpen ? 200 : 60 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="rounded-full overflow-hidden flex-shrink-0"
            style={{
              border: `${isOpen ? 4 : 2}px solid #2563eb`,
              boxShadow: isOpen ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            <img
              src="/Raja.jpg"
              alt="Raja"
              className="w-full h-full object-cover object-[center_0%]"
              style={{ transform: isOpen ? 'translateY(12px)' : 'none', transition: 'transform 0.3s' }}
            />
          </motion.div>

          {/* Name — always visible */}
          <p
            className="font-bold text-gray-900 dark:text-white leading-tight text-center w-full truncate transition-all duration-300"
            style={{ fontSize: isOpen ? '1.2rem' : '0.65rem', marginTop: isOpen ? 20 : 8 }}
          >
            Raja
          </p>

          {/* Title + quote — only in expanded state */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="expanded-content"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="w-full"
              >
                <p className="text-brand-600 dark:text-brand-400 italic text-base leading-tight mt-1 mb-5">
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

          {/* Right margin mirrors the panel width at xl+ */}
          <div
            className={[
              'pt-16 xl:pt-0',
              'transition-[margin-right] duration-300 ease-out',
              panelOpen ? 'xl:mr-[300px]' : 'xl:mr-[96px]',
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
