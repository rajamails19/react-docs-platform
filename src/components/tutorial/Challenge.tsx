import { useState, type ReactNode } from 'react'
import { Lightbulb, ChevronDown, Code } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ChallengeProps {
  title: string
  children: ReactNode
  hint?: string
  solution?: string
}

export function Challenge({ title, children, hint, solution }: ChallengeProps) {
  const [hintOpen, setHintOpen]         = useState(false)
  const [solutionOpen, setSolutionOpen] = useState(false)

  return (
    <div className="my-6 rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-amber-100 dark:bg-amber-900/40 border-b border-amber-200 dark:border-amber-800">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold shrink-0">
          ✦
        </span>
        <span className="font-semibold text-amber-900 dark:text-amber-100 text-sm">
          Try it: {title}
        </span>
      </div>

      <div className="px-4 py-3 text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
        {children}
      </div>

      {(hint || solution) && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {hint && (
            <div className="w-full">
              <button
                onClick={() => setHintOpen(v => !v)}
                className="flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 transition-colors"
              >
                <Lightbulb size={13} />
                Hint
                <ChevronDown size={13} className={cn('transition-transform', hintOpen && 'rotate-180')} />
              </button>
              {hintOpen && (
                <div className="mt-2 pl-4 border-l-2 border-amber-300 dark:border-amber-700 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  {hint}
                </div>
              )}
            </div>
          )}

          {solution && (
            <div className="w-full">
              <button
                onClick={() => setSolutionOpen(v => !v)}
                className="flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 transition-colors"
              >
                <Code size={13} />
                Show solution
                <ChevronDown size={13} className={cn('transition-transform', solutionOpen && 'rotate-180')} />
              </button>
              {solutionOpen && (
                <pre className="mt-2 p-3 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-xs font-mono text-amber-900 dark:text-amber-200 overflow-x-auto whitespace-pre-wrap">
                  {solution}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
