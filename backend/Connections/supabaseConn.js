const supabase = require("@supabase/supabase-js");

const client = supabase.createClient(
  process.env.supabaseURL,
  process.env.supabaseAnonKey
);
module.exports = client;
