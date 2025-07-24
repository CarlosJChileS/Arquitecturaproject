const categories = require('../domain/categories');
const supabase = require('../../shared/utils/supabaseClient');
const db = require('../../shared/utils/db');

async function getAllCategories() {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query('SELECT * FROM categories');
    return rows;
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    return data;
  }
  return categories;
}

module.exports = { getAllCategories };
