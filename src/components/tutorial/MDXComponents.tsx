import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { LiveEditor } from './LiveEditor'
import { MermaidDiagram } from './MermaidDiagram'
import { InterviewQA } from './InterviewQA'
import { ComparisonTable } from './ComparisonTable'
import { Challenge } from './Challenge'

export const mdxComponents: MDXComponents = {
  // Headings with anchor links
  h1: ({ children, id, ...props }) => (
    <h1 id={id} className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2 mb-4 scroll-mt-20" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }) => (
    <h2 id={id} className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-4 scroll-mt-20 pb-2 border-b border-gray-200 dark:border-gray-800" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }) => (
    <h3 id={id} className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-3 scroll-mt-20" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, id, ...props }) => (
    <h4 id={id} className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2 scroll-mt-20" {...props}>
      {children}
    </h4>
  ),

  // Paragraph
  p: ({ children }) => (
    <p className="text-gray-600 dark:text-gray-300 leading-7 mb-4 text-[0.9375rem]">{children}</p>
  ),

  // Code
  code: ({ children, className }) => {
    const lang = className?.replace('language-', '') ?? ''
    if (!lang || typeof children !== 'string') {
      return (
        <code className="rounded px-1.5 py-0.5 text-sm bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 font-mono">
          {children}
        </code>
      )
    }
    return <CodeBlock code={String(children)} language={lang} />
  },

  pre: ({ children }) => <>{children}</>,

  // Lists
  ul: ({ children }) => (
    <ul className="mb-4 space-y-1.5 text-gray-600 dark:text-gray-300 text-[0.9375rem] list-none pl-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal pl-6 space-y-1.5 text-gray-600 dark:text-gray-300 text-[0.9375rem]">
      {children}
    </ol>
  ),
  // li styling depends on parent — use data-list-type trick via CSS
  // For ul: show custom bullet; for ol: let browser number it
  li: ({ children, ...props }) => (
    <li className="leading-7 [ul_&]:flex [ul_&]:gap-2 [ol_&]:pl-0" {...props}>
      <span className="[ul_&]:mt-2 [ul_&]:h-1.5 [ul_&]:w-1.5 [ul_&]:shrink-0 [ul_&]:rounded-full [ul_&]:bg-brand-500 [ol_&]:hidden" aria-hidden />
      <span>{children}</span>
    </li>
  ),

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-brand-500 pl-4 text-gray-600 dark:text-gray-300 italic bg-brand-50 dark:bg-brand-950/30 py-2 rounded-r-lg">
      {children}
    </blockquote>
  ),

  // Table
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 dark:bg-gray-900">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800/50 last:border-0">
      {children}
    </td>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">{children}</tr>
  ),

  // Hr
  hr: () => <hr className="my-8 border-gray-200 dark:border-gray-800" />,

  // Strong / em
  strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>,
  em:     ({ children }) => <em className="italic text-gray-700 dark:text-gray-300">{children}</em>,

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-brand-600 dark:text-brand-400 hover:underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),

  // Custom components available in MDX
  Callout,
  LiveEditor,
  MermaidDiagram,
  InterviewQA,
  ComparisonTable,
  Challenge,

  // Shorthand blocks
  CodeBlock,
}
