'use client'
import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — Wildlife page
// 🔧 BUILDER: Add any known species from the onsite visit
// 👤 OWNER: Log new sightings via the edit sidebar

interface Sighting {
  date: string
  species: string
  note?: string
  threatened?: boolean
}

interface KnownSpecies {
  name: string
  type: 'bird' | 'mammal' | 'reptile' | 'insect' | 'pest'
  note?: string
  threatened?: boolean
}

// 🔧 REPLACE with species known to live on or visit this property
const knownSpecies: KnownSpecies[] = [
  { name: 'Species name', type: 'bird', note: 'Any notes about this species on the property' },
  { name: 'Pest species', type: 'pest', note: 'How they manage it' },
]

// 🔧 REPLACE with actual sightings logged by the owner
const sightings: Sighting[] = [
  { date: '2025-01-01', species: 'First sighting', note: 'Add real sightings here', threatened: false },
]

const typeEmoji: Record<string, string> = {
  bird: '🐦',
  mammal: '🦘',
  reptile: '🦎',
  insect: '🦋',
  pest: '⚠️',
}

export default function WildlifePage() {
  const recentSightings = [...sightings].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10)
  const threatened = knownSpecies.filter(s => s.threatened)
  const pests = knownSpecies.filter(s => s.type === 'pest')
  const wildlife = knownSpecies.filter(s => s.type !== 'pest')

  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">🦜</div>
          <h1 className="text-3xl font-bold">Wildlife</h1>
          <p className="mt-2 opacity-75">Sightings, species and pest management</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">

        {/* Recent sightings */}
        <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
          <h2 className="text-lg font-semibold text-dark mb-4">Recent Sightings</h2>
          <div className="divide-y divide-light">
            {recentSightings.map((s, i) => (
              <div key={i} className="py-3 flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-dark">
                    {s.threatened && '⭐ '}{s.species}
                  </p>
                  {s.note && <p className="text-sm text-dark opacity-50">{s.note}</p>}
                </div>
                <span className="text-sm text-dark opacity-40 whitespace-nowrap">{s.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Known wildlife */}
        {wildlife.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
            <h2 className="text-lg font-semibold text-dark mb-4">Known Species</h2>
            <div className="divide-y divide-light">
              {wildlife.map((s, i) => (
                <div key={i} className="py-3 flex items-start gap-3">
                  <span className="text-xl">{typeEmoji[s.type]}</span>
                  <div>
                    <p className="font-medium text-dark">
                      {s.threatened && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full mr-2">threatened</span>}
                      {s.name}
                    </p>
                    {s.note && <p className="text-sm text-dark opacity-50">{s.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pest species */}
        {pests.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
            <h2 className="text-lg font-semibold text-dark mb-4">Pest Species</h2>
            <div className="divide-y divide-light">
              {pests.map((s, i) => (
                <div key={i} className="py-3">
                  <p className="font-medium text-dark">⚠️ {s.name}</p>
                  {s.note && <p className="text-sm text-dark opacity-50 mt-1">{s.note}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <footer className="text-center text-sm text-dark opacity-40 py-8">
        {config.propertyName} · {config.location.region}
      </footer>
    </main>
  )
}
