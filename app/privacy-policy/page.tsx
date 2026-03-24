import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — Privacy Policy
// 🔧 Update contact email before handover

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 opacity-75">How this website handles your information</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Overview</h2>
          <p className="text-sm text-dark opacity-60 leading-relaxed">
            This website is a private personal property website built and owned by the property owner.
            It is not a commercial service. This privacy policy explains what information is collected
            and how it is used.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">What We Collect</h2>
          <p className="text-sm text-dark opacity-60 leading-relaxed">
            This website does not collect personal information from visitors. No cookies are set,
            no tracking scripts are used, and no analytics are collected. The only data stored
            is property-related content entered by the owner (bore readings, photos, notes etc)
            which is stored in a private database belonging to the owner.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Search Engines</h2>
          <p className="text-sm text-dark opacity-60 leading-relaxed">
            This website instructs all search engines not to index its content via a robots.txt
            file and noindex meta tags. The website is not intended to appear in search results.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Data Storage</h2>
          <p className="text-sm text-dark opacity-60 leading-relaxed">
            Property data is stored in a Supabase database owned and controlled by the property
            owner. Photos are stored in Supabase storage. No data is shared with third parties
            without the explicit consent of the owner.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Owner Authentication</h2>
          <p className="text-sm text-dark opacity-60 leading-relaxed">
            The owner login uses Supabase Authentication. Login credentials are stored securely
            and are never visible to Southwest Story or any third party after handover.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Contact</h2>
          <p className="text-sm text-dark opacity-60 leading-relaxed">
            For any privacy questions contact the website owner at{' '}
            <a href={`mailto:${config.ownerEmail}`} className="text-primary underline">
              {config.ownerEmail}
            </a>
          </p>
        </div>

      </div>

      <footer className="text-center text-sm text-dark opacity-40 py-8 border-t border-light">
        <p>{config.propertyName} · {config.location.region}</p>
        <p className="mt-1 opacity-50 text-xs">
          <a href="/privacy-policy" className="underline">Privacy Policy</a>
          {' · '}
          <a href="/disclaimer" className="underline">Disclaimer</a>
          {' · '}
          <a href="/faq" className="underline">FAQ</a>
        </p>
      </footer>
    </main>
  )
}
