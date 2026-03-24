'use client'
import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — Orchard page
// 🔧 BUILDER: Fill in the tree list and any known fruiting records from the visit
// 👤 OWNER: Add new seasonal records via the edit sidebar

interface HarvestRecord {
  month: string
  year: number
  produce: string
  note?: string
}

interface OrchardTree {
  name: string
  variety?: string
  fruitingSeason: string
  note?: string
}

// 🔧 REPLACE with this property's actual trees
const trees: OrchardTree[] = [
  { name: 'Tree name', variety: 'Variety if known', fruitingSeason: 'Month - Month', note: 'Any notes' },
]

// 🔧 REPLACE with actual harvest records from the owner's notes
const harvestRecords: HarvestRecord[] = [
  { month: 'Jan', year: 2025, produce: 'Add produce here', note: 'Optional note' },
]

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function OrchardPage() {
  const years = Array.from(new Set(harvestRecords.map(r => r.year))).sort((a, b) => b - a)

  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">🍊</div>
          <h1 className="text-3xl font-bold">Orchard</h1>
          <p className="mt-2 opacity-75">Trees, fruiting seasons and harvest records</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">

        {/* Tree list */}
        <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
          <h2 className="text-lg font-semibold text-dark mb-4">Our Trees</h2>
          <div className="divide-y divide-light">
            {trees.map((tree, i) => (
              <div key={i} className="py-3 flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-dark">{tree.name}</p>
                  {tree.variety && <p className="text-sm text-dark opacity-50">{tree.variety}</p>}
                  {tree.note && <p className="text-sm text-secondary mt-1">{tree.note}</p>}
                </div>
                <span className="text-sm text-dark opacity-50 whitespace-nowrap">{tree.fruitingSeason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal harvest records */}
        <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
          <h2 className="text-lg font-semibold text-dark mb-4">Harvest Records</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-light">
                  <th className="text-left py-2 pr-4 text-dark opacity-50 font-medium">Year</th>
                  {months.map(m => (
                    <th key={m} className="text-center py-2 px-2 text-dark opacity-50 font-medium">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {years.map(year => (
                  <tr key={year} className="border-b border-light hover:bg-light/50">
                    <td className="py-3 pr-4 font-medium text-dark">{year}</td>
                    {months.map(month => {
                      const records = harvestRecords.filter(r => r.year === year && r.month === month)
                      return (
                        <td key={month} className="text-center py-3 px-2">
                          {records.length > 0 ? (
                            <span className="text-primary text-xs" title={records.map(r => r.produce).join(', ')}>
                              🍃
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
          <p className="text-xs text-dark opacity-40 mt-3">Hover over 🍃 to see what was harvested</p>
        </div>

        {/* Seasonal jobs */}
        <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
          <h2 className="text-lg font-semibold text-dark mb-4">Seasonal Jobs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {months.map(month => (
              <div key={month} className="rounded-xl border border-light p-3">
                <p className="text-sm font-semibold text-primary">{month}</p>
                <p className="text-xs text-dark opacity-50 mt-1">
                  {/* 🔧 BUILDER: Add seasonal jobs per month eg pruning, spraying, harvesting */}
                  Add jobs here
                </p>
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
