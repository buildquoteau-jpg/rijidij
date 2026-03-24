import Link from 'next/link'

interface PageTileProps {
  title: string
  description: string
  emoji: string
  href: string
  isPrivate?: boolean
}

export default function PageTile({ title, description, emoji, href, isPrivate }: PageTileProps) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-2xl shadow-sm border border-light hover:shadow-md hover:border-secondary transition-all duration-200 p-6 group"
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{emoji}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-dark group-hover:text-primary transition-colors">
              {title}
            </h2>
            {isPrivate && (
              <span className="text-xs bg-light text-secondary px-2 py-0.5 rounded-full">
                private
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-dark opacity-60">{description}</p>
        </div>
      </div>
    </Link>
  )
}
