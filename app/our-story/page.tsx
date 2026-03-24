'use client'
import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — The Land page
// 🔧 BUILDER: Fill in from onsite visit, old photos, and owner's records
// 👤 OWNER: Add new chapters and events via the edit sidebar
// 🎁 GIFT: This page is a gift to future stewards of this land

interface Chapter {
  familyName: string
  fromYear: number
  toYear?: number
  intro: string
  events: ChapterEvent[]
  photos?: string[]
}

interface ChapterEvent {
  year: number
  description: string
  significant?: boolean
}

// 🔧 REPLACE with the real history of this property
// Add one Chapter per family/owner who has stewarded this land
const chapters: Chapter[] = [
  {
    familyName: 'Before European Settlement',
    fromYear: 0,
    toYear: 1800,
    intro: 'Describe the original custodians of this land. What do you know about who was here before?',
    events: [
      { year: 0, description: 'Add what is known about the original custodians of this land', significant: true },
    ],
  },
  {
    familyName: 'Early Settlement',
    fromYear: 1800,
    toYear: 1980,
    intro: 'What is known about early European settlement of this area? Who farmed or lived here?',
    events: [
      { year: 1900, description: 'Add any known historical events for this land' },
    ],
  },
  {
    familyName: 'The [Family Name] Years',
    fromYear: 1984,
    intro: 'This is where the current owners write their chapter. What did you build? What did you plant? What do you love about this place?',
    events: [
      { year: 1984, description: 'Bought the property', significant: true },
      { year: 1985, description: 'Add key events year by year' },
    ],
    photos: [],
  },
]

// 🔧 This paragraph appears at the top of the page — edit to suit
const stewardshipStatement = `This land existed long before us and will continue long after.
We are its stewards for a time — caring for its trees, its water, its creatures.
This page is a record of all who have tended it, and a gift to those who will tend it next.`

export default function TheLandPage() {
  return (
    <main className="min-h-screen bg-light">
      <Nav />

      {/* Hero */}
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
          <p className="text-dark opacity-70 leading-relaxed italic whitespace-pre-line text-lg">
            {stewardshipStatement}
          </p>
        </div>

        {/* Chapters */}
        {chapters.map((chapter, ci) => (
          <div key={ci} className="space-y-4">

            {/* Chapter header */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-secondary opacity-30" />
              <div className="text-center px-4">
                <p className="text-lg font-bold text-primary">{chapter.familyName}</p>
                <p className="text-sm text-dark opacity-40">
                  {chapter.fromYear === 0 ? 'Time immemorial' : chapter.fromYear}
                  {chapter.toYear ? ` — ${chapter.toYear}` : ' — present'}
                </p>
              </div>
              <div className="h-px flex-1 bg-secondary opacity-30" />
            </div>

            {/* Chapter intro */}
            <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
              <p className="text-dark opacity-70 leading-relaxed">{chapter.intro}</p>
            </div>

            {/* Chapter photos */}
            {chapter.photos && chapter.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {chapter.photos.map((photo, pi) => (
                  <div key={pi} className="aspect-square rounded-xl overflow-hidden bg-light border border-light">
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Chapter timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-light" />
                <div className="space-y-6">
                  {chapter.events
                    .sort((a, b) => a.year - b.year)
                    .map((event, ei) => (
                      <div key={ei} className="relative flex gap-5">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                          event.significant
                            ? 'bg-primary text-white'
                            : 'bg-light text-dark opacity-60 border border-light'
                        }`}>
                          {event.year === 0 ? '—' : String(event.year).slice(-2)}
                        </div>
                        <div className="pt-1.5">
                          {event.significant && (
                            <span className="text-xs text-secondary font-semibold uppercase tracking-wide">
                              {event.year === 0 ? 'Before records' : event.year}
                            </span>
                          )}
                          {!event.significant && (
                            <span className="text-xs text-dark opacity-40">{event.year}</span>
                          )}
                          <p className={`text-sm mt-0.5 ${event.significant ? 'text-dark font-medium' : 'text-dark opacity-60'}`}>
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

          </div>
        ))}

        {/* Note to future stewards */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-primary mb-3">A note to future stewards</h2>
          <p className="text-dark opacity-60 text-sm leading-relaxed">
            {/* 🔧 BUILDER: Ask the owner to write a short note to whoever comes next */}
            Add a personal note here from the current owners to the next stewards of this land.
            What do they hope for it? What should be cared for? What brings them joy here?
          </p>
        </div>

      </div>

      <footer className="text-center text-sm text-dark opacity-40 py-8">
        {config.propertyName} · {config.location.region}
      </footer>
    </main>
  )
}
