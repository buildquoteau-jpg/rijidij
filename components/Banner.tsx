// 📋 TEMPLATE — structure stays the same for every customer
// 🔧 Customer just uploads their own photo via the edit sidebar

interface BannerProps {
  imageUrl?: string
  propertyName: string
  tagline: string
}

export default function Banner({ imageUrl, propertyName, tagline }: BannerProps) {
  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden bg-primary">
      {/* Photo — object-fit cover means any landscape photo works perfectly */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={propertyName}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark overlay so white text reads over any photo */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Property name and tagline */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide drop-shadow-lg">
          {propertyName}
        </h1>
        <p className="mt-3 text-lg md:text-xl opacity-90 drop-shadow">
          {tagline}
        </p>
      </div>
    </div>
  )
}
