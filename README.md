# Southwest Story 🌿
### Personal Property Websites for Southwest WA Acreage Owners

---

## What Is This?

Southwest Story builds beautiful, personal websites for people who own rural acreage in the Southwest of Western Australia. Think 3-10 acres with an orchard, a bore, a veggie patch, and a story worth keeping.

Each website captures the life of a property - its stories, its land, its water, its wildlife - and makes it easy for the owner to keep it updated themselves, forever.

---

## Privacy First

Southwest Story sites are **private by default**. This means:

- Search engines (Google, Bing etc) are blocked from indexing the site via `robots.txt` and `noindex` meta tags
- Individual pages can be set to **Public** or **Private**
- The whole site can be password protected
- Owners choose to share - nothing is exposed without their knowledge

**Important advice for customers:**
- Do not photograph unapproved structures
- Keep the Maps page private (default)
- The site is not linked from anywhere public
- Share the password only with people you trust

To allow search engine indexing, set `noIndex: false` in `config.ts`. This should only be done at the owner's explicit request.

---

## The Business Model

**One-time build fee: $500 AUD**

Includes:
- 1 hour onsite visit (cuppa tea, property walk, story gathering)
- Account setup together with the owner on their phone
- 9 hours of build and customisation
- Fully personalised website with the owner's colours, photos and content
- Private `/owner-readme` page with all account credentials
- Handover of all accounts — owner keeps everything

**Optional add-ons:**
- Drone footage package (by Geoff): $150
- Hand-drawn illustrated property map (print + web): $100

**Ongoing costs to the owner: ~$15/year** (domain name only - hosting is free)

---

## The Tech Stack

| Service    | Purpose              | Cost             |
|------------|----------------------|------------------|
| GitHub     | Code repository      | Free             |
| Vercel     | Hosting & deployment | Free (hobby)     |
| Supabase   | Database & auth      | Free (1 project) |
| Namecheap  | Domain name          | ~$15/year        |

---

## How Each Site Is Built

### The Cloning Workflow

Every Southwest Story site is built from this same template repo. To create a new customer site:

1. Fork this repo and rename it to the customer's property name (eg. `hillside-farm`)
2. Update `theme.ts` with their 3 brand colours
3. Update `config.ts` with their property name, lat/long, contact email and page settings
4. Connect to their fresh Supabase project
5. Deploy to their Vercel account
6. Point their domain at Vercel
7. Set their login password in Supabase Auth
8. Populate the `/owner-readme` page with all credentials
9. Hand over - done

### Files to Change Per Customer
```
theme.ts    <- 3 hex colour codes
config.ts   <- property name, lat/long, owner email, privacy, page visibility
```

That is it. Everything else is template.

---

## Colour System

Each site has exactly 3 brand colours defined in `theme.ts`:
```js
const theme = {
  primary:   '#2D5A27',  // main brand colour - nav, headings, buttons
  secondary: '#8B6914',  // accent colour - highlights, borders, labels
  accent:    '#C4472A',  // pop colour - icons, hover states, alerts
  light:     '#F9F6F0',  // warm off-white - page backgrounds (template)
  dark:      '#1C1C1A',  // near black - body text (template)
}
```

Ask the customer for 3 colours they love - or pick from their surroundings (sky, soil, foliage, bark, stone). Tailwind reads from this file so the whole site recolours automatically.

---

## Site Structure
```
/               <- Home (property name, banner, location, page tiles)
/gallery        <- Photo gallery with upload
/our-story      <- Family and property history
/orchard        <- What blooms when, jobs by season
/water          <- Bore data, tank levels, rainfall log
/wildlife       <- Sightings log, bird list, pest species
/maps           <- Irrigation maps, property maps (private by default)
/calendar       <- Visitors, firebreaks, rates, reminders (private)
/the-area       <- Local knowledge, landmarks, things to do (optional)
/owner-readme   <- Private: credentials and handover notes
```

### Page Privacy

Each page can be set to Public or Private in `config.ts`. The whole site can also be set to private. Owners can toggle this themselves from the edit sidebar. All pages default to private until the owner explicitly makes them public.

---

## The Edit Sidebar

Every page has a small lock icon in the corner. Owners click it, enter their password, and a sidebar slides out with:

- Edit fields for that page's content
- Photo and file upload
- Public / Private toggle for that page
- Save button

No CMS. No admin dashboard. No separate URL to remember. Edit the page you are on, right where you are.

---

## Account Setup (Do This With The Customer Onsite)

Walk through this checklist together over the cuppa:

- [ ] Create a Gmail account on their phone: `[propertyname]@gmail.com`
- [ ] Write the Gmail password somewhere safe
- [ ] Create a GitHub account with that Gmail
- [ ] Create a Vercel account with that Gmail
- [ ] Create a Supabase account with that Gmail
- [ ] Write all logins in the `/owner-readme` page before handover

All accounts are created on the customer's phone with their phone number. These accounts belong to them from day one.

---

## The Owner Notes Page

This private page lives inside the website and contains everything the owner (or a future engineer) needs:

- Gmail address and hint
- GitHub repo URL
- Vercel project URL and dashboard link
- Supabase project URL and dashboard link
- Domain registrar login details
- Site login password
- Notes about the setup
- Southwest Story contact details for support

---

## The Data Layer (Future)

Once enough properties are running, owners can opt in to sharing anonymous land data with local councils or NRM groups:

- Bore water levels by season
- Rainfall records
- Wildlife sightings (especially threatened species like Red-tailed Black Cockatoo)
- Orchard flowering times
- Pest species presence

Data is anonymised to region level - never tied to a specific address. Councils may eventually offer a rebate or incentive for participation.

---

## Adding New Pages

To add an optional page (eg. Chooks, Bees, Veggie Patch):

1. Copy an existing page component as a template
2. Add the route to `config.ts` with `enabled: true/false`
3. The home page tiles automatically show and hide based on config

---

## Contact

Built by Southwest Story, Dunsborough WA.
For enquiries or to commission a site, get in touch.

---

*This template repo is proprietary. Please do not redistribute.*
