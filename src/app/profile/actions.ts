"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }

  const displayName = String(formData.get("display_name") ?? "").trim();
  const avatarUrl = String(formData.get("avatar_url") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName || null,
      avatar_url: avatarUrl || null,
      phone: phone || null,
      address: address || null,
    })
    .eq("id", user.id);

  if (error) {
    console.error(error.message);
    return;
  }

  revalidatePath("/profile");
}
