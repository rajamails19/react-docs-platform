import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface MermaidDiagramProps {
  chart: string
  caption?: string
}

let mermaidInitialized = false

export function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const ref        = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const [svg, setSvg]     = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    const render  = async () => {
      try {
        const mermaid = (await import('mermaid')).default

        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: resolvedTheme === 'dark' ? 'dark' : 'default',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 14,
            flowchart: { curve: 'basis', htmlLabels: true },
          })
          mermaidInitialized = true
        }

        const id      = `mermaid-${Math.random().toString(36).slice(2)}`
        const { svg } = await mermaid.render(id, chart)
        if (!cancelled) setSvg(svg)
      } catch (e) {
        if (!cancelled) setError(String(e))
      }
    }
    render()
    return () => { cancelled = true }
  }, [chart, resolvedTheme])

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 text-sm text-red-700 dark:text-red-300">
        Diagram error: {error}
      </div>
    )
  }

  return (
    <figure className="my-6 flex flex-col items-center">
      <div
        ref={ref}
        className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
