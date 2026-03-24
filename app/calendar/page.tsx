'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import EditSidebar from '@/components/EditSidebar'
import PrivateGate from '@/components/PrivateGate'
import Loading from '@/components/Loading'
import config from '@/config'
import { supabase } from '@/lib/supabase'

interface CalendarEvent {
  id?: string
  title: string
  date: string
  type: string
  note?: string
  recurring?: string
}

const typeEmoji: Record<string, string> = {
  visitor: '👋',
  maintenance: '🔧',
  rates: '💰',
  firebreak: '🔥',
  reminder: '📌',
}

const typeColour: Record<string, string> = {
  visitor: 'bg-blue-50 border-blue-200 text-blue-800',
  maintenance: 'bg-amber-50 border-amber-200 text-amber-800',
  rates: 'bg-purple-50 border-purple-200 text-purple-800',
  firebreak: 'bg-red-50 border-red-200 text-red-800',
  reminder: 'bg-gray-50 border-gray-200 text-gray-800',
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    type: 'reminder',
    note: '',
    recurring: '',
  })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('calendar_events')
      .select('*')
      .order('date', { ascending: true })
    if (data) setEvents(data)
    setLoading(false)
  }

  const saveEvent = async () => {
    if (!newEvent.title) return
    setSaving(true)
    const { error } = await supabase
      .from('calendar_events')
      .insert([newEvent])
    if (!error) {
      await loadEvents()
      setNewEvent({
        title: '',
        date: new Date().toISOString().split('T')[0],
        type: 'reminder',
        note: '',
        recurring: '',
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }

  return (
    <PrivateGate pageName="Calendar">
      <main className="min-h-screen bg-light">
        <Nav />

        <div className="bg-primary text-white px-6 py-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-4xl mb-3">📅</div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="mt-2 opacity-75">Visitors, reminders and property deadlines</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10 space-y-4">
          {loading ? (
            <Loading message="Loading calendar..." />
          ) : events.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-light p-12 text-center">
              <p className="text-sm text-dark opacity-40">No events yet — add your first event using the ✏️ button</p>
            </div>
          ) : (
            events.map((event, i) => (
              <div key={i} className={`rounded-2xl border p-4 ${typeColour[event.type] || typeColour.reminder}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{typeEmoji[event.type] || '📌'}</span>
                    <div>
                      <p className="font-semibold">{event.title}</p>
                      {event.note && (
                        <p className="text-sm opacity-70 mt-1">{event.note}</p>
                      )}
                      {event.recurring && (
                        <p className="text-xs opacity-50 mt-1">Repeats {event.recurring}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-medium whitespace-nowrap">{event.date}</p>
                </div>
              </div>
            ))
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

        <EditSidebar pageName="Calendar">
          <div className="space-y-4">
            <h3 className="font-semibold text-dark">Add Event</h3>
            <div>
              <label className="text-xs text-dark opacity-50 block mb-1">Title</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="eg. Firebreak inspection due"
                className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs text-dark opacity-50 block mb-1">Date</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs text-dark opacity-50 block mb-1">Type</label>
              <select
                value={newEvent.type}
                onChange={e => setNewEvent({...newEvent, type: e.target.value})}
                className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              >
                <option value="visitor">👋 Visitor</option>
                <option value="maintenance">🔧 Maintenance</option>
                <option value="rates">💰 Rates</option>
                <option value="firebreak">🔥 Firebreak</option>
                <option value="reminder">📌 Reminder</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-dark opacity-50 block mb-1">Note (optional)</label>
              <textarea
                value={newEvent.note}
                onChange={e => setNewEvent({...newEvent, note: e.target.value})}
                placeholder="Any details"
                rows={2}
                className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>
            <div>
              <label className="text-xs text-dark opacity-50 block mb-1">Repeats (optional)</label>
              <select
                value={newEvent.recurring}
                onChange={e => setNewEvent({...newEvent, recurring: e.target.value})}
                className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              >
                <option value="">Does not repeat</option>
                <option value="annual">Annual</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <button
              onClick={saveEvent}
              disabled={saving || !newEvent.title}
              className="w-full bg-primary text-white rounded-lg py-2.5 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : saved ? '✅ Saved!' : '+ Add Event'}
            </button>
          </div>
        </EditSidebar>

      </main>
    </PrivateGate>
  )
}
