import { createClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: any = null;

// Lazy singleton — only instantiated when first called (not at build time).
// Default schema set to "poedagar" so all .from() calls target it directly.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSupabase(): any {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Supabase env vars are not set.");
    client = createClient(url, key, {
      db: { schema: "poedagar" },
    });
  }
  return client;
}
