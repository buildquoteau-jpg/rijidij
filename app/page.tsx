import Nav from '@/components/Nav'
import Banner from '@/components/Banner'
import PageTile from '@/components/PageTile'
import config from '@/config'

const tileOrder = [
  { key: 'gallery',     href: '/gallery' },
  { key: 'ourStory',    href: '/our-story' },
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

      {/* Page tiles — 2 column grid on desktop, 1 column on mobile */}
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

      {/* Footer */}
      <footer className="text-center text-sm text-dark opacity-40 py-8">
        {config.propertyName} · {config.location.region}
      </footer>
    </main>
  )
}
