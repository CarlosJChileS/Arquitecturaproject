const plans = require('../domain/plans');
const supabase = require('../../shared/utils/supabaseClient');
const db = require('../../shared/utils/db');

async function getAllPlans() {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query('SELECT * FROM plans');
    return rows;
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase.from('plans').select('*');
    if (error) throw error;
    return data;
  }
  return plans;
}

async function getPlanById(id) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query('SELECT * FROM plans WHERE id=$1', [id]);
    return rows[0] || null;
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase.from('plans').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }
  return plans.find(p => p.id === parseInt(id, 10)) || null;
}

async function addPlan({ name, price, period, description }) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query(
      'INSERT INTO plans (name, price, period, description) VALUES ($1,$2,$3,$4) RETURNING *',
      [name, price, period, description]
    );
    return rows[0];
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase
      .from('plans')
      .insert({ name, price, period, description })
      .single();
    if (error) throw error;
    return data;
  }
  const plan = { id: plans.length + 1, name, price, period, description };
  plans.push(plan);
  return plan;
}

async function updatePlan(id, { name, price, period, description }) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query(
      'UPDATE plans SET name=$1, price=$2, period=$3, description=$4 WHERE id=$5 RETURNING *',
      [name, price, period, description, id]
    );
    return rows[0];
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase
      .from('plans')
      .update({ name, price, period, description })
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }
  const plan = plans.find(p => p.id === parseInt(id, 10));
  if (!plan) return null;
  if (name !== undefined) plan.name = name;
  if (price !== undefined) plan.price = price;
  if (period !== undefined) plan.period = period;
  if (description !== undefined) plan.description = description;
  return plan;
}

async function deletePlan(id) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    await db.query('DELETE FROM plans WHERE id=$1', [id]);
    return true;
  } else if (process.env.SUPABASE_URL) {
    const { error } = await supabase.from('plans').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
  const index = plans.findIndex(p => p.id === parseInt(id, 10));
  if (index === -1) return false;
  plans.splice(index, 1);
  return true;
}

module.exports = {
  getAllPlans,
  getPlanById,
  addPlan,
  updatePlan,
  deletePlan
};
