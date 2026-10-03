"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Project, Review } from "@/types/database";

import { requireAdmin, ADMIN_EMAIL } from "@/lib/auth";

// -----------------------------------------------------------------------------
// Auth Actions
// -----------------------------------------------------------------------------

export async function loginAdminAction(formData: FormData) {
  const email = (formData.get("email") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();

  if (!email || !password) {
    return { success: false, error: "Please enter both email and password." };
  }

  if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return {
      success: false,
      error: "Access restricted. Only creativeorbitinfo@gmail.com can log in.",
    };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.user || data.user.email !== ADMIN_EMAIL) {
      await supabase.auth.signOut();
      return {
        success: false,
        error: "Unauthorized user account.",
      };
    }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Authentication failed.",
    };
  }

  redirect("/admin");
}

export async function logoutAdminAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// -----------------------------------------------------------------------------
// Project Actions
// -----------------------------------------------------------------------------

export async function createProjectAction(data: {
  platform: "youtube" | "instagram";
  format: "video" | "short";
  url: string;
  title: string;
  summary: string | null;
  thumbnail_url: string | null;
}) {
  try {
    const { supabase } = await requireAdmin();

    // Determine max sort_order
    const { data: maxOrderRow } = (await supabase
      .from("projects")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle()) as { data: { sort_order: number } | null };

    const nextOrder = (maxOrderRow?.sort_order ?? 0) + 1;

    const { error } = await supabase.from("projects").insert({
      platform: data.platform,
      format: data.format,
      url: data.url,
      title: data.title,
      summary: data.summary,
      thumbnail_url: data.thumbnail_url,
      is_visible: true,
      sort_order: nextOrder,
    });

    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to add project.",
    };
  }
}

export async function updateProjectAction(
  id: string,
  data: {
    title: string;
    summary: string | null;
    thumbnail_url?: string | null;
  }
) {
  try {
    const { supabase } = await requireAdmin();

    const updatePayload: Record<string, unknown> = {
      title: data.title,
      summary: data.summary,
    };
    if (data.thumbnail_url !== undefined) {
      updatePayload.thumbnail_url = data.thumbnail_url;
    }

    const { error } = await supabase
      .from("projects")
      .update(updatePayload)
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update project.",
    };
  }
}

export async function toggleProjectVisibilityAction(
  id: string,
  is_visible: boolean
) {
  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase
      .from("projects")
      .update({ is_visible })
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to toggle visibility.",
    };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete project.",
    };
  }
}

export async function reorderProjectAction(
  id: string,
  direction: "up" | "down"
) {
  try {
    const { supabase } = await requireAdmin();

    // Fetch all projects sorted by sort_order
    const { data: projectsData, error } = await supabase
      .from("projects")
      .select("id, sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    const projects = projectsData as { id: string; sort_order: number }[] | null;
    if (error || !projects) throw error || new Error("Projects not found");

    const currentIndex = projects.findIndex((p) => p.id === id);
    if (currentIndex === -1) return { success: false, error: "Project not found" };

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) {
      return { success: true }; // already at edge
    }

    const currentProject = projects[currentIndex];
    const targetProject = projects[targetIndex];

    // Swap orders
    await supabase
      .from("projects")
      .update({ sort_order: targetProject.sort_order })
      .eq("id", currentProject.id);

    await supabase
      .from("projects")
      .update({ sort_order: currentProject.sort_order })
      .eq("id", targetProject.id);

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to reorder.",
    };
  }
}

// -----------------------------------------------------------------------------
// Review Actions
// -----------------------------------------------------------------------------

export async function createReviewAction(data: {
  image_url: string;
  client_name: string | null;
  review_text: string | null;
}) {
  try {
    const { supabase } = await requireAdmin();

    const { data: maxOrderRow } = (await supabase
      .from("reviews")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle()) as { data: { sort_order: number } | null };

    const nextOrder = (maxOrderRow?.sort_order ?? 0) + 1;

    const { error } = await supabase.from("reviews").insert({
      image_url: data.image_url,
      client_name: data.client_name,
      review_text: data.review_text,
      is_visible: true,
      sort_order: nextOrder,
    });

    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to add review.",
    };
  }
}

export async function updateReviewAction(
  id: string,
  data: {
    client_name: string | null;
    review_text: string | null;
  }
) {
  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase
      .from("reviews")
      .update({
        client_name: data.client_name,
        review_text: data.review_text,
      })
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update review.",
    };
  }
}

export async function toggleReviewVisibilityAction(
  id: string,
  is_visible: boolean
) {
  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase
      .from("reviews")
      .update({ is_visible })
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to toggle visibility.",
    };
  }
}

export async function deleteReviewAction(id: string, imageUrl?: string) {
  try {
    const { supabase } = await requireAdmin();

    // 1. Delete row from DB
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) throw error;

    // 2. Delete file from storage bucket if image_url points to Supabase storage
    if (imageUrl && imageUrl.includes("review-screenshots")) {
      try {
        const parts = imageUrl.split("/review-screenshots/");
        if (parts[1]) {
          const filePath = decodeURIComponent(parts[1].split("?")[0]);
          await supabase.storage.from("review-screenshots").remove([filePath]);
        }
      } catch (storageErr) {
        console.warn("Could not delete screenshot from storage:", storageErr);
      }
    }

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete review.",
    };
  }
}

export async function reorderReviewAction(
  id: string,
  direction: "up" | "down"
) {
  try {
    const { supabase } = await requireAdmin();

    const { data: reviewsData, error } = await supabase
      .from("reviews")
      .select("id, sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    const reviews = reviewsData as { id: string; sort_order: number }[] | null;
    if (error || !reviews) throw error || new Error("Reviews not found");

    const currentIndex = reviews.findIndex((r) => r.id === id);
    if (currentIndex === -1) return { success: false, error: "Review not found" };

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= reviews.length) {
      return { success: true };
    }

    const currentReview = reviews[currentIndex];
    const targetReview = reviews[targetIndex];

    await supabase
      .from("reviews")
      .update({ sort_order: targetReview.sort_order })
      .eq("id", currentReview.id);

    await supabase
      .from("reviews")
      .update({ sort_order: currentReview.sort_order })
      .eq("id", targetReview.id);

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to reorder.",
    };
  }
}
