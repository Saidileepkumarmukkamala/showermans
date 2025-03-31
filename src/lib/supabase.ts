
import { createClient } from '@supabase/supabase-js';

// Get these from your Supabase project settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if we have the required credentials
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
}

// Create a dummy client for development if credentials are missing
const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createDummyClient();

// Create a dummy client that won't throw errors but won't work with the real API
function createDummyClient() {
  console.warn('Using dummy Supabase client. Authentication and database features will not work.');
  
  return {
    auth: {
      signInWithPassword: () => Promise.resolve({ error: new Error('No Supabase credentials'), data: { user: null, session: null } }),
      signUp: () => Promise.resolve({ error: new Error('No Supabase credentials'), data: { user: null, session: null } }),
      signInWithOAuth: () => Promise.resolve({ error: new Error('No Supabase credentials') }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: new Error('No Supabase credentials') }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({ single: () => Promise.resolve({ data: null, error: new Error('No Supabase credentials') }) }),
      insert: () => Promise.resolve({ error: new Error('No Supabase credentials'), data: null }),
      update: () => Promise.resolve({ error: new Error('No Supabase credentials'), data: null }),
      delete: () => Promise.resolve({ error: new Error('No Supabase credentials'), data: null }),
      eq: () => ({ single: () => Promise.resolve({ data: null, error: new Error('No Supabase credentials') }) }),
    }),
  };
}

export { supabase };
