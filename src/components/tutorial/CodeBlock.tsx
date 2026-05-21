import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { cn } from '@/utils/cn'

// Custom theme inspired by react.dev / VSCode Dark+
const reactDevTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': {
    color: '#e1e4e8',
    background: 'none',
    fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", "Consolas", monospace',
    fontSize: '0.8125rem',
    lineHeight: '1.7',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    tabSize: 2,
  },
  'pre[class*="language-"]': {
    color: '#e1e4e8',
    background: '#0d1117',
    fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", "Consolas", monospace',
    fontSize: '0.8125rem',
    lineHeight: '1.7',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    tabSize: 2,
    overflow: 'auto',
    padding: '0',
    margin: '0',
  },
  // Comments
  'comment':        { color: '#6a737d', fontStyle: 'italic' },
  'prolog':         { color: '#6a737d' },
  'doctype':        { color: '#6a737d' },
  'cdata':          { color: '#6a737d' },
  // Punctuation
  'punctuation':    { color: '#e1e4e8' },
  // Keywords
  'keyword':        { color: '#f97583', fontWeight: '500' },
  'tag':            { color: '#85e89d' },
  'boolean':        { color: '#79b8ff' },
  'number':         { color: '#79b8ff' },
  'constant':       { color: '#79b8ff' },
  'symbol':         { color: '#79b8ff' },
  // Strings
  'string':         { color: '#9ecbff' },
  'char':           { color: '#9ecbff' },
  'attr-value':     { color: '#9ecbff' },
  // Functions / classes
  'function':       { color: '#b392f0' },
  'class-name':     { color: '#b392f0' },
  'regex':          { color: '#dbedff' },
  // Attributes / properties
  'attr-name':      { color: '#ffab70' },
  'property':       { color: '#79b8ff' },
  'selector':       { color: '#85e89d' },
  'operator':       { color: '#f97583' },
  // Variables
  'variable':       { color: '#ffab70' },
  'parameter':      { color: '#e1e4e8' },
  // JSX
  'script':         { color: '#e1e4e8' },
  'builtin':        { color: '#79b8ff' },
  'deleted':        { color: '#fdaeb7' },
  'inserted':       { color: '#85e89d' },
  'namespace':      { color: '#b392f0' },
  'atrule':         { color: '#f97583' },
  'important':      { color: '#f97583', fontWeight: 'bold' },
  'italic':         { fontStyle: 'italic' },
  'bold':           { fontWeight: 'bold' },
}

const LANG_LABELS: Record<string, string> = {
  tsx: 'TSX', ts: 'TypeScript', jsx: 'JSX', js: 'JavaScript',
  bash: 'Bash', sh: 'Shell', json: 'JSON', css: 'CSS',
  html: 'HTML', yml: 'YAML', yaml: 'YAML', mdx: 'MDX', md: 'Markdown',
  sql: 'SQL', dockerfile: 'Dockerfile',
}

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({
  code,
  language = 'tsx',
  filename,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const langLabel = LANG_LABELS[language] ?? language.toUpperCase()

  return (
    <div className={cn('group my-5 overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117]', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-[#21262d] bg-[#161b22] px-4 py-2.5">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5" aria-hidden>
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <div className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs font-medium text-[#8b949e]">
            {filename ?? langLabel}
          </span>
        </div>

        <button
          onClick={copy}
          aria-label="Copy code"
          className={cn(
            'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all',
            copied
              ? 'text-emerald-400 bg-emerald-400/10'
              : 'text-[#8b949e] hover:text-[#e1e4e8] hover:bg-[#21262d]'
          )}
        >
          {copied
            ? <><Check size={12} /><span>Copied!</span></>
            : <><Copy size={12} /><span>Copy</span></>
          }
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={reactDevTheme}
          showLineNumbers={showLineNumbers}
          wrapLongLines={false}
          customStyle={{
            margin: 0,
            padding: '1.25rem 1rem',
            background: 'transparent',
            fontSize: '0.8125rem',
          }}
          lineNumberStyle={{
            color: '#484f58',
            paddingRight: '1.5em',
            minWidth: '2.25em',
            userSelect: 'none',
            fontStyle: 'normal',
          }}
          // No line highlighting — clean, flat display
          lineProps={() => ({
            style: { display: 'block', padding: '0' },
          })}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
