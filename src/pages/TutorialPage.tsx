import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { CheckCircle, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { DocsLayout } from '@/layouts/DocsLayout'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { mdxComponents } from '@/components/tutorial/MDXComponents'
import { useProgress } from '@/contexts/ProgressContext'
import { navigation, flattenNavItems } from '@/data/navigation'
import { loadContent } from '@/utils/contentRegistry'
import { cn } from '@/utils/cn'

const DIFFICULTY_CONFIG = {
  beginner:     { label: 'Beginner',     color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950' },
  intermediate: { label: 'Intermediate', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950' },
  advanced:     { label: 'Advanced',     color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950' },
  enterprise:   { label: 'Enterprise',   color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950' },
}

function TutorialSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
      <div className="h-0.5 bg-gray-100 dark:bg-gray-800 rounded my-6" />
      {[...Array(6)].map((_, i) => (
        <div key={i} className={cn('h-4 bg-gray-200 dark:bg-gray-800 rounded', i % 3 === 2 ? 'w-3/4' : 'w-full')} />
      ))}
    </div>
  )
}

function NotFound({ slug }: { slug: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-6xl mb-4">📚</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Tutorial Coming Soon</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        The content for <code className="text-brand-600 dark:text-brand-400">{slug}</code> is being written. Check back soon!
      </p>
      <Link
        to="/docs/introduction/what-is-react"
        className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition-colors"
      >
        Start from the beginning
      </Link>
    </div>
  )
}

export function TutorialPage() {
  const { '*': slugParam } = useParams()
  const slug = slugParam ?? ''

  const [Content, setContent]       = useState<React.ComponentType | null>(null)
  const [frontmatter, setFrontmatter] = useState<Record<string, unknown>>({})
  const [loading, setLoading]       = useState(true)
  const [notFound, setNotFound]     = useState(false)

  const { markComplete, isComplete, isBookmarked, addBookmark, removeBookmark } = useProgress()
  const allItems = flattenNavItems(navigation)
  const currentIdx = allItems.findIndex(i => i.slug === slug)
  const prev = currentIdx > 0              ? allItems[currentIdx - 1] : null
  const next = currentIdx < allItems.length - 1 ? allItems[currentIdx + 1] : null

  const category = allItems[currentIdx]?.category ?? ''
  const title    = (frontmatter.title as string) ?? allItems[currentIdx]?.title ?? ''
  const difficulty = frontmatter.difficulty as string
  const estimatedTime = frontmatter.estimatedTime as number
  const completed = isComplete(slug)
  const bookmarked = isBookmarked(slug)

  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    setContent(null)

    loadContent(slug).then(result => {
      if (!result) {
        setNotFound(true)
      } else {
        setContent(() => result.Component)
        setFrontmatter(result.frontmatter)
      }
      setLoading(false)
    })
  }, [slug])

  // Mark in-progress on visit
  useEffect(() => {
    if (slug && !completed) {
      // auto-mark in-progress when user visits
    }
  }, [slug, completed])

  const crumbs = [
    { label: 'Docs', href: '/docs/introduction/what-is-react' },
    ...(category ? [{ label: category }] : []),
    { label: title },
  ]

  const diffConf = difficulty ? DIFFICULTY_CONFIG[difficulty as keyof typeof DIFFICULTY_CONFIG] : null

  return (
    <DocsLayout>
      <article>
        {/* Breadcrumb */}
        <Breadcrumb crumbs={crumbs} />

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {diffConf && (
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', diffConf.color)}>
              {diffConf.label}
            </span>
          )}
          {estimatedTime && (
            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Clock size={12} />
              {estimatedTime} min read
            </span>
          )}
          {completed && (
            <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <CheckCircle size={12} />
              Completed
            </span>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <TutorialSkeleton />
        ) : notFound ? (
          <NotFound slug={slug} />
        ) : Content ? (
          <ErrorBoundary key={slug}>
            <MDXProvider components={mdxComponents}>
              <div className="min-h-[60vh]">
                <Content />
              </div>
            </MDXProvider>
          </ErrorBoundary>
        ) : null}

        {/* Action bar */}
        {!loading && !notFound && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-wrap items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-800"
          >
            <button
              onClick={() => {
                if (completed) return
                markComplete(slug)
              }}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
                completed
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 cursor-default'
                  : 'bg-brand-600 text-white hover:bg-brand-700 active:scale-95'
              )}
            >
              <CheckCircle size={15} />
              {completed ? 'Completed!' : 'Mark as Complete'}
            </button>

            <button
              onClick={() => bookmarked ? removeBookmark(slug) : addBookmark({ id: slug, slug, title, category })}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border transition-colors',
                bookmarked
                  ? 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-amber-400 hover:text-amber-600'
              )}
            >
              {bookmarked ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
          </motion.div>
        )}

        {/* Prev / Next navigation */}
        {!loading && !notFound && (
          <div className="mt-8 grid grid-cols-2 gap-4">
            {prev ? (
              <Link
                to={`/docs/${prev.slug}`}
                className="group flex flex-col gap-1 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-brand-400 dark:hover:border-brand-600 transition-colors"
              >
                <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 group-hover:text-brand-500">
                  <ChevronLeft size={13} /> Previous
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                  {prev.title}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{prev.category}</span>
              </Link>
            ) : <div />}

            {next && (
              <Link
                to={`/docs/${next.slug}`}
                className="group flex flex-col gap-1 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-brand-400 dark:hover:border-brand-600 transition-colors text-right"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs text-gray-400 dark:text-gray-500 group-hover:text-brand-500">
                  Next <ChevronRight size={13} />
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                  {next.title}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{next.category}</span>
              </Link>
            )}
          </div>
        )}
      </article>
    </DocsLayout>
  )
}
