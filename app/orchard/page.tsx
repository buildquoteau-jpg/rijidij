'use client'
import { useState, useEffect, useRef } from 'react'
import Nav from '@/components/Nav'
import EditSidebar from '@/components/EditSidebar'
import config from '@/config'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth'

// 📋 TEMPLATE — Orchard page with gallery and harvest records
// 🔧 BUILDER: Fill in trees list from onsite visit
// 👤 OWNER: Add photos and harvest records via edit sidebar

interface Photo {
  id?: string
  url: string
  caption: string
  photo_date: string
  category: string
  page: string
  is_private: boolean
}

interface HarvestRecord {
  id?: string
  year: number
  month: string
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

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function OrchardPage() {
  const { isOwner } = useAuth()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [records, setRecords] = useState<HarvestRecord[]>([])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const [newRecord, setNewRecord] = useState({
    month: 'Jan',
    year: new Date().getFullYear(),
    produce: '',
    note: '',
  })

  const [newPhoto, setNewPhoto] = useState({
    caption: '',
    photo_date: '',
    is_private: false,
  })

  useEffect(() => {
    loadPhotos()
    loadRecords()
  }, [])

  const loadPhotos = async () => {
    const { data } = await supabase
      .from('photos')
      .select('*')
      .eq('page', 'orchard')
      .order('photo_date', { ascending: false })
    if (data) setPhotos(data)
  }

  const loadRecords = async () => {
    const { data } = await supabase
      .from('harvest_records')
      .select('*')
      .order('year', { ascending: false })
    if (data && data.length > 0) setRecords(data)
  }

  const uploadPhoto = async (file: File) => {
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const filename = `orchard/${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filename, file)
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(filename)

      const { error: dbError } = await supabase
        .from('photos')
        .insert([{
          url: publicUrl,
          caption: newPhoto.caption || file.name,
          photo_date: newPhoto.photo_date || new Date().toISOString().split('T')[0],
          category: 'orchard',
          page: 'orchard',
          is_private: newPhoto.is_private,
        }])
      if (dbError) throw dbError

      await loadPhotos()
      setNewPhoto({ caption: '', photo_date: '', is_private: false })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error(err)
    }
    setUploading(false)
  }

  const saveRecord = async () => {
    if (!newRecord.produce) return
    setSaving(true)
    const { error } = await supabase
      .from('harvest_records')
      .insert([newRecord])
    if (!error) {
      await loadRecords()
      setNewRecord({ month: 'Jan', year: new Date().getFullYear(), produce: '', note: '' })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }

  const years = Array.from(new Set(records.map(r => r.year))).sort((a, b) => b - a)

  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">🍊</div>
          <h1 className="text-3xl font-bold">Orchard</h1>
          <p className="mt-2 opacity-75">Trees, photos and harvest records</p>
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

        {/* Orchard gallery */}
        <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
          <h2 className="text-lg font-semibold text-dark mb-4">Orchard Gallery</h2>
          {photos.length === 0 ? (
            <div className="rounded-xl border border-dashed border-light p-8 text-center">
              <p className="text-sm text-dark opacity-40">
                {isOwner ? 'Click the ✏️ button to add your first orchard photo' : 'No photos yet'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {photos.map((photo, i) => (
                <div key={i} className="group rounded-xl overflow-hidden border border-light">
                  <div className="aspect-square bg-light overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-xs text-dark font-medium truncate">{photo.caption}</p>
                    <p className="text-xs text-dark opacity-40">{photo.photo_date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Harvest records table */}
        {records.length > 0 && (
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
                        const recs = records.filter(r => r.year === year && r.month === month)
                        return (
                          <td key={month} className="text-center py-3 px-2">
                            {recs.length > 0 ? (
                              <span
                                className="text-primary text-lg cursor-help"
                                title={recs.map(r => r.produce + (r.note ? ' — ' + r.note : '')).join(', ')}
                              >
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
        )}

        {/* Seasonal jobs */}
        <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
          <h2 className="text-lg font-semibold text-dark mb-4">Seasonal Jobs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {months.map(month => (
              <div key={month} className="rounded-xl border border-light p-3">
                <p className="text-sm font-semibold text-primary">{month}</p>
                <p className="text-xs text-dark opacity-40 mt-1">
                  {/* 🔧 BUILDER: Add seasonal jobs per month */}
                  Add jobs here
                </p>
              </div>
            ))}
          </div>
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

      {/* Edit Sidebar */}
      <EditSidebar pageName="Orchard">
        <div className="space-y-6">

          {/* Upload photo */}
          <div className="space-y-3">
            <h3 className="font-semibold text-dark">Add Photo</h3>
            <div>
              <label className="text-xs text-dark opacity-50 block mb-1">Caption</label>
              <input
                type="text"
                value={newPhoto.caption}
                onChange={e => setNewPhoto({...newPhoto, caption: e.target.value})}
                placeholder="eg. Almond blossom August"
                className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs text-dark opacity-50 block mb-1">
                Date (can backdate for old photos)
              </label>
              <input
                type="date"
                value={newPhoto.photo_date}
                onChange={e => setNewPhoto({...newPhoto, photo_date: e.target.value})}
                className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="private"
                checked={newPhoto.is_private}
                onChange={e => setNewPhoto({...newPhoto, is_private: e.target.checked})}
                className="rounded"
              />
              <label htmlFor="private" className="text-xs text-dark opacity-60">Private photo</label>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) uploadPhoto(file)
              }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full bg-secondary text-white rounded-lg py-2.5 text-sm font-medium hover:bg-secondary/90 transition disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : saved ? '✅ Saved!' : '📷 Choose Photo'}
            </button>
          </div>

          <div className="border-t border-light pt-6 space-y-3">
            <h3 className="font-semibold text-dark">Add Harvest Record</h3>
            <div>
              <label className="text-xs text-dark opacity-50 block mb-1">Month</label>
              <select
                value={newRecord.month}
                onChange={e => setNewRecord({...newRecord, month: e.target.value})}
                className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              >
                {months.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-dark opacity-50 block mb-1">Year</label>
              <input
                type="number"
                value={newRecord.year}
                onChange={e => setNewRecord({...newRecord, year: parseInt(e.target.value)})}
                className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs text-dark opacity-50 block mb-1">What was harvested</label>
              <input
                type="text"
                value={newRecord.produce}
                onChange={e => setNewRecord({...newRecord, produce: e.target.value})}
                placeholder="eg. Mariposa Plums, Almonds"
                className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs text-dark opacity-50 block mb-1">Note (optional)</label>
              <textarea
                value={newRecord.note}
                onChange={e => setNewRecord({...newRecord, note: e.target.value})}
                placeholder="Weight, quality, notes"
                rows={2}
                className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>
            <button
              onClick={saveRecord}
              disabled={saving || !newRecord.produce}
              className="w-full bg-primary text-white rounded-lg py-2.5 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : saved ? '✅ Saved!' : '+ Add Record'}
            </button>
          </div>

        </div>
      </EditSidebar>

    </main>
  )
}
