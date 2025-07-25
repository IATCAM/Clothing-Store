import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svczavbyutkupubkbmba.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2Y3phdmJ5dXRrdXB1YmtibWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODkzNDMsImV4cCI6MjA2ODk2NTM0M30.xqQcHgzrDQXq0ub_3p0yFqjC5zknzTWk3hvMdWMNyQs';

export const supabase = createClient(supabaseUrl, supabaseKey);