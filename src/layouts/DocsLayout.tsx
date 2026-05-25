import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
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
  const { isOpen, open, close } = useSearch()
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

      {/* Main layout */}
      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:fixed lg:top-[7.5rem] xl:top-14 lg:bottom-0 lg:w-64 lg:border-r lg:border-gray-200 dark:lg:border-gray-800">
          <Sidebar />
        </div>

        {/* Content area */}
        <div className="flex-1 lg:ml-64">
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
