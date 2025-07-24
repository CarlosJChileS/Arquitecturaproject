const subscriptions = require('../domain/subscriptions');
const supabase = require('../../shared/utils/supabaseClient');
const db = require('../../shared/utils/db');
const { addNotification } = require('./notificationsService');

async function getAllSubscriptions() {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query('SELECT * FROM subscriptions');
    return rows;
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase.from('subscriptions').select('*');
    if (error) throw error;
    return data;
  }
  return subscriptions;
}

async function getSubscription(id) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query('SELECT * FROM subscriptions WHERE id=$1', [id]);
    return rows[0] || null;
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }
  return subscriptions.find((s) => s.id === parseInt(id));
}

async function addSubscription({ userId, plan, active = true }) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query(
      'INSERT INTO subscriptions (user_id, plan_id, status) VALUES ($1,$2,$3) RETURNING *',
      [userId, plan, active ? 'active' : 'inactive']
    );
    await addNotification({ userId, message: 'Suscripción activada' });
    return rows[0];
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({ user_id: userId, plan_id: plan, status: active ? 'active' : 'inactive' })
      .single();
    if (error) throw error;
    await addNotification({ userId, message: 'Suscripción activada' });
    return data;
  }
  const subscription = { id: subscriptions.length + 1, userId, plan, active };
  subscriptions.push(subscription);
  await addNotification({ userId, message: 'Suscripción activada' });
  return subscription;
}

async function getActiveSubscriptionByUserId(userId) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query(
      'SELECT * FROM subscriptions WHERE user_id=$1 AND status=$2',
      [userId, 'active']
    );
    return rows[0] || null;
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();
    if (error) return null;
    return data;
  }
  return subscriptions.find(s => s.userId === userId && s.active) || null;
}

async function updateSubscription(id, updates) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query(
      'UPDATE subscriptions SET plan_id=$1, status=$2, start_date=$3, end_date=$4 WHERE id=$5 RETURNING *',
      [updates.plan, updates.active ? 'active' : 'inactive', updates.startDate, updates.endDate, id]
    );
    if (rows[0] && rows[0].user_id) {
      await addNotification({ userId: rows[0].user_id, message: 'Suscripción actualizada' });
    }
    return rows[0];
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        plan_id: updates.plan,
        status: updates.active ? 'active' : 'inactive',
        start_date: updates.startDate,
        end_date: updates.endDate,
      })
      .eq('id', id)
      .single();
    if (error) throw error;
    if (data && data.user_id) {
      await addNotification({ userId: data.user_id, message: 'Suscripción actualizada' });
    }
    return data;
  }
  const sub = subscriptions.find((s) => s.id === parseInt(id));
  if (!sub) throw new Error('Subscription not found');
  Object.assign(sub, updates);
  await addNotification({ userId: sub.userId, message: 'Suscripción actualizada' });
  return sub;
}

async function deleteSubscription(id) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query('DELETE FROM subscriptions WHERE id=$1 RETURNING id', [id]);
    return rows[0] || { id };
  } else if (process.env.SUPABASE_URL) {
    const { error } = await supabase.from('subscriptions').delete().eq('id', id);
    if (error) throw error;
    return { id };
  }
  const index = subscriptions.findIndex((s) => s.id === parseInt(id));
  if (index === -1) throw new Error('Subscription not found');
  const [deleted] = subscriptions.splice(index, 1);
  return deleted;
}

module.exports = {
  getAllSubscriptions,
  getSubscription,
  addSubscription,
  getActiveSubscriptionByUserId,
  updateSubscription,
  deleteSubscription,
};
