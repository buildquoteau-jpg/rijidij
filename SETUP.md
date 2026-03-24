# New Customer Setup Checklist
# 📋 Follow this every time you clone the repo for a new customer

## 1. Clone the repo
- Fork this repo on GitHub
- Rename it to the customer's property name eg. hillside-farm
- Clone to your Codespace

## 2. Update customer files
- [ ] theme.ts — update 3 brand colours
- [ ] config.ts — update property name, tagline, lat/long, email, page visibility

## 3. Create Supabase project
- [ ] Go to supabase.com — New Project
- [ ] Name: customer property name
- [ ] Region: Southeast Asia (Singapore) — closest to Perth
- [ ] Copy Project URL and anon key to .env.local
- [ ] SQL Editor → paste and run supabase/schema.sql
- [ ] Storage → New Bucket → name: photos → Public: on
- [ ] Authentication → Users → Add User → create owner login

## 4. Deploy to Vercel
- [ ] Connect GitHub repo to Vercel
- [ ] Add environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- [ ] Deploy

## 5. Domain
- [ ] Customer buys domain at Namecheap (~$15/year)
- [ ] Point domain DNS to Vercel
- [ ] Add domain in Vercel project settings

## 6. Populate content
- [ ] Add initial bore readings from owner's records
- [ ] Add orchard tree list
- [ ] Add property history timeline
- [ ] Upload any photos provided
- [ ] Fill in Owner Notes page with all credentials

## 7. Handover
- [ ] Show owner the lock icon and edit sidebar
- [ ] Walk them through adding a bore reading
- [ ] Walk them through uploading a photo
- [ ] Ask them to change their password
- [ ] You are done!
