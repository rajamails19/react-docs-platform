import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/utils/cn'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-lg',
        'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
        'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
        className
      )}
    >
      {resolvedTheme === 'dark'
        ? <Sun  size={18} className="transition-transform hover:rotate-12" />
        : <Moon size={18} className="transition-transform hover:-rotate-12" />
      }
    </button>
  )
}
