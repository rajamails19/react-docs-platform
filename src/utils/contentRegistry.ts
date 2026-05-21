/// <reference types="vite/client" />

// Dynamic MDX content registry using Vite's import.meta.glob
const modules = import.meta.glob('../content/**/*.mdx') as Record<
  string,
  () => Promise<Record<string, unknown>>
>

export async function loadContent(slug: string) {
  const path = `../content/${slug}.mdx`
  const loader = modules[path]
  if (!loader) return null
  const mod = await loader()
  return {
    Component:   mod.default as React.ComponentType,
    frontmatter: (mod.frontmatter ?? {}) as Record<string, unknown>,
  }
}

export function getAllSlugs(): string[] {
  return Object.keys(modules).map(p =>
    p.replace('../content/', '').replace('.mdx', '')
  )
}
