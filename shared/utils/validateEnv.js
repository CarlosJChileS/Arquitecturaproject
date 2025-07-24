function validateEnv() {
  const requiredVars = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'ADMIN_EMAILS',
    'ADMIN_ACCOUNTS',
    'STRIPE_SECRET_KEY',
    'PAYPAL_CLIENT_ID',
    'PAYPAL_CLIENT_SECRET'
  ];

  if (!process.env.DATABASE_URL) {
    requiredVars.push('DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_PORT');
  }
  for (const v of requiredVars) {
    if (!process.env[v]) {
      throw new Error(`Missing required environment variable ${v}`);
    }
  }
  const adminEmails = process.env.ADMIN_EMAILS.split(',').map(e => e.trim()).filter(Boolean);
  if (adminEmails.length < 3) {
    throw new Error('ADMIN_EMAILS must contain at least three emails');
  }
}

module.exports = validateEnv;
