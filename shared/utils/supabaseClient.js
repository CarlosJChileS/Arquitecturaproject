const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'http://localhost:54321';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'local-anon-key';

// Singleton pattern for the Supabase client so a single
// instance is reused across the entire application.
class SupabaseSingleton {
  constructor() {
    if (!SupabaseSingleton.instance) {
      SupabaseSingleton.instance = createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
      );
    }
  }

  getInstance() {
    return SupabaseSingleton.instance;
  }
}

// Export the single client instance
module.exports = new SupabaseSingleton().getInstance();
