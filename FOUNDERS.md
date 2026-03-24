# Southwest Story — Founders Guide 🌿
### Private business documentation — not for customers

---

## The Business in One Sentence

Southwest Story builds beautiful, personal property websites for rural acreage owners
in the Southwest of Western Australia — capturing the stories, water, wildlife and
history of the land, and making it easy for owners to keep it updated forever.

---

## Why This Works

- No competitor is doing this — it is a completely new category
- The Southwest WA acreage community is tight-knit and word spreads fast
- People deeply love their land and want to document it
- The gift voucher angle (Mother's Day, Christmas, new owners) creates natural referrals
- The data aggregation future adds a council/NRM revenue stream

---

## Pricing

| Product | Price |
|---|---|
| Website build (10 hours) | $500 AUD |
| Drone footage package (Geoff) | $150 AUD |
| Hand-drawn illustrated property map | $100 AUD |
| Gift voucher | Any denomination |

Ongoing cost to owner: ~$15/year (domain name only)
Your ongoing cost: $0 (they own all the infrastructure)

---

## The Cloning Workflow

Every new customer site is built from this template repo.
The whole process should take you about 10 hours per customer.

### Onsite visit (1 hour)
- [ ] Cuppa tea and property walk
- [ ] Gather stories for Our Family and The Land pages
- [ ] Note down tree list for Orchard page
- [ ] Ask for existing bore records, orchard records, old photos
- [ ] Together on their phone: create Gmail, GitHub, Vercel, Supabase accounts
- [ ] Write all passwords somewhere safe (you will add to Owner Notes page later)
- [ ] Take or receive photos for the banner and gallery

### Build (9 hours)
- [ ] Fork this repo → rename to property name eg. hillside-farm
- [ ] Update theme.ts — 3 hex colour codes from the property surroundings
- [ ] Update config.ts — property name, tagline, lat/long, email, page visibility
- [ ] Run supabase/schema.sql in their fresh Supabase project
- [ ] Create photos storage bucket in Supabase
- [ ] Add .env.local with their Supabase credentials
- [ ] Populate bore readings from their records
- [ ] Populate orchard tree list and any harvest records
- [ ] Add property history timeline to The Land page
- [ ] Upload banner photo and initial gallery photos
- [ ] Fill in Owner Notes page with ALL credentials
- [ ] Deploy to their Vercel account
- [ ] Point their domain at Vercel
- [ ] Test everything — login, edit sidebar, photo upload

### Handover (part of the build time)
- [ ] Show owner the lock icon and how to log in
- [ ] Walk them through adding a bore reading
- [ ] Walk them through uploading a photo
- [ ] Show them how to change their password
- [ ] Hand over — it is theirs

---

## Choosing Their 3 Colours

Ask the owner: what 3 colours do you love about this place?
Look at the surroundings together:
- The sky at dusk
- The soil colour
- The bark of the jarrahs
- The leaves of the orchard
- The water in the bore

Tools to help: coolors.co, Google image colour picker

---

## The Gift Voucher

A Southwest Story website makes a beautiful gift:
- Mother's Day — "We got Mum a website for the farm"
- Christmas — perfect for the person who has everything
- New property owners — incredible gift when someone buys a rural block
- Selling a property — hand the website over with the keys

Create simple gift vouchers as PDF cards. Print on nice paper.
Value: $500 (full build) or partial amounts toward a build.

---

## The Data Layer (Future)

Once you have 10-20 properties running:

1. Approach Shire of Augusta-Margaret River or Busselton City Council
2. Pitch: "I have X properties recording bore levels, rainfall, wildlife sightings
   and orchard data across the Southwest. Would you like access to anonymised
   regional data to inform planning decisions?"
3. Data is anonymised to region — never tied to an address
4. Council may offer a rebate or incentive to owners who opt in
5. This creates a recurring revenue stream and adds value for owners

Relevant bodies to approach:
- Shire of Augusta-Margaret River
- City of Busselton
- Think Water Capes Region
- NRM South West
- BirdLife Australia (for Red-tailed Black Cockatoo data)
- Department of Biodiversity, Conservation and Attractions

---

## Support Model

After handover you have no ongoing obligation.
But owners may contact you for:
- Help adding a new page ($50-100 depending on complexity)
- Colour or design changes ($50)
- Technical issues (free goodwill for first 30 days)

Your contact details live in the Owner Notes page of every site.

---

## Legal Protection

Every site has:
- /disclaimer — protects you from property disputes, council matters, boundary issues
- /privacy-policy — explains data handling
- /faq — sets clear expectations on ownership and costs

You are not liable for anything that happens after handover.
The disclaimer page makes this explicit.

---

## First Customer Checklist

Your own property (Rijidij) is customer zero. Use it to:
- Test the full workflow end to end
- Get your parents to test the edit sidebar (usability test)
- Take real photos for the gallery
- Enter real bore data and orchard records
- Refine anything that feels awkward

When Rijidij feels genuinely beautiful and easy to use —
that is when you are ready to approach your first paying customer.

---

*Southwest Story — Dunsborough WA*
*Built with love for the land and the people who tend it*
