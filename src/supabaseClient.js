import {createClient} from '@supabase/supabase-js';

//to be more secure save this in .env file
const supabaseURL = "https://ccsmjtmibbkkadivqvpj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjc21qdG1pYmJra2FkaXZxdnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4MjIwNDUsImV4cCI6MjAwODM5ODA0NX0.NLmEBFcaScKEDub1ac3rAQHfbNLkc8uYpoeFpVNL4Es";

export const supabase = createClient(supabaseURL, supabaseAnonKey);