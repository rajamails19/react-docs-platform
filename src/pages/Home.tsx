import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Code2, Zap, Shield, Rocket, ArrowRight,
  Star, CheckCircle, Globe, ChevronRight, Linkedin, Maximize2,
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { ReadingProgress } from '@/components/common/ReadingProgress'
import { SearchModal } from '@/components/search/SearchModal'
import { useSearch } from '@/hooks/useSearch'
import { navigation } from '@/data/navigation'
const FEATURES = [
  { icon: BookOpen, title: 'Structured Learning Path',  desc: 'From Hello World to enterprise architecture — follow a proven curriculum used by professional developers.' },
  { icon: Code2,    title: 'Interactive Code Editors',  desc: 'Every concept backed by a live sandbox. Edit code and see results instantly, no setup needed.' },
  { icon: Zap,      title: 'Real-World Examples',       desc: 'No contrived examples. Learn through patterns pulled from production codebases at scale.' },
  { icon: Shield,   title: 'Interview Prep Built-In',   desc: 'Junior to senior-level Q&A in every topic. Walk into your next React interview with confidence.' },
  { icon: Globe,    title: '30+ Topics Covered',        desc: 'Hooks, Redux, TypeScript, Next.js, Testing, Performance, Design Patterns, and Enterprise architecture.' },
  { icon: Rocket,   title: 'Always Up to Date',         desc: 'Content reflects React 18, React Router v6, RTK Query, and the App Router. Never stale.' },
]

const STATS = [
  { value: '30+',  label: 'Tutorial Topics' },
  { value: '200+', label: 'Code Examples' },
  { value: '100+', label: 'Interview Questions' },
  { value: 'Free', label: 'Forever' },
]

const FOUNDERS = [
  {
    name:     'Raja Sekhar',
    role:     'Founder & Entrepreneur',
    bio:      '10+ years building digital products. Started this platform because every developer deserves documentation that meets them where they are.',
    initials: 'RS',
    photo:    '/founders/Raj_busi.jpeg',     // sitting · white shirt · glasses in hand
    linkedin: '#',
    num:      '01',
    featured: true,
  },
  {
    name:     'Murali V',
    role:     'Co-Founder',
    bio:      'Keeps projects clear, responsive, and calm from first call to launch. Makes sure nothing important gets lost between the idea and the finished site.',
    initials: 'MV',
    photo:    '/founders/Mural_busi.jpeg',   // standing · hands in pockets
    linkedin: '#',
    num:      '02',
    featured: false,
  },
  {
    name:     'Uday P',
    role:     'Developer & Partner',
    bio:      'Turns moving parts into a working system. Keeps delivery organized so design, code, feedback, and launch stay aligned instead of turning into chaos.',
    initials: 'UP',
    photo:    '/founders/Uda_busi.jpeg',     // sitting · blue blazer · glasses
    linkedin: '#',
    num:      '03',
    featured: false,
  },
]


