import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — Disclaimer
// 🔧 Update contact email before handover

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">⚖️</div>
          <h1 className="text-3xl font-bold">Disclaimer</h1>
          <p className="mt-2 opacity-75">Important information about this website</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Personal Use Only</h2>
          <p className="text-sm text-dark opacity-60 leading-relaxed">
            This website is a personal record kept by the property owner for their own
            reference and enjoyment. It is not a legal document, not a survey, and not
            an official record of any kind. Information contained within this website
            should not be relied upon for any legal, financial or property-related purpose.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Property Boundaries & Maps</h2>
          <p className="text-sm text-dark opacity-60 leading-relaxed">
            Any maps, diagrams or boundary information shown on this website are informal
            and for personal reference only. They do not constitute a survey and should
            not be used in any property dispute, council matter, conveyancing or legal
            proceeding. For official boundary information consult a licensed surveyor
            and the relevant land titles office.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Council & Regulatory Matters</h2>
          <p className="text-sm text-dark opacity-60 leading-relaxed">
            Southwest Story and the website owner accept no responsibility for any
            council, shire or regulatory matters relating to this property. Information
            about structures, improvements, firebreaks or land use shown on this website
            does not constitute approval, certification or compliance with any local,
            state or federal regulation. Always consult your local council or relevant
            authority for official guidance.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Water & Bore Data</h2>
          <p className="text-sm text-dark opacity-60 leading-relaxed">
            Bore water readings and water data shown on this website are informal
            observations recorded by the property owner. They are not calibrated
            measurements and should not be used for any official, legal or engineering
            purpose. For official bore data contact the relevant water authority.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Wildlife Records</h2>
          <p className="text-sm text-dark opacity-60 leading-relaxed">
            Wildlife sightings recorded on this website are informal observations by
            the property owner and are not verified scientific records. Species
            identifications may be incorrect. For official wildlife or threatened
            species data consult the relevant state or federal environmental authority.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Southwest Story Liability</h2>
          <p className="text-sm text-dark opacity-60 leading-relaxed">
            Southwest Story builds and delivers websites as a service. Once a website
            is handed over to the owner, Southwest Story accepts no responsibility for
            the content published, the accuracy of information displayed, or any
            consequences arising from the use of this website. Southwest Story is not
            liable for any property dispute, council matter, neighbour dispute, legal
            proceeding or financial loss connected in any way to information contained
            on this website.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-light p-6 space-y-4">
          <h2 className="text-lg font-semibold text-dark">Accuracy of Information</h2>
          <p className="text-sm text-dark opacity-60 leading-relaxed">
            All content on this website is provided in good faith by the property owner.
            No warranty is given as to the accuracy, completeness or currency of any
            information. The property owner and Southwest Story accept no liability for
            any errors or omissions.
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
