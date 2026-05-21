export interface NavItem {
  id: string
  title: string
  slug?: string
  children?: NavItem[]
  icon?: string
  badge?: 'new' | 'updated' | 'beta'
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'enterprise'
}

export interface NavCategory {
  id: string
  title: string
  icon: string
  items: NavItem[]
  defaultOpen?: boolean
}

export interface TutorialMeta {
  title: string
  description: string
  slug: string
  category: string
  order: number
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'enterprise'
  estimatedTime: number
  tags: string[]
  lastUpdated: string
  prerequisites?: string[]
}

export interface TocHeading {
  id: string
  text: string
  level: number
}

export interface SearchResult {
  id: string
  title: string
  description: string
  slug: string
  category: string
  tags: string[]
  content: string
}

export interface Bookmark {
  id: string
  slug: string
  title: string
  category: string
  addedAt: string
}

export interface ProgressState {
  completed: string[]
  inProgress: string[]
  bookmarks: Bookmark[]
}

export type Theme = 'light' | 'dark' | 'system'

export interface CodeExample {
  title: string
  code: string
  language: string
  description?: string
  level?: 'beginner' | 'intermediate' | 'advanced'
}

export interface InterviewQuestion {
  question: string
  answer: string
  level: 'junior' | 'mid' | 'senior' | 'enterprise'
}