// Circular founder avatar — photo with fallback initials + optional hover overlay
function FounderAvatar({
  photo, initials, name, showOverlay = false,
}: {
  photo: string; initials: string; name: string; showOverlay?: boolean
}) {
  const [imgFailed, setImgFailed] = useState(false)
  return (
    <div className="relative w-full h-full rounded-full">
      {!imgFailed ? (
        <img
          src={photo}
          alt={`${name} — founder photo`}
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover object-top rounded-full"
        />
      ) : (
        <span
          aria-label={`${name} initials`}
          className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-brand-600 to-brand-800 text-white text-2xl font-bold tracking-wide select-none"
        >
          {initials}
        </span>
      )}

      {/* "View photo" icon overlay — appears on avatar hover */}
      <AnimatePresence>
        {showOverlay && !imgFailed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 rounded-full bg-black/30 flex flex-col items-center justify-center gap-1"
          >
            <Maximize2 size={17} className="text-white drop-shadow-md" />
            <span className="text-white text-[8px] font-bold tracking-[0.2em] uppercase">View</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Individual founder card — owns avatar-hover state to drive popover + scale
function FounderCard({ founder, index }: { founder: (typeof FOUNDERS)[0]; index: number }) {
  const [avatarHovered, setAvatarHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={[
        'group relative flex flex-col items-center text-center rounded-3xl border',
        'px-6 py-10 sm:px-8 sm:py-12 transition-all duration-300 cursor-default z-0 hover:z-10',
        founder.featured
          ? 'border-amber-200/80 dark:border-amber-700/50 bg-white dark:bg-gray-900 shadow-2xl shadow-amber-100/50 dark:shadow-amber-950/30'
          : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md shadow-gray-100/80 dark:shadow-black/20 hover:border-amber-200/80 dark:hover:border-amber-700/40 hover:shadow-xl hover:shadow-amber-50/60 dark:hover:shadow-amber-950/20',
      ].join(' ')}
    >
      {/* Founder number */}
      <span className="absolute top-5 left-6 text-[11px] font-black tracking-[0.2em] text-gray-200 dark:text-gray-700 select-none">
        {founder.num}
      </span>

      {/* Featured badge */}
      {founder.featured && (
        <span className="absolute top-5 right-6 text-[9px] font-black uppercase tracking-[0.2em] text-amber-500 dark:text-amber-400">
          Founder
        </span>
      )}

      {/* Top amber accent line */}
      <div className={[
        'absolute top-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 transition-all duration-300',
        founder.featured ? 'w-24 opacity-100' : 'w-10 opacity-0 group-hover:opacity-100 group-hover:w-16',
      ].join(' ')} />

      {/* ── Avatar with hover popover ───────────────────────────── */}
      <div className="relative mb-8 mt-2">
        {/* Ring wrapper — scales and glows on avatar hover */}
        <motion.div
          className={[
            'rounded-full p-[3px]',
            founder.featured
              ? 'w-44 h-44 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 dark:from-amber-400 dark:via-amber-500 dark:to-amber-700'
              : 'w-40 h-40 bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 dark:from-amber-600 dark:via-amber-700 dark:to-amber-800 group-hover:from-amber-300 group-hover:via-amber-400 group-hover:to-amber-500',
          ].join(' ')}
          animate={avatarHovered
            ? { scale: 1.1, filter: 'drop-shadow(0 0 18px rgba(251,191,36,0.55))' }
            : { scale: 1,   filter: 'drop-shadow(0 0 0px rgba(251,191,36,0))' }
          }
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          onHoverStart={() => setAvatarHovered(true)}
          onHoverEnd={() => setAvatarHovered(false)}
          style={{ position: 'relative', zIndex: avatarHovered ? 20 : 'auto' }}
        >
          {/* White gap ring */}
          <div className="w-full h-full rounded-full p-[3px] bg-white dark:bg-gray-900">
            <FounderAvatar
              photo={founder.photo}
              initials={founder.initials}
              name={founder.name}
              showOverlay={avatarHovered}
            />
          </div>

          {/* Floating photo preview — floats above the ring on hover */}
          <AnimatePresence>
            {avatarHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 10 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{    opacity: 0, scale: 0.88, y: 10 }}
                transition={{ type: 'spring', stiffness: 340, damping: 24 }}
                className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none"
                aria-hidden="true"
              >
                <div className="w-44 rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.45)] border border-white/10 dark:border-gray-700/40">
                  <img
                    src={founder.photo}
                    alt={`${founder.name} — preview`}
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="bg-gray-900 px-3 py-2.5 border-t border-white/5">
                    <p className="text-white text-sm font-bold leading-tight">{founder.name}</p>
                    <p className="text-amber-400 text-[10px] uppercase tracking-[0.15em] font-semibold mt-0.5">{founder.role}</p>
                  </div>
                </div>
                {/* Caret arrow pointing down */}
                <div className="flex justify-center -mt-px">
                  <div className="w-3 h-3 bg-gray-900 rotate-45 border-r border-b border-white/5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Ambient glow under avatar (featured only) */}
        {founder.featured && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-amber-300/15 dark:bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        )}
      </div>

      {/* Name */}
      <h3 className={['font-extrabold text-gray-900 dark:text-white mb-1.5 tracking-tight', founder.featured ? 'text-2xl' : 'text-xl'].join(' ')}>
        {founder.name}
      </h3>

      {/* Role */}
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 dark:text-amber-400 mb-5">
        {founder.role}
      </p>

      {/* Divider */}
      <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 mb-5" />

      {/* Bio */}
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-[1.75] flex-1">
        {founder.bio}
      </p>

      {/* LinkedIn */}
      <a
        href={founder.linkedin}
        aria-label={`${founder.name} on LinkedIn`}
        onClick={e => founder.linkedin === '#' && e.preventDefault()}
        className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-md px-1"
        tabIndex={0}
      >
        <Linkedin size={13} />
        LinkedIn
      </a>
    </motion.div>
  )
}

export function Home() {
  const { isOpen, open, close } = useSearch()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ReadingProgress />
      <Header
        onSearchOpen={open}
        onMobileMenuToggle={() => {}}
        mobileMenuOpen={false}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-950" />

        <div className="relative max-w-5xl mx-auto px-6 py-14 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950 px-4 py-1.5 text-xs sm:text-sm text-brand-700 dark:text-brand-300 mb-6 max-w-xs sm:max-w-none text-center leading-snug">
              <Star size={13} className="fill-brand-500 text-brand-500 shrink-0" />
              The most comprehensive React learning platform
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
              Learn React
              <span className="block text-brand-600">
                The Right Way
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              A production-focused tutorial platform taking you from{' '}
              <strong className="text-gray-900 dark:text-gray-100">beginner</strong> to{' '}
              <strong className="text-gray-900 dark:text-gray-100">enterprise React developer</strong>{' '}
              with interactive examples, real projects, and interview prep.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/docs/introduction/what-is-react"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20"
              >
                Start Learning <ArrowRight size={16} />
              </Link>
              <Link
                to="/docs/hooks/usestate"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <Code2 size={16} />
                Jump to Hooks
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Meet the Founders ──────────────────────────────────────── */}
      <section className="border-b border-gray-200 dark:border-gray-800 relative overflow-hidden">
        {/* Layered warm wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-orange-50/30 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950 pointer-events-none" />
        {/* Radial glow centred on section */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(251,191,36,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(251,191,36,0.04),transparent)] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-24">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-12 md:mb-20"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="block h-px w-10 bg-amber-400/60 dark:bg-amber-500/40" />
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500 dark:text-amber-400">
                The Founders
              </p>
              <span className="block h-px w-10 bg-amber-400/60 dark:bg-amber-500/40" />
            </div>

            {/* Main heading — large, confident */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.05] mb-6">
              Built by people<br />
              <span className="text-amber-500 dark:text-amber-400 italic font-light">
                who give a damn.
              </span>
            </h2>

            {/* Supporting line */}
            <p className="text-base md:text-lg text-gray-400 dark:text-gray-500 max-w-sm mx-auto leading-relaxed mt-8">
              Three people. One focus. Every decision made by someone who actually cares about the outcome.
            </p>
          </motion.div>

          {/* Founder cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {FOUNDERS.map((founder, i) => (
              <FounderCard key={founder.name} founder={founder} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold text-brand-600 dark:text-brand-400 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Why ReactDocs?</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Built for developers who want to understand React deeply, not just copy-paste snippets.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:border-brand-300 dark:hover:border-brand-700 transition-colors group"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Curriculum overview */}
      <section className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Full Curriculum</h2>
            <p className="text-gray-500 dark:text-gray-400">Everything from React fundamentals to enterprise-scale architecture</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {navigation.map(category => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
              >
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">{category.title}</h3>
                <ul className="space-y-1">
                  {category.items.slice(0, 4).map(item => (
                    <li key={item.id}>
                      {item.slug ? (
                        <Link
                          to={`/docs/${item.slug}`}
                          className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group"
                        >
                          <ChevronRight size={11} className="shrink-0 text-gray-300 group-hover:text-brand-500" />
                          {item.title}
                          {item.badge && (
                            <span className="ml-auto text-[9px] font-medium px-1 py-0.5 rounded bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                          <ChevronRight size={11} className="shrink-0 text-gray-200 dark:text-gray-700" />
                          {item.title}
                        </span>
                      )}
                    </li>
                  ))}
                  {category.items.length > 4 && (
                    <li className="text-xs text-gray-400 dark:text-gray-500 ml-3.5">
                      +{category.items.length - 4} more topics
                    </li>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ready to master React?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Start with the fundamentals and progress at your own pace. Free forever.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/docs/introduction/what-is-react"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3 font-semibold text-white hover:bg-brand-700 transition-colors"
            >
              Begin the Tutorial <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-400 dark:text-gray-500">
            {['No account needed', 'Progress saved locally', 'Works offline'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle size={13} className="text-emerald-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-brand-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <span>ReactDocs © 2024</span>
          </div>
          <div className="flex gap-6">
            <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">Official React Docs</a>
            <a href="https://github.com/facebook/react" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">GitHub</a>
            <Link to="/docs/introduction/what-is-react" className="hover:text-brand-600 transition-colors">Tutorials</Link>
          </div>
        </div>
      </footer>

      <SearchModal isOpen={isOpen} onClose={close} />
    </div>
  )
}
