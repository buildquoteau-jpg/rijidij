'use client'
import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — Our Story page
// 🔧 BUILDER: Fill in the timeline and family story from the onsite visit
// 👤 OWNER: Add new entries via the edit sidebar

interface TimelineEntry {
  year: number
  title: string
  description: string
}

// 🔧 REPLACE with this property's actual history from the owner
const timeline: TimelineEntry[] = [
  { year: 2000, title: 'The beginning', description: 'Add the property history here. When did they buy it? What was it like when they arrived?' },
  { year: 2005, title: 'Another milestone', description: 'What did they build, plant, or change?' },
  { year: 2010, title: 'Keep going...', description: 'Each entry becomes a beautiful moment in the property story.' },
]

// 🔧 REPLACE with the family/owner introduction
const intro = {
  heading: 'Our Story',
  subheading: 'The people and the land',
  body: 'Write a warm 2-3 sentence introduction about the family and their connection to this property. This is the heart of the whole website.',
}

export default function OurStoryPage() {
  const sorted = [...timeline].sort((a, b) => a.year - b.year)

  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">📖</div>
          <h1 className="text-3xl font-bold">{intro.heading}</h1>
          <p className="mt-2 opacity-75">{intro.subheading}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">

        {/* Intro */}
        <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
          <p className="text-dark opacity-70 leading-relaxed">{intro.body}</p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
          <h2 className="text-lg font-semibold text-dark mb-6">Property Timeline</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-light" />
            <div className="space-y-8">
              {sorted.map((entry, i) => (
                <div key={i} className="relative flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold z-10">
                    {entry.year}
                  </div>
                  <div className="pt-2 pb-2">
                    <p className="font-semibold text-dark">{entry.title}</p>
                    <p className="text-sm text-dark opacity-60 mt-1">{entry.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <footer className="text-center text-sm text-dark opacity-40 py-8">
        {config.propertyName} · {config.location.region}
      </footer>
    </main>
  )
}
