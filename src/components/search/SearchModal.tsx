import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ArrowRight, Clock, BookOpen, type LucideIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearch } from '@/hooks/useSearch'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Introduction: BookOpen,
  Hooks:        Clock,
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { query, setQuery, results } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [isOpen, setQuery])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); if (!isOpen) return }
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[10vh] z-50 w-full max-w-2xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700">

              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <Search size={18} className="shrink-0 text-gray-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search tutorials, hooks, patterns..."
                  className="flex-1 bg-transparent text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <X size={16} />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex h-6 items-center rounded border border-gray-200 dark:border-gray-700 px-1.5 text-xs text-gray-400">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.trim() === '' ? (
                  <div className="px-4 py-8 text-center">
                    <Search size={32} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Start typing to search through all tutorials</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {['useState', 'useEffect', 'Redux', 'TypeScript', 'Performance'].map(term => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-brand-100 dark:hover:bg-brand-900 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No results for <strong className="text-gray-900 dark:text-gray-100">"{query}"</strong>
                    </p>
                  </div>
                ) : (
                  <ul className="py-2">
                    {results.map(result => {
                      const Icon = CATEGORY_ICONS[result.category] ?? BookOpen
                      return (
                        <li key={result.id}>
                          <Link
                            to={`/docs/${result.slug}`}
                            onClick={onClose}
                            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                          >
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                              <Icon size={15} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                                {result.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                                {result.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                  {result.category}
                                </span>
                                {result.tags.slice(0, 3).map(tag => (
                                  <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <ArrowRight size={14} className="shrink-0 mt-1 text-gray-300 group-hover:text-brand-500 transition-colors" />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <kbd className="px-1 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-[10px]">↑↓</kbd>
                  navigate
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <kbd className="px-1 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-[10px]">↵</kbd>
                  open
                </div>
                {results.length > 0 && (
                  <p className="ml-auto text-xs text-gray-400">{results.length} results</p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
