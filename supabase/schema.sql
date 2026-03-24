-- Southwest Story Database Schema
-- 📋 TEMPLATE — run this in a fresh Supabase project for each new customer
-- Go to: Supabase Dashboard → SQL Editor → New Query → paste → Run

-- ============================================
-- TABLES
-- ============================================

create table bore_readings (
  id uuid default gen_random_uuid() primary key,
  year integer not null,
  month text not null,
  depth text not null,
  note text,
  created_at timestamp with time zone default now()
);

create table harvest_records (
  id uuid default gen_random_uuid() primary key,
  year integer not null,
  month text not null,
  produce text not null,
  note text,
  created_at timestamp with time zone default now()
);

create table sightings (
  id uuid default gen_random_uuid() primary key,
  date date not null,
  species text not null,
  note text,
  threatened boolean default false,
  created_at timestamp with time zone default now()
);

create table calendar_events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  date date not null,
  type text not null,
  note text,
  recurring text,
  created_at timestamp with time zone default now()
);

create table photos (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  caption text,
  photo_date text,
  category text,
  page text,
  is_private boolean default false,
  created_at timestamp with time zone default now()
);

create table page_content (
  id uuid default gen_random_uuid() primary key,
  page text not null unique,
  content jsonb not null,
  updated_at timestamp with time zone default now()
);

create table timeline_events (
  id uuid default gen_random_uuid() primary key,
  chapter text not null,
  year integer,
  description text not null,
  significant boolean default false,
  created_at timestamp with time zone default now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

alter table bore_readings enable row level security;
alter table harvest_records enable row level security;
alter table sightings enable row level security;
alter table calendar_events enable row level security;
alter table photos enable row level security;
alter table page_content enable row level security;
alter table timeline_events enable row level security;

-- ============================================
-- PUBLIC READ POLICIES
-- ============================================

create policy "Public can read bore readings"
  on bore_readings for select using (true);

create policy "Public can read harvest records"
  on harvest_records for select using (true);

create policy "Public can read sightings"
  on sightings for select using (true);

create policy "Public can read timeline events"
  on timeline_events for select using (true);

create policy "Public can read public photos"
  on photos for select using (is_private = false);

create policy "Public can read page content"
  on page_content for select using (true);

-- ============================================
-- OWNER WRITE POLICIES
-- ============================================

create policy "Owner can insert bore readings"
  on bore_readings for insert with check (auth.role() = 'authenticated');

create policy "Owner can insert harvest records"
  on harvest_records for insert with check (auth.role() = 'authenticated');

create policy "Owner can insert sightings"
  on sightings for insert with check (auth.role() = 'authenticated');

create policy "Owner can insert calendar events"
  on calendar_events for insert with check (auth.role() = 'authenticated');

create policy "Owner can insert photos"
  on photos for insert with check (auth.role() = 'authenticated');

create policy "Owner can update page content"
  on page_content for all using (auth.role() = 'authenticated');

create policy "Owner can insert timeline events"
  on timeline_events for insert with check (auth.role() = 'authenticated');

create policy "Owner can read private photos"
  on photos for select using (
    is_private = false or auth.role() = 'authenticated'
  );

-- ============================================
-- STORAGE BUCKET
-- ============================================

-- Run this after creating the 'photos' bucket in Supabase Storage UI

create policy "Public can view photos"
  on storage.objects for select
  using ( bucket_id = 'photos' );

create policy "Owner can upload photos"
  on storage.objects for insert
  with check (
    bucket_id = 'photos'
    and auth.role() = 'authenticated'
  );

create policy "Owner can delete photos"
  on storage.objects for delete
  using (
    bucket_id = 'photos'
    and auth.role() = 'authenticated'
  );
