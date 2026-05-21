import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hrtynofmjcumuanjvpxz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhydHlub2ZtamN1bXVhbmp2cHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5MTQ3MDMsImV4cCI6MjA5NDQ5MDcwM30.C5DqvCITuTGAfaHTwccTfBg_r2ZSITPqRcTmmBpcIw0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
