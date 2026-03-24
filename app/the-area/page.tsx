'use client'
import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — The Area page (optional)
// 🔧 BUILDER: Fill in from local knowledge gathered during the visit
// 👤 OWNER: Add tips and places via the edit sidebar

interface LocalPlace {
  name: string
  category: 'food' | 'beach' | 'walk' | 'shopping' | 'service' | 'neighbour'
  description: string
  tip?: string
}

// 🔧 REPLACE with places relevant to this property's area
const places: LocalPlace[] = [
  { name: 'Place name', category: 'food', description: 'Brief description', tip: 'Local tip goes here' },
]

const categoryEmoji: Record<string, string> = {
  food: '🍽️',
  beach: '🏖️',
  walk: '🥾',
  shopping: '🛒',
  service: '🔧',
  neighbour: '👋',
}

export default function TheAreaPage() {
  const categories = Array.from(new Set(places.map(p => p.category)))

  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">🌏</div>
          <h1 className="text-3xl font-bold">The Area</h1>
          <p className="mt-2 opacity-75">Local knowledge, places and tips</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        {categories.map(cat => (
          <div key={cat} className="bg-white rounded-2xl shadow-sm border border-light p-6">
            <h2 className="text-lg font-semibold text-dark mb-4 capitalize">
              {categoryEmoji[cat]} {cat}
            </h2>
            <div className="divide-y divide-light">
              {places.filter(p => p.category === cat).map((place, i) => (
                <div key={i} className="py-3">
                  <p className="font-medium text-dark">{place.name}</p>
                  <p className="text-sm text-dark opacity-60 mt-1">{place.description}</p>
                  {place.tip && (
                    <p className="text-sm text-secondary mt-1">💡 {place.tip}</p>
                  )}
                </div>
              ))}
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
