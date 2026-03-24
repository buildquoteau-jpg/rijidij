import Nav from '@/components/Nav'
import config from '@/config'

// 📋 TEMPLATE — FAQ page
// 🔧 Update contact email and business name if needed

const faqs = [
  {
    category: 'Ownership & Accounts',
    questions: [
      {
        q: 'Who owns my website?',
        a: 'You do. From day one. All accounts — Gmail, GitHub, Vercel, Supabase and your domain name — are created in your name, on your phone, with your phone number. Southwest Story builds the site for you but hands everything over completely. We have no ongoing access unless you invite us.',
      },
      {
        q: 'Who owns my domain name?',
        a: 'You do. Your domain is registered in your name through your own account at a domain registrar (usually Namecheap or Cloudflare). You pay the annual renewal fee (~$15/year) directly to them. Southwest Story is not involved.',
      },
      {
        q: 'What happens if Southwest Story closes down?',
        a: 'Nothing changes for you. Your website lives on your own Vercel account, your data is in your own Supabase account, and your domain is yours. The site will keep running indefinitely without any involvement from us.',
      },
      {
        q: 'Can I give access to a family member or another engineer?',
        a: 'Yes. Your Owner Notes page (private, login required) contains all the account details and credentials they would need. You can share your login password with anyone you trust.',
      },
    ],
  },
  {
    category: 'Costs & Fees',
    questions: [
      {
        q: 'What are the ongoing costs?',
        a: 'Just your domain name renewal — approximately $15 AUD per year. Hosting (Vercel), your database (Supabase) and your code storage (GitHub) are all free on their hobby plans. There are no monthly fees to Southwest Story.',
      },
      {
        q: 'What does the $500 build fee include?',
        a: 'One hour onsite visit (cuppa tea, property walk, story gathering), account setup together with you, and nine hours of building and personalising your website with your colours, photos and content. It also includes your private Owner Notes page with all credentials.',
      },
      {
        q: 'Are there any hidden fees?',
        a: 'No. The one-time build fee is $500. Optional add-ons (drone footage $150, illustrated property map $100) are entirely your choice. After handover, your only ongoing cost is your domain renewal.',
      },
    ],
  },
  {
    category: 'Privacy & Security',
    questions: [
      {
        q: 'Can anyone see my website?',
        a: 'Only if you want them to. Your site is set to private by default — search engines are blocked and the site requires a password to view. You can make individual pages public (like your gallery or wildlife page) while keeping others private (like your maps or calendar).',
      },
      {
        q: 'Will my property show up in Google?',
        a: 'No. Every Southwest Story site has a robots.txt file and noindex meta tag that blocks all search engines by default. Your site will not appear in Google, Bing or any other search engine unless you explicitly ask us to change this.',
      },
      {
        q: 'Is my data secure?',
        a: 'Yes. Your data is stored in your own Supabase database with Row Level Security enabled. This means only authenticated users (people with your password) can write to your database. Public content is readable but nothing can be changed without your login.',
      },
      {
        q: 'Can Southwest Story see my private data?',
        a: 'After handover, no. Once we hand over your accounts and you change your passwords, we have no access to your site, your data or your accounts. During the build process we have access to set everything up — this is unavoidable — but handover is designed to be clean and complete.',
      },
    ],
  },
  {
    category: 'The Website',
    questions: [
      {
        q: 'Can I update the website myself?',
        a: 'Yes — that is the whole point. Every page has a small lock icon in the corner. Click it, enter your password, and a sidebar slides out where you can add bore readings, log wildlife sightings, upload photos, add calendar events and more. No technical knowledge needed.',
      },
      {
        q: 'Can I add more pages later?',
        a: 'Yes. Common optional pages include Chooks, Bees, Veggie Patch and Neighbours. Get in touch with Southwest Story and we can add new pages for a small fee, or enable pages that are already built into the template.',
      },
      {
        q: 'What if I want to change my colours or design later?',
        a: 'Colour changes are simple — just two minutes of work. Get in touch and we can update your three brand colours at any time.',
      },
      {
        q: 'Can I use this website when selling my property?',
        a: 'Yes and it can be a beautiful gift to new owners. Decades of bore data, orchard records, wildlife sightings and property history handed over with the keys. You can change the login password as part of settlement so the new owners have full access from day one.',
      },
    ],
  },
  {
    category: 'The Data Layer',
    questions: [
      {
        q: 'What is the data sharing program?',
        a: 'In the future, Southwest Story plans to offer owners the option to share anonymous land data (bore levels, rainfall, wildlife sightings, orchard records) with local councils and NRM groups. This is entirely optional and data is anonymised to region level — never tied to your address.',
      },
      {
        q: 'Will councils be able to identify my property?',
        a: 'No. If you opt in to data sharing, your data is anonymised before it leaves your site. Councils receive regional aggregate data only — never your address, your name or your specific readings.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-light">
      <Nav />

      <div className="bg-primary text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">❓</div>
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          <p className="mt-2 opacity-75">Everything you need to know about your Southwest Story website</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        {faqs.map((section, si) => (
          <div key={si}>
            <h2 className="text-lg font-bold text-primary mb-4">{section.category}</h2>
            <div className="space-y-4">
              {section.questions.map((item, qi) => (
                <div key={qi} className="bg-white rounded-2xl shadow-sm border border-light p-6">
                  <p className="font-semibold text-dark mb-2">{item.q}</p>
                  <p className="text-sm text-dark opacity-60 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
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
