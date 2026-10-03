import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import AdminDashboardView from "@/app/admin/dashboard-view";
import { Project, Review } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let adminUser;
  let supabaseClient;

  try {
    const { supabase, user } = await requireAdmin();
    adminUser = user;
    supabaseClient = supabase;
  } catch (err: unknown) {
    if ((err as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    redirect("/admin/login");
  }

  // Fetch all projects (including hidden ones) ordered by sort_order
  const { data: projectsData } = await supabaseClient
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  // Fetch all reviews (including hidden ones) ordered by sort_order
  const { data: reviewsData } = await supabaseClient
    .from("reviews")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const projects = (projectsData as Project[]) || [];
  const reviews = (reviewsData as Review[]) || [];

  return (
    <AdminDashboardView
      initialProjects={projects}
      initialReviews={reviews}
      adminEmail={adminUser.email || "creativeorbitinfo@gmail.com"}
    />
  );
}
