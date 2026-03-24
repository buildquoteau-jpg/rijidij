'use client'
import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — Maps page (private by default)
// 🔧 BUILDER: Upload maps as images to Supabase storage and add urls below
// 👤 OWNER: Add new maps via the edit sidebar

interface PropertyMap {
  title: string
  description: string
  url: string
  type: 'irrigation' | 'property' | 'garden' | 'other'
}

// 🔧 REPLACE with actual maps for this property
const maps: PropertyMap[] = [
  {
    title: 'Map title',
    description: 'Brief description of what this map shows',
    url: '/placeholder-map.jpg',
    type: 'property',
  },
]

export default function MapsPage() {
  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">🗺️</div>
          <h1 className="text-3xl font-bold">Maps</h1>
          <p className="mt-2 opacity-75">Property maps, irrigation and boundaries</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        {maps.map((map, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-light p-6">
            <h2 className="text-lg font-semibold text-dark">{map.title}</h2>
            <p className="text-sm text-dark opacity-50 mt-1 mb-4">{map.description}</p>
            <div className="rounded-xl overflow-hidden border border-light bg-light flex items-center justify-center min-h-48">
              <img
                src={map.url}
                alt={map.title}
                className="w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <footer className="text-center text-sm text-dark opacity-40 py-8">
        {config.propertyName} · {config.location.region}
      </footer>
    </main>
  )
}
