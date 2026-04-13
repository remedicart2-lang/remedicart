import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if valid URL
const isValidUrl = envUrl && envUrl.startsWith('http');
const isInvalidKey = !envKey || envKey === 'your_supabase_anon_key';

if (!isValidUrl || isInvalidKey) {
  console.warn(
    '⚠️ Supabase env vars not properly configured. Add valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
  );
}

const supabaseUrl = isValidUrl ? envUrl : 'https://placeholder.supabase.co';
const supabaseAnonKey = isInvalidKey ? 'placeholder-anon-key' : envKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

