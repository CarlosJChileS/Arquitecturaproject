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

async function getCategoryById(id) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query('SELECT * FROM categories WHERE id=$1', [id]);
    return rows[0] || null;
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase.from('categories').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }
  return categories.find(c => c.id === parseInt(id, 10)) || null;
}

async function addCategory({ name }) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
    return rows[0];
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase.from('categories').insert({ name }).single();
    if (error) throw error;
    return data;
  }
  const category = { id: categories.length + 1, name };
  categories.push(category);
  return category;
}

async function updateCategory(id, { name }) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query('UPDATE categories SET name=$1 WHERE id=$2 RETURNING *', [name, id]);
    return rows[0];
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase.from('categories').update({ name }).eq('id', id).single();
    if (error) throw error;
    return data;
  }
  const category = categories.find(c => c.id === parseInt(id, 10));
  if (!category) return null;
  category.name = name;
  return category;
}

async function deleteCategory(id) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    await db.query('DELETE FROM categories WHERE id=$1', [id]);
    return true;
  } else if (process.env.SUPABASE_URL) {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
  const index = categories.findIndex(c => c.id === parseInt(id, 10));
  if (index === -1) return false;
  categories.splice(index, 1);
  return true;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
};
