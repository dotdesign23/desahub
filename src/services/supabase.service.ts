import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
NEXT_PUBLIC_SUPABASE_URL="https://sprfdvmjzqefrhotydvi.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcmZkdm1qenFlZnJob3R5ZHZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwOTg1NTcsImV4cCI6MjA0NzY3NDU1N30.fXKJ0ywUSHu1wyRvv7tg4PNR2KVEV5ZeKBcRoFDaE7k"