const supabase = require('../../shared/utils/supabaseClient');
const supabaseAuthClient = require('../../shared/utils/supabaseAuthClient');
const db = require('../../shared/utils/db');

const ADMIN_EMAILS = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : [];

async function register({ email, password, fullName }) {
  const { data, error } = await supabaseAuthClient.auth.signUp({ email, password });
  if (error) throw error;
  const user = data.user;
  if (user) {
    const role = ADMIN_EMAILS.includes(email) ? 'admin' : 'user';
    if (process.env.DATABASE_URL || process.env.DB_HOST) {
      await db.query(
        'INSERT INTO users (id, email, full_name, role) VALUES ($1, $2, $3, $4)',
        [user.id, email, fullName, role]
      );
    } else {
      const { error: insertError } = await supabase
        .from('users')
        .insert({ id: user.id, email, full_name: fullName, role });
      if (insertError) throw insertError;
    }
  }
  return user;
}

async function login({ email, password }) {
  const { data, error } = await supabaseAuthClient.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

module.exports = { register, login };
