import theme from '@/theme'

// 📋 TEMPLATE — structure stays the same for every customer
// 🔧 Customer uploads their own photo via the edit sidebar
// 🔧 Fonts come from theme.ts

interface BannerProps {
  imageUrl?: string
  imagePosition?: string
  propertyName: string
  tagline: string
}

export default function Banner({ imageUrl, imagePosition = '50% 50%', propertyName, tagline }: BannerProps) {
  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden bg-primary">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={propertyName}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <h1
          style={{ fontFamily: theme.headingFont }}
          className="text-5xl md:text-7xl font-normal tracking-wide drop-shadow-lg"
        >
          {propertyName}
        </h1>
        <p
          style={{ fontFamily: theme.taglineFont, fontSize: '1.6rem' }}
          className="mt-3 opacity-90 drop-shadow"
        >
          {tagline}
        </p>
      </div>
    </div>
  )
}
