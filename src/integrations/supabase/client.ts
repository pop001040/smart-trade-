// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://slttphujlobuvktklmxq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsdHRwaHVqbG9idXZrdGtsbXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNzgwMzAsImV4cCI6MjA1NTY1NDAzMH0.9aTwTCLDDR0IFA9ykGlN3Sy7_QRlkqOYPYSeZbfuPwc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);