import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { TableOfContents } from '@/components/layout/TableOfContents'
import { ReadingProgress } from '@/components/common/ReadingProgress'
import { SearchModal } from '@/components/search/SearchModal'
import { useSearch } from '@/hooks/useSearch'
import { useTableOfContents } from '@/hooks/useTableOfContents'
import type { ReactNode } from 'react'

interface DocsLayoutProps {
  children: ReactNode
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    try { return localStorage.getItem('docs-sidebar') !== 'closed' }
    catch { return true }
  })
  const { isOpen, open, close } = useSearch()

  const toggleSidebar = () => {
    setSidebarOpen(prev => {
      const next = !prev
      try { localStorage.setItem('docs-sidebar', next ? 'open' : 'closed') } catch {}
      return next
    })
  }
  const contentRef = useRef<HTMLDivElement>(null)
  const { headings, activeId } = useTableOfContents(contentRef as React.RefObject<HTMLElement>)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Keyboard shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ReadingProgress />
      <Header
        onSearchOpen={open}
        onMobileMenuToggle={() => setMobileMenuOpen(v => !v)}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-[7.5rem] left-0 bottom-0 z-40 w-72 border-r border-gray-200 dark:border-gray-800 lg:hidden"
            >
              <Sidebar onClose={() => setMobileMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer — replaces the vertical space the now-fixed header used to occupy */}
      <div className="h-14" />

      {/* Main layout */}
      <div className="flex">
        {/* Desktop sidebar — collapses to icon-strip like RajaPanel, never fully hidden */}
        <motion.div
          animate={{ width: sidebarOpen ? 256 : 80 }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className="hidden lg:block lg:fixed lg:left-0 lg:top-[7.5rem] xl:top-14 lg:bottom-0 z-30"
        >
          {/* Edge handle — protrudes to the right */}
          <button
            onClick={toggleSidebar}
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full z-20
                       w-4 h-14 flex items-center justify-center rounded-r-lg
                       bg-gray-200 dark:bg-gray-700
                       hover:bg-brand-500 dark:hover:bg-brand-500
                       text-gray-500 hover:text-white
                       border border-l-0 border-gray-300 dark:border-gray-600
                       transition-colors duration-150 shadow"
          >
            {sidebarOpen ? <ChevronLeft size={11} /> : <ChevronRight size={11} />}
          </button>

          {/* w-full fills the animated parent — overflow-hidden clips text, leaving icons visible */}
          <div className="h-full w-full overflow-hidden border-r border-gray-200 dark:border-gray-800">
            <Sidebar />
          </div>
        </motion.div>

        {/* Content area — margin matches minimized sidebar width (48px = ml-12) */}
        <div className={[
          'flex-1',
          'transition-[margin-left] duration-300 ease-out',
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20',
        ].join(' ')}>
          <div className="flex max-w-screen-xl mx-auto">
            {/* Main content */}
            <main className="flex-1 min-w-0 px-6 py-8 lg:px-10" ref={contentRef}>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </main>

            {/* TOC — 2xl+ only so it doesn't overlap the fixed Raja panel on xl screens */}
            <div className="hidden 2xl:block shrink-0 w-56 px-4 py-8">
              <TableOfContents headings={headings} activeId={activeId} />
            </div>
          </div>
        </div>
      </div>

      <SearchModal isOpen={isOpen} onClose={close} />
    </div>
  )
}
