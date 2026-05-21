import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bookmark, BookmarkX, ArrowRight, BookOpen } from 'lucide-react'
import { DocsLayout } from '@/layouts/DocsLayout'
import { useProgress } from '@/contexts/ProgressContext'
import { cn } from '@/utils/cn'

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-28 text-center"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
        <Bookmark size={28} className="text-gray-400 dark:text-gray-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No bookmarks yet</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed mb-8">
        While reading any tutorial, hit the <strong>Bookmark</strong> button at the bottom of the page to save it here.
      </p>
      <Link
        to="/docs/introduction/what-is-react"
        className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition-colors"
      >
        <BookOpen size={14} />
        Start reading
      </Link>
    </motion.div>
  )
}

export function BookmarksPage() {
  const { progress, removeBookmark } = useProgress()
  const { bookmarks } = progress

  return (
    <DocsLayout>
      <div className="max-w-2xl">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <Bookmark size={14} />
            <span>{bookmarks.length} saved</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Bookmarks
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Tutorials you've saved for later. Pick up right where you want to.
          </p>
        </motion.div>

        {bookmarks.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="space-y-3"
          >
            {bookmarks.map((bm) => (
              <motion.li
                key={bm.slug}
                variants={{
                  hidden:  { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                layout
                exit={{ opacity: 0, x: -16 }}
                className={cn(
                  'group flex items-center justify-between gap-3',
                  'rounded-xl border border-gray-200 dark:border-gray-800',
                  'bg-white dark:bg-gray-900 px-4 py-4',
                  'hover:border-brand-400 dark:hover:border-brand-700',
                  'transition-colors duration-200'
                )}
              >
                {/* Left: bookmark info + link */}
                <Link
                  to={`/docs/${bm.slug}`}
                  className="flex-1 min-w-0 flex items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-md"
                >
                  <Bookmark
                    size={15}
                    className="shrink-0 mt-0.5 text-amber-500 dark:text-amber-400"
                  />
                  <div className="min-w-0">
                    {bm.category && (
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-0.5">
                        {bm.category}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                      {bm.title}
                    </p>
                    {bm.addedAt && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        Saved {new Date(bm.addedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                </Link>

                {/* Right: go arrow + remove */}
                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    to={`/docs/${bm.slug}`}
                    aria-label={`Go to ${bm.title}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ArrowRight size={14} />
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      removeBookmark(bm.slug)
                    }}
                    aria-label={`Remove bookmark for ${bm.title}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  >
                    <BookmarkX size={14} />
                  </button>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </DocsLayout>
  )
}
