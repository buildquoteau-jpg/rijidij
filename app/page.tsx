import Nav from '@/components/Nav'
import Banner from '@/components/Banner'
import PageTile from '@/components/PageTile'
import config from '@/config'

const tileOrder = [
  { key: 'gallery',     href: '/gallery' },
  { key: 'theLand',     href: '/our-story' },
  { key: 'ourFamily',   href: '/our-family' },
  { key: 'orchard',     href: '/orchard' },
  { key: 'water',       href: '/water' },
  { key: 'wildlife',    href: '/wildlife' },
  { key: 'maps',        href: '/maps' },
  { key: 'calendar',    href: '/calendar' },
  { key: 'theArea',     href: '/the-area' },
  { key: 'ownerReadme', href: '/owner-readme' },
]

export default function Home() {
  const enabledTiles = tileOrder.filter(
    (tile) => config.pages[tile.key as keyof typeof config.pages]?.enabled
  )

  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <Banner
        propertyName={config.propertyName}
        tagline={config.tagline}
      />

      {/* Location bar */}
      <div className="bg-white border-b border-light">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-3 text-sm text-dark opacity-50">
          <span>📍</span>
          <span>{config.location.lat}, {config.location.lng}</span>
          <span>·</span>
          <span>{config.location.region}</span>
        </div>
      </div>

      {/* Page tiles */}
      <section className="max-w-3xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {enabledTiles.map((tile) => {
          const page = config.pages[tile.key as keyof typeof config.pages]
          return (
            <PageTile
              key={tile.key}
              title={page.title}
              description={page.description}
              emoji={page.emoji}
              href={tile.href}
              isPrivate={page.private}
            />
          )
        })}
      </section>

      <footer className="text-center text-sm text-dark opacity-40 py-8 border-t border-light">
        <p>{config.propertyName} · {config.location.region}</p>
        <p className="mt-2 opacity-50 text-xs">
          <a href="/faq" className="underline">FAQ</a>
          {' · '}
          <a href="/privacy-policy" className="underline">Privacy Policy</a>
          {' · '}
          <a href="/disclaimer" className="underline">Disclaimer</a>
        </p>
        <p className="mt-1 opacity-30 text-xs">Built with Southwest Story · Dunsborough WA</p>
      </footer>
    </main>
  )
}
