"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleFollow(brandId: string, follow: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  if (follow) {
    await supabase.from("follows").insert({ user_id: user.id, brand_id: brandId });
  } else {
    await supabase.from("follows").delete().eq("user_id", user.id).eq("brand_id", brandId);
  }

  revalidatePath("/mein-feed");
}
