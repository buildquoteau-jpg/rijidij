'use client'
import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — Gallery page
// 🔧 BUILDER: Add any initial photos provided by the owner during the visit
// 👤 OWNER: Upload new photos via the edit sidebar

interface Photo {
  url: string
  caption: string
  date?: string
  category?: 'property' | 'garden' | 'wildlife' | 'seasons' | 'people' | 'archival'
}

// 🔧 REPLACE with actual photos — urls will point to Supabase storage after setup
const photos: Photo[] = [
  { url: '/placeholder-photo.jpg', caption: 'Add your first photo here', date: '2025-01', category: 'property' },
]

const categories = ['all', 'property', 'garden', 'wildlife', 'seasons', 'people', 'archival']

export default function GalleryPage() {
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

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              className="px-3 py-1.5 rounded-full text-sm border border-light bg-white text-dark opacity-60 hover:opacity-100 hover:border-primary hover:text-primary transition capitalize"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <div key={i} className="group rounded-xl overflow-hidden bg-white shadow-sm border border-light">
              <div className="aspect-square bg-light flex items-center justify-center">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
              <div className="p-2">
                <p className="text-xs text-dark opacity-60 truncate">{photo.caption}</p>
                {photo.date && <p className="text-xs text-dark opacity-30">{photo.date}</p>}
              </div>
            </div>
          ))}
        </div>

      </div>

      <footer className="text-center text-sm text-dark opacity-40 py-8">
        {config.propertyName} · {config.location.region}
      </footer>
    </main>
  )
}
