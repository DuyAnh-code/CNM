-- ============================================================
-- PetPals Shop — Supabase Storage Buckets + Policies
-- Chạy file này trong Supabase SQL Editor
-- ============================================================

-- 1. Tạo Storage Buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 2. Storage RLS Policies — product-images
-- ============================================================

-- Ai cũng xem được ảnh sản phẩm
CREATE POLICY "Public read product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Chỉ admin mới upload được ảnh sản phẩm
CREATE POLICY "Admins can upload product images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = (SELECT auth.uid()) AND role = 'admin'
    )
  );

-- Chỉ admin mới update được ảnh sản phẩm
CREATE POLICY "Admins can update product images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = (SELECT auth.uid()) AND role = 'admin'
    )
  );

-- Chỉ admin mới xóa được ảnh sản phẩm
CREATE POLICY "Admins can delete product images"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = (SELECT auth.uid()) AND role = 'admin'
    )
  );

-- ============================================================
-- 3. Storage RLS Policies — avatars
-- ============================================================

-- Ai cũng xem được avatar
CREATE POLICY "Public read avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- User upload avatar vào folder mang tên user_id của mình
CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  );

-- User update avatar của mình
CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  );

-- User xóa avatar của mình
CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  );
