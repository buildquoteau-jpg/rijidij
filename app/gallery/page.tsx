'use client'
import { useState, useEffect, useRef } from 'react'
import Nav from '@/components/Nav'
import EditSidebar from '@/components/EditSidebar'
import Loading from '@/components/Loading'
import config from '@/config'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth'

interface Photo {
  id?: string
  url: string
  caption: string
  photo_date: string
  category: string
  page: string
  is_private: boolean
}

export default function GalleryPage() {
  const { isOwner } = useAuth()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [newPhoto, setNewPhoto] = useState({
    caption: '',
    photo_date: '',
    category: 'property',
    is_private: false,
  })

  useEffect(() => {
    loadPhotos()
  }, [])

  const loadPhotos = async () => {
    setLoading(true)
    const query = supabase
      .from('photos')
      .select('*')
      .eq('page', 'gallery')
      .order('photo_date', { ascending: false })
    const { data } = await query
    if (data) setPhotos(data)
    setLoading(false)
  }

  const uploadPhoto = async (file: File) => {
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const filename = `gallery/${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filename, file)
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(filename)

      await supabase.from('photos').insert([{
        url: publicUrl,
        caption: newPhoto.caption || file.name,
        photo_date: newPhoto.photo_date || new Date().toISOString().split('T')[0],
        category: newPhoto.category,
        page: 'gallery',
        is_private: newPhoto.is_private,
      }])

      await loadPhotos()
      setNewPhoto({ caption: '', photo_date: '', category: 'property', is_private: false })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error(err)
    }
    setUploading(false)
  }

  const publicPhotos = photos.filter(p => !p.is_private)
  const privatePhotos = photos.filter(p => p.is_private)

  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">📷</div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="mt-2 opacity-75">Photos of the property through the seasons</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">

        {loading ? (
          <Loading message="Loading gallery..." />
        ) : (
          <>
            {/* Public gallery */}
            <div>
              <h2 className="text-lg font-semibold text-dark mb-4">The Property</h2>
              {publicPhotos.length === 0 ? (
                <div className="rounded-xl border border-dashed border-light p-8 text-center">
                  <p className="text-sm text-dark opacity-40">
                    {isOwner ? 'Click ✏️ to add your first photo' : 'No photos yet'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {publicPhotos.map((photo, i) => (
                    <PhotoCard key={i} photo={photo} />
                  ))}
                </div>
              )}
            </div>

            {/* Private gallery — only shown when logged in */}
            {isOwner && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-semibold text-dark">Family & Private</h2>
                  <span className="text-xs bg-light text-secondary px-2 py-0.5 rounded-full border border-light">
                    private
                  </span>
                </div>
                {privatePhotos.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-light p-8 text-center">
                    <p className="text-sm text-dark opacity-40">
                      No private photos yet — tick private when uploading
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {privatePhotos.map((photo, i) => (
                      <PhotoCard key={i} photo={photo} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
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

      <EditSidebar pageName="Gallery">
        <div className="space-y-4">
          <h3 className="font-semibold text-dark">Upload Photo</h3>
          <div>
            <label className="text-xs text-dark opacity-50 block mb-1">Caption</label>
            <input
              type="text"
              value={newPhoto.caption}
              onChange={e => setNewPhoto({...newPhoto, caption: e.target.value})}
              placeholder="eg. Sunset over the orchard"
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
          <div>
            <label className="text-xs text-dark opacity-50 block mb-1">Category</label>
            <select
              value={newPhoto.category}
              onChange={e => setNewPhoto({...newPhoto, category: e.target.value})}
              className="w-full border border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            >
              <option value="property">Property</option>
              <option value="garden">Garden</option>
              <option value="wildlife">Wildlife</option>
              <option value="seasons">Seasons</option>
              <option value="people">People</option>
              <option value="archival">Archival</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="gallery-private"
              checked={newPhoto.is_private}
              onChange={e => setNewPhoto({...newPhoto, is_private: e.target.checked})}
              className="rounded"
            />
            <label htmlFor="gallery-private" className="text-xs text-dark opacity-60">
              Private photo (family/personal)
            </label>
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
            className="w-full bg-primary text-white rounded-lg py-2.5 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : saved ? '✅ Uploaded!' : '📷 Choose Photo'}
          </button>
        </div>
      </EditSidebar>

    </main>
  )
}

function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <div className="group rounded-xl overflow-hidden bg-white shadow-sm border border-light">
      <div className="aspect-square bg-light overflow-hidden">
        <img
          src={photo.url}
          alt={photo.caption}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>
      <div className="p-2">
        <p className="text-xs text-dark font-medium truncate">{photo.caption}</p>
        <p className="text-xs text-dark opacity-30">{photo.photo_date}</p>
      </div>
    </div>
  )
}
