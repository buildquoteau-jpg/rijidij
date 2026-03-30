'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Banner from '@/components/Banner'
import PageTile from '@/components/PageTile'
import EditSidebar from '@/components/EditSidebar'
import config from '@/config'
import theme from '@/theme'
import { supabase } from '@/lib/supabase'

// 📋 TEMPLATE — tile order stays the same for every customer
// 🔧 Toggle pages on/off in config.ts
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

// 📋 Converts decimal lat/long to degrees°minutes' N/S/E/W format
function toDegreesMinutes(decimal: number, isLat: boolean): string {
  const abs = Math.abs(decimal)
  const deg = Math.floor(abs)
  const min = ((abs - deg) * 60).toFixed(1)
  const dir = isLat ? (decimal >= 0 ? 'N' : 'S') : (decimal >= 0 ? 'E' : 'W')
  return `${deg}\u00b0 ${min}' ${dir}`
}

export default function Home() {
  const [heroUrl, setHeroUrl] = useState<string | null>(null)
  const [heroCaption, setHeroCaption] = useState('')
  const [editCaption, setEditCaption] = useState('')
  const [posX, setPosX] = useState(50)
  const [posY, setPosY] = useState(50)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const enabledTiles = tileOrder.filter(
    (tile) => config.pages[tile.key as keyof typeof config.pages]?.enabled
  )

  const latStr = toDegreesMinutes(config.location.lat, true)
  const lngStr = toDegreesMinutes(config.location.lng, false)

  useEffect(() => {
    loadHero()
  }, [])

  const loadHero = async () => {
    const { data } = await supabase
      .from('page_content')
      .select('content')
      .eq('page', 'home')
      .maybeSingle()
    if (data?.content?.heroUrl) setHeroUrl(data.content.heroUrl)
    if (data?.content?.heroCaption) {
      setHeroCaption(data.content.heroCaption)
      setEditCaption(data.content.heroCaption)
    }
    if (data?.content?.heroPosX !== undefined) setPosX(data.content.heroPosX)
    if (data?.content?.heroPosY !== undefined) setPosY(data.content.heroPosY)
  }

  const uploadHero = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fileName = `hero-${Date.now()}.${file.name.split('.').pop()}`
    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(fileName, file, { upsert: true })
    if (uploadError) { setUploading(false); return }
    const { data: urlData } = supabase.storage
      .from('photos')
      .getPublicUrl(fileName)
    const url = urlData.publicUrl
    await supabase
      .from('page_content')
      .upsert({ page: 'home', content: { heroUrl: url, heroCaption: editCaption, heroPosX: posX, heroPosY: posY }, updated_at: new Date().toISOString() })
    setHeroUrl(url)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setUploading(false)
  }

  const saveAll = async () => {
    setSaving(true)
    await supabase
      .from('page_content')
      .upsert({ page: 'home', content: { heroUrl, heroCaption: editCaption, heroPosX: posX, heroPosY: posY }, updated_at: new Date().toISOString() })
    setHeroCaption(editCaption)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setSaving(false)
  }

  return (
    <main className="min-h-screen bg-light">
      <Nav />
      <Banner
        propertyName={config.propertyName}
        tagline={config.tagline}
        imageUrl={heroUrl ?? undefined}
        imagePosition={`${posX}% ${posY}%`}
      />

      {/* Location + caption bar */}
      <div className="bg-white border-b border-light">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <p style={{ fontFamily: theme.locationFont }}
            className="text-sm font-light tracking-widest text-dark opacity-60">
            {latStr} &nbsp;&middot;&nbsp; {lngStr}
          </p>
          {heroCaption && (
            <p className="text-xs text-dark opacity-50 italic">{heroCaption}</p>
          )}
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

      <EditSidebar pageName="Home">
        <div className="space-y-6">

          <div className="space-y-3">
            <h3 className="font-semibold text-dark">Hero Photo</h3>
            {heroUrl && (
              <img
                src={heroUrl}
                alt="Current hero"
                className="w-full h-32 object-cover rounded-lg border border-light"
                style={{ objectPosition: `${posX}% ${posY}%` }}
              />
            )}
            <label className="text-xs text-dark opacity-50 block">Upload a new photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={uploadHero}
              disabled={uploading}
              className="w-full text-sm text-dark opacity-70"
            />
            {uploading && <p className="text-sm text-primary">Uploading...</p>}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-dark">Photo Caption</h3>
            <p className="text-xs text-dark opacity-50">Shown faintly below the coordinates</p>
            <input
              type="text"
              value={editCaption}
              onChange={e => setEditCaption(e.target.value)}
              placeholder="eg. The driveway, January 1991"
              className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-dark">Photo Position</h3>
            <p className="text-xs text-dark opacity-50">Adjust which part of the photo shows</p>
            <div>
              <label className="text-xs text-dark opacity-50 block mb-1">Left — Right</label>
              <input type="range" min={0} max={100} value={posX}
                onChange={e => setPosX(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="text-xs text-dark opacity-50 block mb-1">Top — Bottom</label>
              <input type="range" min={0} max={100} value={posY}
                onChange={e => setPosY(Number(e.target.value))} className="w-full" />
            </div>
          </div>

          <button
            onClick={saveAll}
            disabled={saving}
            className="w-full bg-primary text-white rounded-lg py-2.5 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : saved ? '✅ Saved!' : 'Save Changes'}
          </button>

        </div>
      </EditSidebar>
    </main>
  )
}
