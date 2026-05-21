import { cn } from '@/utils/cn'
import type { TocHeading } from '@/types'

interface TableOfContentsProps {
  headings: TocHeading[]
  activeId: string
}

export function TableOfContents({ headings, activeId }: TableOfContentsProps) {
  if (headings.length === 0) return null

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          On This Page
        </p>
        <nav>
          <ul className="space-y-1.5 text-sm">
            {headings.map(h => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={e => {
                    e.preventDefault()
                    document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className={cn(
                    'block truncate transition-colors leading-5',
                    h.level === 2 ? '' : 'ml-3',
                    h.level === 4 ? 'ml-6' : '',
                    activeId === h.id
                      ? 'text-brand-600 dark:text-brand-400 font-medium'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  )}
                >
                  {activeId === h.id && (
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand-500 align-middle" />
                  )}
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Related</p>
          <a
            href="https://reactjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Official React Docs →
          </a>
          <a
            href="https://github.com/facebook/react"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            React on GitHub →
          </a>
        </div>
      </div>
    </aside>
  )
}
