import type { NavCategory } from '@/types'

export const navigation: NavCategory[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: 'BookOpen',
    defaultOpen: true,
    items: [
      { id: 'what-is-react',          title: 'What is React?',     slug: 'introduction/what-is-react',     difficulty: 'beginner' },
      { id: 'why-react',              title: 'Why React?',          slug: 'introduction/why-react',          difficulty: 'beginner' },
      { id: 'spa-vs-mpa',             title: 'SPA vs MPA',          slug: 'introduction/spa-vs-mpa',         difficulty: 'beginner' },
      { id: 'virtual-dom',            title: 'Virtual DOM',         slug: 'introduction/virtual-dom',        difficulty: 'beginner' },
    ],
  },
  {
    id: 'setup',
    title: 'Setup & Tooling',
    icon: 'Terminal',
    items: [
      { id: 'install-node',     title: 'Install Node.js',   slug: 'setup/install-node',    difficulty: 'beginner' },
      { id: 'vite-setup',       title: 'Vite Setup',        slug: 'setup/vite-setup',      difficulty: 'beginner', badge: 'new' },
      { id: 'cra',              title: 'Create React App',  slug: 'setup/cra',             difficulty: 'beginner' },
      { id: 'project-structure',title: 'Project Structure', slug: 'setup/project-structure',difficulty: 'beginner' },
    ],
  },
  {
    id: 'jsx',
    title: 'JSX',
    icon: 'Code2',
    items: [
      { id: 'jsx-basics',       title: 'JSX Basics',        slug: 'jsx/jsx-basics',        difficulty: 'beginner' },
      { id: 'jsx-expressions',  title: 'Expressions',       slug: 'jsx/expressions',       difficulty: 'beginner' },
      { id: 'jsx-rules',        title: 'JSX Rules',         slug: 'jsx/jsx-rules',         difficulty: 'beginner' },
    ],
  },
  {
    id: 'components',
    title: 'Components',
    icon: 'Layers',
    items: [
      { id: 'functional',   title: 'Functional Components', slug: 'components/functional',    difficulty: 'beginner' },
      { id: 'class',        title: 'Class Components',      slug: 'components/class',         difficulty: 'intermediate' },
      { id: 'composition',  title: 'Composition',           slug: 'components/composition',   difficulty: 'intermediate' },
      { id: 'pure',         title: 'Pure Components',       slug: 'components/pure',          difficulty: 'intermediate' },
    ],
  },
  {
    id: 'props',
    title: 'Props',
    icon: 'ArrowRight',
    items: [
      { id: 'props-basics',    title: 'Props Basics',        slug: 'props/props-basics',    difficulty: 'beginner' },
      { id: 'default-props',   title: 'Default Props',       slug: 'props/default-props',   difficulty: 'beginner' },
      { id: 'prop-types',      title: 'Prop Validation',     slug: 'props/prop-types',      difficulty: 'intermediate' },
      { id: 'children-prop',   title: 'Children Prop',       slug: 'props/children-prop',   difficulty: 'intermediate' },
    ],
  },
  {
    id: 'state',
    title: 'State',
    icon: 'Database',
    items: [
      { id: 'state-basics',    title: 'State Basics',        slug: 'state/state-basics',      difficulty: 'beginner' },
      { id: 'lifting-state',   title: 'Lifting State Up',    slug: 'state/lifting-state',     difficulty: 'intermediate' },
      { id: 'derived-state',   title: 'Derived State',       slug: 'state/derived-state',     difficulty: 'intermediate' },
    ],
  },
  {
    id: 'events',
    title: 'Events',
    icon: 'Zap',
    items: [
      { id: 'event-handling',  title: 'Event Handling',      slug: 'events/event-handling',   difficulty: 'beginner' },
      { id: 'synthetic-events',title: 'Synthetic Events',    slug: 'events/synthetic-events', difficulty: 'intermediate' },
    ],
  },
  {
    id: 'conditional',
    title: 'Conditional Rendering',
    icon: 'GitBranch',
    items: [
      { id: 'conditional-basics', title: 'If / Ternary',    slug: 'conditional/conditional-basics', difficulty: 'beginner' },
      { id: 'short-circuit',      title: '&& Short-circuit', slug: 'conditional/short-circuit',      difficulty: 'beginner' },
    ],
  },
  {
    id: 'lists',
    title: 'Lists & Keys',
    icon: 'List',
    items: [
      { id: 'rendering-lists', title: 'Rendering Lists',     slug: 'lists/rendering-lists',   difficulty: 'beginner' },
      { id: 'keys',            title: 'Keys in React',       slug: 'lists/keys',              difficulty: 'intermediate' },
    ],
  },
  {
    id: 'forms',
    title: 'Forms',
    icon: 'FileText',
    items: [
      { id: 'controlled',     title: 'Controlled Inputs',    slug: 'forms/controlled',         difficulty: 'beginner' },
      { id: 'uncontrolled',   title: 'Uncontrolled Inputs',  slug: 'forms/uncontrolled',       difficulty: 'intermediate' },
      { id: 'form-validation',title: 'Form Validation',      slug: 'forms/form-validation',    difficulty: 'intermediate' },
    ],
  },
  {
    id: 'hooks',
    title: 'Hooks',
    icon: 'Hook',
    defaultOpen: true,
    items: [
      { id: 'usestate',      title: 'useState',              slug: 'hooks/usestate',          difficulty: 'beginner',      badge: 'updated' },
      { id: 'useeffect',     title: 'useEffect',             slug: 'hooks/useeffect',         difficulty: 'beginner' },
      { id: 'useref',        title: 'useRef',                slug: 'hooks/useref',            difficulty: 'intermediate' },
      { id: 'usememo',       title: 'useMemo',               slug: 'hooks/usememo',           difficulty: 'intermediate' },
      { id: 'usecallback',   title: 'useCallback',           slug: 'hooks/usecallback',       difficulty: 'intermediate' },
      { id: 'usereducer',    title: 'useReducer',            slug: 'hooks/usereducer',        difficulty: 'intermediate' },
      { id: 'usecontext',    title: 'useContext',            slug: 'hooks/usecontext',        difficulty: 'intermediate' },
      { id: 'custom-hooks',  title: 'Custom Hooks',          slug: 'hooks/custom-hooks',      difficulty: 'advanced' },
    ],
  },
  {
    id: 'routing',
    title: 'Routing',
    icon: 'Navigation',
    items: [
      { id: 'react-router',   title: 'React Router v6',      slug: 'routing/react-router',    difficulty: 'intermediate' },
      { id: 'nested-routes',  title: 'Nested Routes',        slug: 'routing/nested-routes',   difficulty: 'intermediate' },
      { id: 'protected-routes',title:'Protected Routes',     slug: 'routing/protected-routes',difficulty: 'advanced' },
    ],
  },
  {
    id: 'context-api',
    title: 'Context API',
    icon: 'Share2',
    items: [
      { id: 'context-basics', title: 'Context Basics',       slug: 'context-api/context-basics', difficulty: 'intermediate' },
      { id: 'context-patterns',title:'Context Patterns',     slug: 'context-api/context-patterns',difficulty:'advanced' },
    ],
  },
  {
    id: 'redux',
    title: 'Redux',
    icon: 'Box',
    items: [
      { id: 'redux-basics',    title: 'Redux Toolkit',        slug: 'redux/redux-basics',      difficulty: 'advanced' },
      { id: 'redux-thunk',     title: 'Async Thunks',         slug: 'redux/redux-thunk',       difficulty: 'advanced' },
      { id: 'rtk-query',       title: 'RTK Query',            slug: 'redux/rtk-query',         difficulty: 'advanced',  badge: 'new' },
    ],
  },
  {
    id: 'api-calls',
    title: 'API Calls',
    icon: 'Globe',
    items: [
      { id: 'fetch-api',      title: 'Fetch & Axios',        slug: 'api-calls/fetch-api',      difficulty: 'intermediate' },
      { id: 'react-query',    title: 'React Query / TanStack',slug: 'api-calls/react-query',   difficulty: 'advanced',  badge: 'new' },
      { id: 'error-handling', title: 'Error Handling',       slug: 'api-calls/error-handling', difficulty: 'intermediate' },
    ],
  },
  {
    id: 'auth',
    title: 'Authentication',
    icon: 'Shield',
    items: [
      { id: 'jwt-auth',       title: 'JWT Auth',             slug: 'auth/jwt-auth',            difficulty: 'advanced' },
      { id: 'oauth',          title: 'OAuth / Social Login', slug: 'auth/oauth',               difficulty: 'advanced' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing',
    icon: 'TestTube',
    items: [
      { id: 'jest-rtl',       title: 'Jest + RTL',           slug: 'testing/jest-rtl',         difficulty: 'advanced' },
      { id: 'e2e-playwright',  title: 'E2E with Playwright',  slug: 'testing/e2e-playwright',   difficulty: 'advanced' },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    icon: 'Gauge',
    items: [
      { id: 'code-splitting',  title: 'Code Splitting',       slug: 'performance/code-splitting', difficulty: 'advanced' },
      { id: 'memoization',     title: 'Memoization',          slug: 'performance/memoization',    difficulty: 'advanced' },
      { id: 'virtualization',  title: 'List Virtualization',  slug: 'performance/virtualization', difficulty: 'advanced' },
    ],
  },
  {
    id: 'typescript',
    title: 'TypeScript with React',
    icon: 'FileCode',
    items: [
      { id: 'ts-basics',      title: 'TypeScript Basics',    slug: 'typescript/ts-basics',     difficulty: 'intermediate' },
      { id: 'ts-hooks',       title: 'Typing Hooks',         slug: 'typescript/ts-hooks',      difficulty: 'advanced' },
      { id: 'ts-patterns',    title: 'Advanced Patterns',    slug: 'typescript/ts-patterns',   difficulty: 'enterprise' },
    ],
  },
  {
    id: 'nextjs',
    title: 'Next.js Basics',
    icon: 'Triangle',
    items: [
      { id: 'nextjs-intro',   title: 'Next.js Intro',        slug: 'nextjs/nextjs-intro',      difficulty: 'advanced' },
      { id: 'app-router',     title: 'App Router',           slug: 'nextjs/app-router',        difficulty: 'advanced',  badge: 'new' },
      { id: 'server-components',title:'Server Components',   slug: 'nextjs/server-components', difficulty: 'advanced' },
    ],
  },
  {
    id: 'patterns',
    title: 'Design Patterns',
    icon: 'Puzzle',
    items: [
      { id: 'hoc',            title: 'Higher-Order Components', slug: 'patterns/hoc',          difficulty: 'advanced' },
      { id: 'render-props',   title: 'Render Props',         slug: 'patterns/render-props',    difficulty: 'advanced' },
      { id: 'compound',       title: 'Compound Components',  slug: 'patterns/compound',        difficulty: 'enterprise' },
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise Architecture',
    icon: 'Building2',
    items: [
      { id: 'monorepo',       title: 'Monorepo with Nx',     slug: 'enterprise/monorepo',      difficulty: 'enterprise' },
      { id: 'micro-frontend', title: 'Micro Frontends',      slug: 'enterprise/micro-frontend',difficulty: 'enterprise' },
      { id: 'design-system',  title: 'Design System',        slug: 'enterprise/design-system', difficulty: 'enterprise' },
    ],
  },
  {
    id: 'interview',
    title: 'Interview Questions',
    icon: 'HelpCircle',
    items: [
      { id: 'interview-beginner', title: 'Beginner Q&A',     slug: 'interview/interview-beginner', difficulty: 'beginner' },
      { id: 'interview-mid',      title: 'Mid-Level Q&A',    slug: 'interview/interview-mid',      difficulty: 'intermediate' },
      { id: 'interview-senior',   title: 'Senior Q&A',       slug: 'interview/interview-senior',   difficulty: 'advanced' },
    ],
  },
  {
    id: 'projects',
    title: 'Real Projects',
    icon: 'Rocket',
    items: [
      { id: 'todo-app',       title: 'Todo App',             slug: 'projects/todo-app',        difficulty: 'beginner' },
      { id: 'dashboard',      title: 'Analytics Dashboard',  slug: 'projects/dashboard',       difficulty: 'advanced' },
      { id: 'ecommerce',      title: 'E-Commerce Store',     slug: 'projects/ecommerce',       difficulty: 'enterprise' },
    ],
  },
]

export const flattenNavItems = (categories: NavCategory[]) => {
  const items: Array<{ slug: string; title: string; category: string }> = []
  for (const cat of categories) {
    for (const item of cat.items) {
      if (item.slug) items.push({ slug: item.slug, title: item.title, category: cat.title })
      if (item.children) {
        for (const child of item.children) {
          if (child.slug) items.push({ slug: child.slug, title: child.title, category: cat.title })
        }
      }
    }
  }
  return items
}

export const findNavItem = (slug: string, categories: NavCategory[]) => {
  for (const cat of categories) {
    for (const item of cat.items) {
      if (item.slug === slug) return { item, category: cat }
      if (item.children) {
        for (const child of item.children) {
          if (child.slug === slug) return { item: child, category: cat }
        }
      }
    }
  }
  return null
}
