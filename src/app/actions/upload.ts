"use server";

import { createClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadProductImage(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Chưa đăng nhập" };

  // Check admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { error: "Bạn không có quyền upload ảnh sản phẩm" };
  }

  const file = formData.get("file") as File | null;
  if (!file) return { error: "Không tìm thấy file" };

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Chỉ chấp nhận file ảnh (JPG, PNG, WebP, GIF)" };
  }

  if (file.size > MAX_SIZE) {
    return { error: "File quá lớn. Tối đa 5MB" };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return { error: "Upload thất bại: " + uploadError.message };
  }

  const { data: urlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return { url: urlData.publicUrl, path: filePath };
}

export async function uploadAvatar(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Chưa đăng nhập" };

  const file = formData.get("file") as File | null;
  if (!file) return { error: "Không tìm thấy file" };

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Chỉ chấp nhận file ảnh (JPG, PNG, WebP, GIF)" };
  }

  if (file.size > MAX_SIZE) {
    return { error: "File quá lớn. Tối đa 5MB" };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `avatar.${ext}`;
  const filePath = `${user.id}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true, // Overwrite avatar cũ
    });

  if (uploadError) {
    return { error: "Upload thất bại: " + uploadError.message };
  }

  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  // Thêm timestamp để bust cache
  const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;

  // Cập nhật avatar_url trong profiles
  await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  return { url: publicUrl, path: filePath };
}

export async function deleteStorageFile(bucket: string, filePath: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Chưa đăng nhập" };

  // Check admin for product-images bucket
  if (bucket === "product-images") {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return { error: "Không có quyền xóa" };
    }
  }

  // For avatars, only allow deleting own files
  if (bucket === "avatars" && !filePath.startsWith(user.id)) {
    return { error: "Không có quyền xóa" };
  }

  const { error } = await supabase.storage.from(bucket).remove([filePath]);

  if (error) return { error: "Xóa thất bại: " + error.message };

  return { success: true };
}
