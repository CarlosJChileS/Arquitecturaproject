const validateEnv = require('../shared/utils/validateEnv');

describe('validateEnv', () => {
  const envBackup = { ...process.env };

  afterEach(() => {
    process.env = { ...envBackup };
  });

  test('throws error when a variable is missing', () => {
    process.env = { ...envBackup };
    delete process.env.SUPABASE_URL;
    expect(() => validateEnv()).toThrow('Missing required environment variable SUPABASE_URL');
  });

  test('does not throw with all variables set', () => {
    process.env = {
      SUPABASE_URL: 'http://localhost',
      SUPABASE_ANON_KEY: 'anon',
      SUPABASE_SERVICE_ROLE_KEY: 'role',
      ADMIN_EMAILS: 'a@a.com,b@b.com,c@c.com',
      DB_HOST: 'localhost',
      DB_NAME: 'db',
      DB_USER: 'user',
      DB_PASSWORD: 'pass',
      ADMIN_ACCOUNTS: 'a@a.com:pass'
    };

    expect(() => validateEnv()).not.toThrow();
  });
});
