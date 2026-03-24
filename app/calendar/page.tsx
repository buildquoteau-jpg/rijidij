'use client'
import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — Calendar page (private)
// 🔧 BUILDER: Add any known recurring dates from the onsite visit
// 👤 OWNER: Add events via the edit sidebar

interface CalendarEvent {
  title: string
  date: string
  type: 'visitor' | 'maintenance' | 'rates' | 'firebreak' | 'reminder'
  note?: string
  recurring?: 'annual' | 'monthly' | 'weekly'
}

// 🔧 REPLACE with this property's known events and dates
const events: CalendarEvent[] = [
  { title: 'Firebreak inspection due', date: '2025-11-01', type: 'firebreak', note: 'Check local shire requirements', recurring: 'annual' },
  { title: 'Council rates due', date: '2025-08-01', type: 'rates', recurring: 'annual' },
  { title: 'Add a visitor', date: '2025-06-15', type: 'visitor', note: 'Who is coming and when' },
]

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
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))

  return (
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
        {upcoming.map((event, i) => (
          <div key={i} className={`rounded-2xl border p-4 ${typeColour[event.type]}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{typeEmoji[event.type]}</span>
                <div>
                  <p className="font-semibold">{event.title}</p>
                  {event.note && <p className="text-sm opacity-70 mt-1">{event.note}</p>}
                  {event.recurring && (
                    <p className="text-xs opacity-50 mt-1">Repeats {event.recurring}</p>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-medium">{event.date}</p>
              </div>
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
