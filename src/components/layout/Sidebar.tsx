import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BookOpen, Terminal, Code2, Layers, ArrowRight, Database,
  Zap, GitBranch, List, FileText, Globe, Box, Shield,
  TestTube, Gauge, FileCode, Triangle, Puzzle, Building2,
  HelpCircle, Rocket, ChevronDown, Check, Circle,
  Navigation, Share2, type LucideIcon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigation } from '@/data/navigation'
import { useProgress } from '@/contexts/ProgressContext'
import { cn } from '@/utils/cn'
import type { NavCategory, NavItem } from '@/types'

const ICONS: Record<string, LucideIcon> = {
  BookOpen, Terminal, Code2, Layers, ArrowRight, Database,
  Zap, GitBranch, List, FileText, Globe, Box, Shield,
  TestTube, Gauge, FileCode, Triangle, Puzzle, Building2,
  HelpCircle, Rocket, Navigation, Share2,
  Hook: Code2,
}

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner:     'text-emerald-600 dark:text-emerald-400',
  intermediate: 'text-amber-600 dark:text-amber-400',
  advanced:     'text-orange-600 dark:text-orange-400',
  enterprise:   'text-red-600 dark:text-red-400',
}

const BADGE_STYLES: Record<string, string> = {
  new:     'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  updated: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  beta:    'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
}

function NavItemRow({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const location = useLocation()
  const { isComplete } = useProgress()
  const slug     = item.slug ?? ''
  const href     = `/docs/${slug}`
  const active   = location.pathname === href
  const done     = isComplete(slug)

  return (
    <Link
      to={href}
      className={cn(
        'group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
        depth > 0 ? 'ml-4' : '',
        active
          ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-medium'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
      )}
    >
      {/* completion indicator */}
      <span className="shrink-0">
        {done
          ? <Check size={13} className="text-emerald-500" />
          : <Circle size={13} className={cn('opacity-30', active ? 'opacity-60' : '')} />
        }
      </span>

      <span className="flex-1 truncate">{item.title}</span>

      {item.badge && (
        <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded', BADGE_STYLES[item.badge])}>
          {item.badge}
        </span>
      )}

      {item.difficulty && (
        <span className={cn('text-[10px] hidden group-hover:inline', DIFFICULTY_COLORS[item.difficulty])}>
          {item.difficulty[0].toUpperCase()}
        </span>
      )}
    </Link>
  )
}

function CategorySection({ category }: { category: NavCategory }) {
  const location = useLocation()
  const Icon = ICONS[category.icon] ?? BookOpen

  const isAnyActive = category.items.some(item =>
    item.slug && location.pathname === `/docs/${item.slug}`
  )

  const [open, setOpen] = useState(category.defaultOpen || isAnyActive)

  useEffect(() => {
    if (isAnyActive) setOpen(true)
  }, [isAnyActive])

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(v => !v)}
        className={cn(
          'w-full flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-semibold transition-colors',
          'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
          isAnyActive && 'text-brand-700 dark:text-brand-300'
        )}
      >
        <Icon size={15} className="shrink-0 text-gray-400 dark:text-gray-500" />
        <span className="flex-1 text-left">{category.title}</span>
        <ChevronDown
          size={14}
          className={cn('shrink-0 transition-transform', open ? 'rotate-0' : '-rotate-90')}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="ml-1 mt-0.5 space-y-0.5 border-l border-gray-200 dark:border-gray-800 pl-2">
              {category.items.map(item => (
                <NavItemRow key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface SidebarProps {
  className?: string
  onClose?: () => void
}

export function Sidebar({ className }: SidebarProps) {
  const { completionPercentage, progress } = useProgress()

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-white dark:bg-gray-950 overflow-hidden',
        className
      )}
    >
      {/* Progress summary */}
      <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
          <span>Learning Progress</span>
          <span className="font-medium text-brand-600 dark:text-brand-400">{completionPercentage}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">
          {progress.completed.length} topics completed
        </p>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5"
        aria-label="Documentation navigation"
      >
        {navigation.map(category => (
          <CategorySection key={category.id} category={category} />
        ))}
      </nav>

      {/* Footer links */}
      <div className="border-t border-gray-200 dark:border-gray-800 px-3 py-2.5 flex gap-3 text-xs text-gray-400 dark:text-gray-500">
        <a href="#" className="hover:text-brand-600 transition-colors">Changelog</a>
        <a href="#" className="hover:text-brand-600 transition-colors">Feedback</a>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">react.dev</a>
      </div>
    </aside>
  )
}
