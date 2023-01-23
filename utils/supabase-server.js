import { headers, cookies } from "next/headers"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const createClient = () => createServerComponentSupabaseClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    headers, cookies
})