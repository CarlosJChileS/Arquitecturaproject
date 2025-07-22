const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'http://localhost:54321';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'local-anon-key';

module.exports = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
