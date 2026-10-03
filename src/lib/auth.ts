import { createClient } from "@/lib/supabase/server";

export const ADMIN_EMAIL = "creativeorbitinfo@gmail.com";

/**
 * Server-side helper to verify that the current user is authenticated as the admin.
 * Throws an error or returns the user and supabase client.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    throw new Error("Unauthorized: Admin access required.");
  }

  return { supabase: supabase as any, user };
}
