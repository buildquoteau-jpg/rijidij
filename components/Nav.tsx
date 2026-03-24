'use client'
import Link from 'next/link'
import { useState } from 'react'
import config from '@/config'

const navLinks = [
  { key: 'gallery',     href: '/gallery',      label: 'Gallery' },
  { key: 'ourStory',    href: '/our-story',    label: 'Our Story' },
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

  const enabledLinks = navLinks.filter(
    (link) => config.pages[link.key as keyof typeof config.pages]?.enabled
  )

  return (
    <>
      <nav className="bg-primary text-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide">
          {config.propertyName}
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

      {open && (
        <div className="bg-primary text-white py-4">
          <ul className="max-w-3xl mx-auto px-6 flex flex-col gap-1">
            {enabledLinks.map((link) => {
              const page = config.pages[link.key as keyof typeof config.pages]
              return (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3 border-b border-white/10 hover:opacity-75 transition"
                  >
                    <span>{page.emoji} {link.label}</span>
                    {page.private && (
                      <span className="text-xs opacity-50">private</span>
                    )}
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
