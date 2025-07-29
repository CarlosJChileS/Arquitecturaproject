const supabase = require('./supabaseClient');

async function checkSupabaseConnection() {
  try {
    const { error } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    if (error) {
      throw error;
    }
    return true;
  } catch (err) {
    console.error('Error connecting to Supabase:', err.message);
    return false;
  }
}

module.exports = checkSupabaseConnection;
