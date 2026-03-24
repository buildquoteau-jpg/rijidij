'use client'
import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — Water page
// 🔧 BUILDER: Fill in the sections marked with 🔧 from your onsite visit notes
// 👤 OWNER: Add new readings via the edit sidebar after handover

interface BoreReading {
  year: number
  month: string
  depth: string
  note?: string
}

// 🔧 REPLACE these with the customer's actual bore readings
const boreReadings: BoreReading[] = [
  { year: 2025, month: 'Jan', depth: '0.0', note: 'First reading — add yours here' },
]

// 🔧 REPLACE with how THIS property measures their bore (or tank, or rainfall)
const measurementMethod = `Describe how to take a reading here.
Example: Lower the rope until wet. Count the dry metres. That is your reading.
Include any quirks specific to this property.`

// 🔧 SET these to true/false based on what this property actually has
const waterConfig = {
  hasBore: true,       // Does the property have a bore?
  hasTank: true,       // Does the property have a rainwater tank?
  hasRainfall: false,  // Do they track rainfall separately?
  boreContactName: 'Contact name for bore help',
  boreContactNote: 'Any notes about who to call and what to tell them.',
}

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function WaterPage() {
  const latestReading = boreReadings[0]
  const latestDepth = parseFloat(latestReading.depth)
  const waterLevel = latestDepth < 10 ? 'Good' : latestDepth < 12 ? 'Normal' : 'Low'
  const levelColour = latestDepth < 10 ? 'text-green-600' : latestDepth < 12 ? 'text-amber-500' : 'text-red-500'

  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">💧</div>
          <h1 className="text-3xl font-bold">Water</h1>
          <p className="mt-2 opacity-75">Bore levels, tank and water management</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">

        {waterConfig.hasBore && (
          <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
            <h2 className="text-lg font-semibold text-dark mb-4">Latest Bore Reading</h2>
            <div className="flex items-end gap-4">
              <div>
                <span className="text-5xl font-bold text-primary">{latestReading.depth}m</span>
                <span className="text-dark opacity-50 ml-2">below ground</span>
              </div>
              <div className="pb-2">
                <span className={`text-lg font-semibold ${levelColour}`}>{waterLevel}</span>
                <p className="text-sm text-dark opacity-50">{latestReading.month} {latestReading.year}</p>
              </div>
            </div>
            {latestReading.note && (
              <p className="mt-4 text-sm bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800">
                ⚠️ {latestReading.note}
              </p>
            )}
          </div>
        )}

        {waterConfig.hasBore && (
          <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
            <h2 className="text-lg font-semibold text-dark mb-3">How to Measure</h2>
            <p className="text-sm text-dark opacity-70 whitespace-pre-line">{measurementMethod}</p>
          </div>
        )}

        {waterConfig.hasBore && (
          <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
            <h2 className="text-lg font-semibold text-dark mb-4">Historical Readings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-light">
                    <th className="text-left py-2 pr-4 text-dark opacity-50 font-medium">Year</th>
                    {months.map(m => (
                      <th key={m} className="text-center py-2 px-1 text-dark opacity-50 font-medium">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from(new Set(boreReadings.map(r => r.year)))
                    .sort((a, b) => b - a)
                    .map(year => (
                      <tr key={year} className="border-b border-light hover:bg-light/50">
                        <td className="py-2 pr-4 font-medium text-dark">{year}</td>
                        {months.map(month => {
                          const reading = boreReadings.find(r => r.year === year && r.month === month)
                          return (
                            <td key={month} className="text-center py-2 px-1">
                              {reading ? (
                                <span className="text-primary font-medium" title={reading.note || ''}>
                                  {reading.depth}
                                </span>
                              ) : (
                                <span className="text-dark opacity-20">—</span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {waterConfig.hasBore && (
          <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
            <h2 className="text-lg font-semibold text-dark mb-3">Who to Call</h2>
            <p className="font-medium text-dark">{waterConfig.boreContactName}</p>
            <p className="text-sm text-dark opacity-60 mt-1">{waterConfig.boreContactNote}</p>
          </div>
        )}

      </div>

      <footer className="text-center text-sm text-dark opacity-40 py-8">
        {config.propertyName} · {config.location.region}
      </footer>
    </main>
  )
}
