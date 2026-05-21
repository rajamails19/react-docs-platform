import { Sandpack } from '@codesandbox/sandpack-react'
import { useTheme } from '@/contexts/ThemeContext'

interface LiveEditorProps {
  code: string
  showPreview?: boolean
  template?: 'react' | 'react-ts'
  dependencies?: Record<string, string>
}

export function LiveEditor({
  code,
  showPreview = true,
  template = 'react-ts',
  dependencies = {},
}: LiveEditorProps) {
  const { resolvedTheme } = useTheme()

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 my-6">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Editor — Edit and see results instantly
        </span>
      </div>
      <Sandpack
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        template={template}
        files={{
          '/App.tsx': code,
        }}
        customSetup={{ dependencies }}
        options={{
          showNavigator: false,
          showTabs: true,
          showLineNumbers: true,
          showInlineErrors: true,
          editorHeight: 380,
          layout: showPreview ? 'preview' : 'console',
          recompileMode: 'delayed',
          recompileDelay: 500,
        }}
      />
    </div>
  )
}
