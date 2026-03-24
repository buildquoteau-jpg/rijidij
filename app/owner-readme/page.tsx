'use client'
import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — Owner Notes page (private, login required)
// 🔧 BUILDER: Fill in ALL fields before handover
// This page contains everything the owner or a future engineer needs

// 🔧 REPLACE with actual credentials before handover
const ownerNotes = {
  gmail: {
    address: 'propertyname@gmail.com',
    hint: 'Password hint goes here',
  },
  github: {
    repoUrl: 'https://github.com/username/repo-name',
    username: 'github-username',
  },
  vercel: {
    dashboardUrl: 'https://vercel.com/username/project-name',
    projectName: 'project-name',
  },
  supabase: {
    dashboardUrl: 'https://supabase.com/dashboard/project/project-id',
    projectName: 'project-name',
  },
  domain: {
    registrar: 'Namecheap',
    domainName: 'propertydomain.com.au',
    loginUrl: 'https://namecheap.com',
    username: 'namecheap-username',
    hint: 'Password hint goes here',
    renewsOn: 'Month Year',
  },
  sitePassword: {
    hint: 'Password hint for the site login',
  },
  notes: `Add any extra notes here about this specific setup.
Things to remember, quirks, who set it up, when.`,
  southwestStoryContact: 'your@email.com',
}

export default function OwnerReadmePage() {
  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">🔑</div>
          <h1 className="text-3xl font-bold">Owner Notes</h1>
          <p className="mt-2 opacity-75">Credentials, accounts and handover information</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-800 text-sm">
          🔒 This page is private. Keep this information secure and do not share the link.
        </div>

        {/* Gmail */}
        <Section title="Gmail Account" emoji="📧">
          <Field label="Email" value={ownerNotes.gmail.address} />
          <Field label="Password hint" value={ownerNotes.gmail.hint} />
        </Section>

        {/* GitHub */}
        <Section title="GitHub" emoji="💾">
          <Field label="Username" value={ownerNotes.github.username} />
          <Field label="Repo" value={ownerNotes.github.repoUrl} isLink />
        </Section>

        {/* Vercel */}
        <Section title="Vercel (Hosting)" emoji="▲">
          <Field label="Project" value={ownerNotes.vercel.projectName} />
          <Field label="Dashboard" value={ownerNotes.vercel.dashboardUrl} isLink />
        </Section>

        {/* Supabase */}
        <Section title="Supabase (Database)" emoji="🗄️">
          <Field label="Project" value={ownerNotes.supabase.projectName} />
          <Field label="Dashboard" value={ownerNotes.supabase.dashboardUrl} isLink />
        </Section>

        {/* Domain */}
        <Section title="Domain Name" emoji="🌐">
          <Field label="Domain" value={ownerNotes.domain.domainName} />
          <Field label="Registrar" value={ownerNotes.domain.registrar} />
          <Field label="Login" value={ownerNotes.domain.loginUrl} isLink />
          <Field label="Username" value={ownerNotes.domain.username} />
          <Field label="Password hint" value={ownerNotes.domain.hint} />
          <Field label="Renews" value={ownerNotes.domain.renewsOn} />
        </Section>

        {/* Site login */}
        <Section title="Site Login" emoji="🔐">
          <Field label="Password hint" value={ownerNotes.sitePassword.hint} />
        </Section>

        {/* Notes */}
        {ownerNotes.notes && (
          <Section title="Notes" emoji="📝">
            <p className="text-sm text-dark opacity-70 whitespace-pre-line">{ownerNotes.notes}</p>
          </Section>
        )}

        {/* Support */}
        <Section title="Southwest Story Support" emoji="🌿">
          <Field label="Email" value={ownerNotes.southwestStoryContact} />
          <p className="text-sm text-dark opacity-50 mt-2">
            Get in touch if you need help with your website or want to add new features.
          </p>
        </Section>

      </div>

      <footer className="text-center text-sm text-dark opacity-40 py-8">
        {config.propertyName} · {config.location.region}
      </footer>
    </main>
  )
}

function Section({ title, emoji, children }: { title: string, emoji: string, children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-light p-6">
      <h2 className="text-lg font-semibold text-dark mb-4">{emoji} {title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Field({ label, value, isLink }: { label: string, value: string, isLink?: boolean }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-sm text-dark opacity-40 w-32 flex-shrink-0">{label}</span>
      {isLink ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline break-all">{value}</a>
      ) : (
        <span className="text-sm text-dark font-medium break-all">{value}</span>
      )}
    </div>
  )
}
