import { createClient } from '@supabase/supabase-js';

// Insira suas credenciais do Supabase aqui
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Fallback se as chaves estiverem vazias para evitar crash no boot do app
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
