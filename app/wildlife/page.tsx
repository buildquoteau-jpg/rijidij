'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import EditSidebar from '@/components/EditSidebar'
import Loading from '@/components/Loading'
import config from '@/config'
import { supabase } from '@/lib/supabase'

interface Sighting {
  id?: string
  date: string
  species: string
  note?: string
  threatened: boolean
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
  { name: 'Pest species example', type: 'pest', note: 'How they manage it' },
]

const typeEmoji: Record<string, string> = {
  bird: '🐦',
  mammal: '🦘',
  reptile: '🦎',
  insect: '🦋',
  pest: '⚠️',
}

export default function WildlifePage() {
  const [sightings, setSightings] = useState<Sighting[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [newSighting, setNewSighting] = useState({
    date: new Date().toISOString().split('T')[0],
    species: '',
    note: '',
    threatened: false,
  })

  useEffect(() => {
    loadSightings()
  }, [])

  const loadSightings = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('sightings')
      .select('*')
      .order('date', { ascending: false })
    if (data) setSightings(data)
    setLoading(false)
  }

  const saveSighting = async () => {
    if (!newSighting.species) return
    setSaving(true)
    const { error } = await supabase
      .from('sightings')
      .insert([newSighting])
    if (!error) {
      await loadSightings()
      setNewSighting({
        date: new Date().toISOString().split('T')[0],
        species: '',
        note: '',
        threatened: false,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }

  const wildlife = knownSpecies.filter(s => s.type !== 'pest')
  const pests = knownSpecies.filter(s => s.type === 'pest')

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
          {loading ? (
            <Loading message="Loading sightings..." />
          ) : sightings.length === 0 ? (
            <div className="rounded-xl border border-dashed border-light p-8 text-center">
              <p className="text-sm text-dark opacity-40">No sightings logged yet</p>
            </div>
          ) : (
            <div className="divide-y divide-light">
              {sightings.slice(0, 20).map((s, i) => (
                <div key={i} className="py-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-dark">
                      {s.threatened && '⭐ '}{s.species}
                    </p>
                    {s.note && (
                      <p className="text-sm text-dark opacity-50">{s.note}</p>
                    )}
                  </div>
                  <span className="text-sm text-dark opacity-40 whitespace-nowrap">{s.date}</span>
                </div>
              ))}
            </div>
          )}
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
                      {s.threatened && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full mr-2">
                          threatened
                        </span>
                      )}
                      {s.name}
                    </p>
                    {s.note && (
                      <p className="text-sm text-dark opacity-50">{s.note}</p>
                    )}
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
                  {s.note && (
                    <p className="text-sm text-dark opacity-50 mt-1">{s.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <footer className="text-center text-sm text-dark opacity-40 py-8 border-t border-light">
        <p>{config.propertyName} · {config.location.region}</p>
        <p className="mt-1 opacity-50 text-xs">
          <a href="/faq" className="underline">FAQ</a>
          {' · '}
          <a href="/privacy-policy" className="underline">Privacy Policy</a>
          {' · '}
          <a href="/disclaimer" className="underline">Disclaimer</a>
        </p>
      </footer>

      <EditSidebar pageName="Wildlife">
        <div className="space-y-4">
          <h3 className="font-semibold text-dark">Log a Sighting</h3>
          <div>
            <label className="text-xs text-dark opacity-50 block mb-1">Date</label>
            <input
              type="date"
              value={newSighting.date}
              onChange={e => setNewSighting({...newSighting, date: e.target.value})}
              className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs text-dark opacity-50 block mb-1">Species</label>
            <input
              type="text"
              value={newSighting.species}
              onChange={e => setNewSighting({...newSighting, species: e.target.value})}
              placeholder="eg. Red-tailed Black Cockatoo"
              className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs text-dark opacity-50 block mb-1">Note (optional)</label>
            <textarea
              value={newSighting.note}
              onChange={e => setNewSighting({...newSighting, note: e.target.value})}
              placeholder="How many? Where? Behaviour?"
              rows={3}
              className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="threatened"
              checked={newSighting.threatened}
              onChange={e => setNewSighting({...newSighting, threatened: e.target.checked})}
              className="rounded"
            />
            <label htmlFor="threatened" className="text-xs text-dark opacity-60">
              Threatened species ⭐
            </label>
          </div>
          <button
            onClick={saveSighting}
            disabled={saving || !newSighting.species}
            className="w-full bg-primary text-white rounded-lg py-2.5 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : saved ? '✅ Saved!' : '+ Log Sighting'}
          </button>
        </div>
      </EditSidebar>

    </main>
  )
}
