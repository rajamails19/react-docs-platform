import { useState, useEffect } from 'react'
import type { TocHeading } from '@/types'

export function useTableOfContents(contentRef: React.RefObject<HTMLElement>) {
  const [headings, setHeadings]       = useState<TocHeading[]>([])
  const [activeId, setActiveId]       = useState<string>('')

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const nodes = Array.from(el.querySelectorAll('h2, h3, h4'))
    setHeadings(
      nodes.map(n => ({
        id:    n.id,
        text:  n.textContent?.replace(/^#/, '').trim() ?? '',
        level: parseInt(n.tagName[1]),
      }))
    )
  }, [contentRef])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    const els = document.querySelectorAll('h2[id], h3[id], h4[id]')
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  return { headings, activeId }
}
