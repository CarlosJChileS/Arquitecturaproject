const users = require('../domain/users');
const supabase = require('../../shared/utils/supabaseClient');
const db = require('../../shared/utils/db');

async function getUserById(id) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query(
      'SELECT id, email, full_name, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return rows[0]
      ? {
          id: rows[0].id,
          email: rows[0].email,
          fullName: rows[0].full_name,
          role: rows[0].role,
          createdAt: rows[0].created_at,
        }
      : null;
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, full_name, role, created_at')
      .eq('id', id)
      .single();
    if (error) throw error;
    return {
      id: data.id,
      email: data.email,
      fullName: data.full_name,
      role: data.role,
      createdAt: data.created_at,
    };
  }
  return users.find((u) => u.id === id);
}

module.exports = { getUserById };
