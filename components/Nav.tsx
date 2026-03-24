'use client'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import config from '@/config'

const navLinks = [
  { key: 'gallery',     href: '/gallery',      label: 'Gallery' },
  { key: 'theLand',     href: '/our-story',    label: 'The Land' },
  { key: 'ourFamily',   href: '/our-family',   label: 'Our Family' },
  { key: 'orchard',     href: '/orchard',      label: 'Orchard' },
  { key: 'water',       href: '/water',        label: 'Water' },
  { key: 'wildlife',    href: '/wildlife',     label: 'Wildlife' },
  { key: 'maps',        href: '/maps',         label: 'Maps' },
  { key: 'calendar',    href: '/calendar',     label: 'Calendar' },
  { key: 'theArea',     href: '/the-area',     label: 'The Area' },
  { key: 'ownerReadme', href: '/owner-readme', label: 'Owner Notes' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const currentPage = navLinks.find(link => link.href === pathname)

  const enabledLinks = navLinks.filter(
    (link) => config.pages[link.key as keyof typeof config.pages]?.enabled
  )

  return (
    <>
      {/* Main nav bar */}
      <nav className="bg-primary text-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide">
          🌿 {config.propertyName}
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-white/10 transition"
          aria-label="Menu"
        >
          {open ? (
            <span className="text-2xl font-light">✕</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>
      </nav>

      {/* Breadcrumb bar — shows on all inner pages */}
      {!isHome && (
        <div className="bg-primary/90 text-white px-6 py-2 flex items-center gap-3 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm opacity-60 hover:opacity-100 transition"
          >
            ← Home
          </Link>
          {currentPage && (
            <>
              <span className="opacity-30">/</span>
              <span className="text-sm opacity-90">{currentPage.label}</span>
            </>
          )}
        </div>
      )}

      {/* Slide down menu */}
      {open && (
        <div className="bg-primary text-white py-4 shadow-lg">
          <ul className="max-w-3xl mx-auto px-6 flex flex-col gap-1">
            {enabledLinks.map((link) => {
              const page = config.pages[link.key as keyof typeof config.pages]
              const isActive = pathname === link.href
              return (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-3 border-b border-white/10 hover:opacity-75 transition ${isActive ? 'opacity-100 font-semibold' : 'opacity-70'}`}
                  >
                    <span>{page.emoji} {link.label}</span>
                    <div className="flex items-center gap-2">
                      {page.private && (
                        <span className="text-xs opacity-50">private</span>
                      )}
                      {isActive && (
                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">here</span>
                      )}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
