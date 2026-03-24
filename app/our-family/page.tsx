'use client'
import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — Our Family page
// 🔧 BUILDER: Fill in from the onsite visit conversation
// 👤 OWNER: Update via the edit sidebar

// 🔧 REPLACE with the family's own introduction
const family = {
  heading: 'Our Family',
  intro: 'Write a warm introduction about the family here. Who are they? How did they come to this land? What do they love about it?',
  members: [
    { name: 'Family member name', role: 'Their role or relationship to the property', note: 'Something personal and warm' },
  ],
}

export default function OurFamilyPage() {
  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">📖</div>
          <h1 className="text-3xl font-bold">{family.heading}</h1>
          <p className="mt-2 opacity-75">The people who call this place home</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

        <div className="bg-white rounded-2xl shadow-sm border border-light p-8">
          <p className="text-dark opacity-70 leading-relaxed text-lg">{family.intro}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
          <h2 className="text-lg font-semibold text-dark mb-4">The Family</h2>
          <div className="divide-y divide-light">
            {family.members.map((member, i) => (
              <div key={i} className="py-4">
                <p className="font-semibold text-dark">{member.name}</p>
                <p className="text-sm text-secondary mt-0.5">{member.role}</p>
                {member.note && <p className="text-sm text-dark opacity-60 mt-2">{member.note}</p>}
              </div>
            ))}
          </div>
        </div>

      </div>

      <footer className="text-center text-sm text-dark opacity-40 py-8">
        {config.propertyName} · {config.location.region}
      </footer>
    </main>
  )
}
