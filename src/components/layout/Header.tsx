import { Link } from 'react-router-dom'
import { Search, Github, Menu, X, BookOpen, Bookmark } from 'lucide-react'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { useProgress } from '@/contexts/ProgressContext'
import { cn } from '@/utils/cn'

interface HeaderProps {
  onSearchOpen:    () => void
  onMobileMenuToggle: () => void
  mobileMenuOpen:  boolean
}

export function Header({ onSearchOpen, onMobileMenuToggle, mobileMenuOpen }: HeaderProps) {
  const { completionPercentage } = useProgress()

  return (
    <header className="sticky top-16 xl:top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-950/80">
      <div className="flex h-14 items-center gap-4 px-4 sm:px-6">

        {/* Mobile menu button */}
        <button
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={onMobileMenuToggle}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-semibold">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
          </div>
          <span className="hidden sm:inline text-gray-900 dark:text-gray-100">
            React<span className="text-brand-600">Docs</span>
          </span>
        </Link>

        {/* Search bar — icon-only on mobile, full bar on sm+ */}
        <button
          onClick={onSearchOpen}
          aria-label="Search docs"
          className={cn(
            'group flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700',
            'bg-gray-50 dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400',
            'hover:border-brand-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all',
            'focus:outline-none focus:ring-2 focus:ring-brand-500',
            // Mobile: square icon button; sm+: full pill
            'h-9 w-9 justify-center px-0 sm:w-auto sm:flex-1 sm:max-w-sm sm:justify-start sm:px-3 sm:py-1.5'
          )}
        >
          <Search size={15} className="shrink-0" />
          <span className="hidden sm:block flex-1 text-left">Search docs...</span>
          <kbd className="hidden md:inline-flex h-5 items-center gap-0.5 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-1.5 text-[10px] font-medium text-gray-500">
            <span>⌘</span>K
          </kbd>
        </button>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-1">
          {/* Progress badge */}
          {completionPercentage > 0 && (
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mr-2">
              <div className="h-1.5 w-20 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span>{completionPercentage}%</span>
            </div>
          )}

          <Link
            to="/bookmarks"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Bookmarks"
          >
            <Bookmark size={18} />
          </Link>

          <ThemeToggle />

          <a
            href="https://github.com/facebook/react"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>

          <Link
            to="/docs/introduction/what-is-react"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700 transition-colors"
          >
            <BookOpen size={14} />
            Start Learning
          </Link>
        </div>
      </div>
    </header>
  )
}
