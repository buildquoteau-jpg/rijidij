import { createClient } from '@supabase/supabase-js'
// 📋 TEMPLATE — Supabase client
// 🔧 Each customer gets their own Supabase project
// Credentials live in .env.local — never committed to GitHub
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
