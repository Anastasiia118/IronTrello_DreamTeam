import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://app.supabase.com/project/lqpzibsnduferkxfczdq'
const supabaseKey = process.env.VITE_SUPABASE_APP
export const supabase = createClient(supabaseUrl, supabaseKey)

