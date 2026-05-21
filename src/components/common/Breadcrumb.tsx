import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

interface Crumb {
  label: string
  href?: string
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
      <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
        <Home size={14} />
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" />
          {crumb.href && i < crumbs.length - 1
            ? <Link to={crumb.href} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{crumb.label}</Link>
            : <span className="text-gray-900 dark:text-gray-100 font-medium">{crumb.label}</span>
          }
        </span>
      ))}
    </nav>
  )
}
