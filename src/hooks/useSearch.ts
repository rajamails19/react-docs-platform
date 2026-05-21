import { useState, useMemo, useCallback } from 'react'
import Fuse from 'fuse.js'
import { searchIndex } from '@/data/searchIndex'
import type { SearchResult } from '@/types'

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: 'title',       weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'tags',        weight: 0.2 },
    { name: 'content',     weight: 0.1 },
  ],
  threshold: 0.35,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
})

export function useSearch() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return []
    return fuse.search(query).map(r => r.item)
  }, [query])

  const open  = useCallback(() => setIsOpen(true),  [])
  const close = useCallback(() => { setIsOpen(false); setQuery('') }, [])

  return { query, setQuery, results, isOpen, open, close }
}
