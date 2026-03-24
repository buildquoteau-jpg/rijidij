'use client'
import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — Gallery page with public and private sections
// 🔧 BUILDER: Add initial photos from the visit
// 👤 OWNER: Upload photos via the edit sidebar — choose public or private for each

interface Photo {
  url: string
  caption: string
  date?: string
  isPrivate: boolean
  category?: 'property' | 'garden' | 'wildlife' | 'seasons' | 'people' | 'archival'
}

// 🔧 REPLACE with actual photos
// isPrivate: false = anyone can see it (nature, land, seasons)
// isPrivate: true  = login required (family, gatherings, personal)
const photos: Photo[] = [
  { url: '/placeholder.jpg', caption: 'A beautiful view of the property', date: '2025-01', isPrivate: false, category: 'property' },
  { url: '/placeholder.jpg', caption: 'Family gathering — private', date: '2025-01', isPrivate: true, category: 'people' },
]

// For now showing all — auth will filter private ones after Supabase setup
const publicPhotos = photos.filter(p => !p.isPrivate)
const privatePhotos = photos.filter(p => p.isPrivate)

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

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">

        {/* Public gallery */}
        <div>
          <h2 className="text-lg font-semibold text-dark mb-4">The Property</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {publicPhotos.map((photo, i) => (
              <PhotoCard key={i} photo={photo} />
            ))}
          </div>
        </div>

        {/* Private gallery — shown only when logged in */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-dark">Family & Private</h2>
            <span className="text-xs bg-light text-secondary px-2 py-0.5 rounded-full border border-light">private</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {privatePhotos.map((photo, i) => (
              <PhotoCard key={i} photo={photo} />
            ))}
            {privatePhotos.length === 0 && (
              <div className="col-span-3 rounded-2xl border border-dashed border-light p-8 text-center">
                <p className="text-sm text-dark opacity-40">Private photos will appear here after login</p>
              </div>
            )}
          </div>
        </div>

      </div>

      <footer className="text-center text-sm text-dark opacity-40 py-8">
        {config.propertyName} · {config.location.region}
      </footer>
    </main>
  )
}

function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <div className="group rounded-xl overflow-hidden bg-white shadow-sm border border-light">
      <div className="aspect-square bg-light flex items-center justify-center overflow-hidden">
        <img
          src={photo.url}
          alt={photo.caption}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
  )
}
