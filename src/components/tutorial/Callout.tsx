import { Info, AlertTriangle, CheckCircle, Lightbulb, XCircle, type LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'success' | 'tip' | 'danger'

const CONFIG: Record<CalloutType, {
  icon: LucideIcon
  container: string
  icon_class: string
  title_class: string
  label: string
}> = {
  info:    { icon: Info,          label: 'Info',    container: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',    icon_class: 'text-blue-500',    title_class: 'text-blue-800 dark:text-blue-300' },
  warning: { icon: AlertTriangle, label: 'Warning', container: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800', icon_class: 'text-amber-500',   title_class: 'text-amber-800 dark:text-amber-300' },
  success: { icon: CheckCircle,   label: 'Note',    container: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800', icon_class: 'text-emerald-500', title_class: 'text-emerald-800 dark:text-emerald-300' },
  tip:     { icon: Lightbulb,     label: 'Tip',     container: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800', icon_class: 'text-purple-500',  title_class: 'text-purple-800 dark:text-purple-300' },
  danger:  { icon: XCircle,       label: 'Danger',  container: 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800',       icon_class: 'text-red-500',     title_class: 'text-red-800 dark:text-red-300' },
}

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const c = CONFIG[type] ?? CONFIG['info']
  const Icon = c.icon
  return (
    <div className={cn('my-4 rounded-lg border p-4', c.container)}>
      <div className="flex gap-3">
        <Icon size={18} className={cn('mt-0.5 shrink-0', c.icon_class)} />
        <div className="flex-1 text-sm">
          {(title ?? c.label) && (
            <p className={cn('font-semibold mb-1', c.title_class)}>{title ?? c.label}</p>
          )}
          <div className="text-gray-700 dark:text-gray-300 [&>p]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
