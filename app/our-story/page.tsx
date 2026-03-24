'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import EditSidebar from '@/components/EditSidebar'
import Loading from '@/components/Loading'
import config from '@/config'
import { supabase } from '@/lib/supabase'

interface TimelineEvent {
  id?: string
  chapter: string
  year: number | null
  description: string
  significant: boolean
}

// 🔧 REPLACE with the real chapters for this property
const chapters = [
  {
    key: 'before',
    title: 'Before European Settlement',
    fromYear: 'Time immemorial',
    toYear: '1800s',
    intro: 'Describe the original custodians of this land. What do you know about who was here before?',
  },
  {
    key: 'early',
    title: 'Early Settlement',
    fromYear: '1800s',
    toYear: '1980',
    intro: 'What is known about early European settlement of this area? Who farmed or lived here?',
  },
  {
    key: 'current',
    title: 'The [Family Name] Years',
    fromYear: '1984',
    toYear: 'present',
    intro: 'This is where the current owners write their chapter.',
  },
]

// 🔧 REPLACE with a personal note to future stewards
const noteToFuture = `Add a personal note here from the current owners to the next stewards of this land.
What do they hope for it? What should be cared for? What brings them joy here?`

const stewardshipStatement = `This land existed long before us and will continue long after.
We are its stewards for a time — caring for its trees, its water, its creatures.
This page is a record of all who have tended it, and a gift to those who will tend it next.`

export default function TheLandPage() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [newEvent, setNewEvent] = useState({
    chapter: 'current',
    year: new Date().getFullYear(),
    description: '',
    significant: false,
  })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('timeline_events')
      .select('*')
      .order('year', { ascending: true })
    if (data) setEvents(data)
    setLoading(false)
  }

  const saveEvent = async () => {
    if (!newEvent.description) return
    setSaving(true)
    const { error } = await supabase
      .from('timeline_events')
      .insert([newEvent])
    if (!error) {
      await loadEvents()
      setNewEvent({
        chapter: 'current',
        year: new Date().getFullYear(),
        description: '',
        significant: false,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }

  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">🌿</div>
          <h1 className="text-3xl font-bold">The Land</h1>
          <p className="mt-2 opacity-75">A record of stewardship</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-12">

        {/* Stewardship statement */}
        <div className="bg-white rounded-2xl shadow-sm border border-light p-8">
          <p className="text-dark opacity-70 leading-relaxed italic text-lg whitespace-pre-line">
            {stewardshipStatement}
          </p>
        </div>

        {loading ? (
          <Loading message="Loading history..." />
        ) : (
          chapters.map(chapter => {
            const chapterEvents = events.filter(e => e.chapter === chapter.key)
            return (
              <div key={chapter.key} className="space-y-4">

                {/* Chapter header */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-secondary opacity-30" />
                  <div className="text-center px-4">
                    <p className="text-lg font-bold text-primary">{chapter.title}</p>
                    <p className="text-sm text-dark opacity-40">
                      {chapter.fromYear} — {chapter.toYear}
                    </p>
                  </div>
                  <div className="h-px flex-1 bg-secondary opacity-30" />
                </div>

                {/* Chapter intro */}
                <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
                  <p className="text-dark opacity-70 leading-relaxed">{chapter.intro}</p>
                </div>

                {/* Chapter timeline */}
                {chapterEvents.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
                    <div className="relative">
                      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-light" />
                      <div className="space-y-6">
                        {chapterEvents.map((event, i) => (
                          <div key={i} className="relative flex gap-5">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                              event.significant
                                ? 'bg-primary text-white'
                                : 'bg-light text-dark border border-light'
                            }`}>
                              {event.year ? String(event.year).slice(-2) : '—'}
                            </div>
                            <div className="pt-1.5">
                              <span className={`text-xs ${event.significant ? 'text-secondary font-semibold uppercase tracking-wide' : 'text-dark opacity-40'}`}>
                                {event.year || 'Before records'}
                              </span>
                              <p className={`text-sm mt-0.5 ${event.significant ? 'text-dark font-medium' : 'text-dark opacity-60'}`}>
                                {event.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )
          })
        )}

        {/* Note to future stewards */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-primary mb-3">A note to future stewards</h2>
          <p className="text-dark opacity-60 text-sm leading-relaxed whitespace-pre-line">
            {noteToFuture}
          </p>
        </div>

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

      <EditSidebar pageName="The Land">
        <div className="space-y-4">
          <h3 className="font-semibold text-dark">Add Timeline Event</h3>
          <div>
            <label className="text-xs text-dark opacity-50 block mb-1">Chapter</label>
            <select
              value={newEvent.chapter}
              onChange={e => setNewEvent({...newEvent, chapter: e.target.value})}
              className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            >
              {chapters.map(c => (
                <option key={c.key} value={c.key}>{c.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-dark opacity-50 block mb-1">Year</label>
            <input
              type="number"
              value={newEvent.year}
              onChange={e => setNewEvent({...newEvent, year: parseInt(e.target.value)})}
              className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs text-dark opacity-50 block mb-1">What happened</label>
            <textarea
              value={newEvent.description}
              onChange={e => setNewEvent({...newEvent, description: e.target.value})}
              placeholder="eg. Built the shed. Planted the first orchard trees."
              rows={3}
              className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="significant"
              checked={newEvent.significant}
              onChange={e => setNewEvent({...newEvent, significant: e.target.checked})}
              className="rounded"
            />
            <label htmlFor="significant" className="text-xs text-dark opacity-60">
              Significant event (shown in bold)
            </label>
          </div>
          <button
            onClick={saveEvent}
            disabled={saving || !newEvent.description}
            className="w-full bg-primary text-white rounded-lg py-2.5 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : saved ? '✅ Saved!' : '+ Add Event'}
          </button>
        </div>
      </EditSidebar>

    </main>
  )
}
