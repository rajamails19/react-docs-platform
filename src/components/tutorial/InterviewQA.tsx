import { useState } from 'react'
import { ChevronDown, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import type { InterviewQuestion } from '@/types'

const LEVEL_CONFIG = {
  junior:     { label: 'Junior',     color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400', stars: 1 },
  mid:        { label: 'Mid-Level',  color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',             stars: 2 },
  senior:     { label: 'Senior',     color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',     stars: 3 },
  enterprise: { label: 'Enterprise', color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',                 stars: 4 },
}

// Normalize legacy/alternative level names that some MDX files use
const LEVEL_ALIASES: Record<string, keyof typeof LEVEL_CONFIG> = {
  beginner:     'junior',
  intermediate: 'mid',
  advanced:     'senior',
}

function normalizeLevel(level: string): keyof typeof LEVEL_CONFIG {
  if (level in LEVEL_CONFIG) return level as keyof typeof LEVEL_CONFIG
  if (level in LEVEL_ALIASES) return LEVEL_ALIASES[level]
  return 'junior'
}

function QAItem({ q, index }: { q: InterviewQuestion; index: number }) {
  const [open, setOpen] = useState(false)
  const lvl = LEVEL_CONFIG[normalizeLevel(q.level)]

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
          {index + 1}
        </span>
        <span className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">{q.question}</span>
        <div className="shrink-0 flex items-center gap-2 ml-2">
          <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded', lvl.color)}>
            {lvl.label}
          </span>
          <div className="flex">
            {Array.from({ length: lvl.stars }).map((_, i) => (
              <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <ChevronDown size={14} className={cn('text-gray-400 transition-transform', open && 'rotate-180')} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 ml-9 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 leading-relaxed">
              {q.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface InterviewQAProps {
  questions: InterviewQuestion[]
  title?: string
}

export function InterviewQA({ questions, title = 'Interview Questions' }: InterviewQAProps) {
  const [filter, setFilter] = useState<InterviewQuestion['level'] | 'all'>('all')

  const levels: Array<InterviewQuestion['level'] | 'all'> = ['all', 'junior', 'mid', 'senior', 'enterprise']
  const filtered = filter === 'all'
    ? questions
    : questions.filter(q => normalizeLevel(q.level) === filter)

  return (
    <section className="my-10 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Star size={16} className="text-amber-500 fill-amber-500" />
          {title}
        </h3>
        <div className="flex gap-1">
          {levels.map(l => (
            <button
              key={l}
              onClick={() => setFilter(l)}
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-medium transition-colors capitalize',
                filter === l
                  ? 'bg-brand-600 text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800/60">
        {filtered.map((q, i) => (
          <QAItem key={i} q={q} index={i} />
        ))}
      </div>
    </section>
  )
}
