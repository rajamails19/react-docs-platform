import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/utils/cn'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full',
        'border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950',
        isDark
          ? 'border-brand-800/60 bg-gray-900'
          : 'border-gray-200 bg-gray-100',
        className
      )}
    >
      {/* Sliding thumb */}
      <motion.span
        animate={{ x: isDark ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={cn(
          'relative flex h-4 w-4 items-center justify-center rounded-full shadow-md',
          isDark ? 'bg-brand-500' : 'bg-white'
        )}
      >
        {/* Icon cross-fade */}
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
              animate={{ opacity: 1, rotate:   0, scale: 1   }}
              exit={{    opacity: 0, rotate:  45, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="absolute flex items-center justify-center"
            >
              <Moon size={9} className="text-white" strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate:  45, scale: 0.5 }}
              animate={{ opacity: 1, rotate:   0, scale: 1   }}
              exit={{    opacity: 0, rotate: -45, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="absolute flex items-center justify-center"
            >
              <Sun size={9} className="text-amber-500" strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  )
}
