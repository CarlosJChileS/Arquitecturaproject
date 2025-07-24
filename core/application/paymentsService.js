const payments = require('../domain/payments');
const supabase = require('../../shared/utils/supabaseClient');
const db = require('../../shared/utils/db');

async function addPayment({ subscriptionId, amount, currency = 'USD', provider, status }) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query(
      'INSERT INTO payments (subscription_id, amount, currency, provider, status) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [subscriptionId, amount, currency, provider, status]
    );
    return rows[0];
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        subscription_id: subscriptionId,
        amount,
        currency,
        provider,
        status
      })
      .single();
    if (error) throw error;
    return data;
  }
  const payment = {
    id: payments.length + 1,
    subscriptionId,
    amount,
    currency,
    provider,
    status,
    paidAt: new Date()
  };
  payments.push(payment);
  return payment;
}

module.exports = { addPayment };
