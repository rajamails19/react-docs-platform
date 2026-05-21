import { Check, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

interface Column {
  key: string
  label: string
  highlight?: boolean
}

interface Row {
  feature: string
  [key: string]: ReactNode
}

// Accepts either the typed object format OR the legacy plain-string-array format
// that some MDX files use: columns={["Col A","Col B"]} rows={[["Feature","val1","val2"]]}
type RawColumn = Column | string
type RawRow = Row | string[]

interface ComparisonTableProps {
  columns: RawColumn[]
  rows: RawRow[]
  caption?: string
}

// String-array format: columns={["Feature Header","Col A","Col B"]}
// The first element is the feature-column header; the rest are comparison columns.
// We skip the first because the table always renders a "Feature" column.
function normalizeColumns(cols: RawColumn[]): Column[] {
  if (cols.length > 0 && typeof cols[0] === 'string') {
    // String-array format — skip index 0 (it's the feature column header)
    return (cols as string[]).slice(1).map((label, i) => {
      const key = label ? label.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/^_+|_+$/g, '') || `col${i}` : `col${i}`
      return { key, label }
    })
  }
  return cols as Column[]
}

function normalizeRows(rows: RawRow[], cols: Column[]): Row[] {
  return rows.map(row => {
    if (Array.isArray(row)) {
      // row[0] is the feature label; row[1..n] maps to cols[0..n-1]
      const feature = String(row[0] ?? '')
      const obj: Row = { feature }
      cols.forEach((col, i) => {
        obj[col.key] = row[i + 1] as ReactNode
      })
      return obj
    }
    return row
  })
}

export function ComparisonTable({ columns: rawColumns, rows: rawRows, caption }: ComparisonTableProps) {
  const columns = normalizeColumns(rawColumns)
  const rows    = normalizeRows(rawRows, columns)

  const renderCell = (val: ReactNode) => {
    if (val === true)  return <Check size={16} className="mx-auto text-emerald-500" />
    if (val === false) return <X    size={16} className="mx-auto text-red-400" />
    return val
  }

  return (
    <figure className="my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-900">
            <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
              Feature
            </th>
            {columns.map(col => (
              <th
                key={col.key}
                className={cn(
                  'px-4 py-3 text-center font-semibold border-b border-gray-200 dark:border-gray-800',
                  col.highlight
                    ? 'text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950'
                    : 'text-gray-600 dark:text-gray-400'
                )}
              >
                {col.label}
                {col.highlight && (
                  <span className="ml-1.5 text-[10px] bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-400 px-1.5 py-0.5 rounded font-medium">
                    Recommended
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                'border-b border-gray-100 dark:border-gray-800/60 last:border-0',
                i % 2 === 0 ? '' : 'bg-gray-50/50 dark:bg-gray-900/30'
              )}
            >
              <td className="px-4 py-2.5 font-medium text-gray-700 dark:text-gray-300">{row.feature}</td>
              {columns.map(col => (
                <td
                  key={col.key}
                  className={cn(
                    'px-4 py-2.5 text-center text-gray-600 dark:text-gray-400',
                    col.highlight ? 'bg-brand-50/50 dark:bg-brand-950/30' : ''
                  )}
                >
                  {renderCell(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">{caption}</figcaption>
      )}
    </figure>
  )
}
