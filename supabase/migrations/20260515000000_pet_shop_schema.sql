-- ============================================================
-- PetPals Shop — Database Schema + Seed Data
-- Chạy file này trong Supabase SQL Editor
-- ============================================================

-- 1. Thêm cột role vào profiles (admin/user)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'user' CHECK (role IN ('user', 'admin'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address text;

-- 2. Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text, -- emoji
  image_url text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.categories IS 'Danh mục sản phẩm phụ kiện thú cưng';

-- 3. Products
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id uuid REFERENCES public.categories ON DELETE SET NULL,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  detail text,
  price numeric(12,0) NOT NULL,
  original_price numeric(12,0),
  image_url text,
  images text[] DEFAULT '{}',
  stock integer DEFAULT 0,
  sold integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.products IS 'Sản phẩm phụ kiện thú cưng';

CREATE INDEX IF NOT EXISTS products_category_id_idx ON public.products (category_id);
CREATE INDEX IF NOT EXISTS products_slug_idx ON public.products (slug);
CREATE INDEX IF NOT EXISTS products_status_idx ON public.products (status);
CREATE INDEX IF NOT EXISTS products_is_featured_idx ON public.products (is_featured);

-- 4. Cart Items
CREATE TABLE IF NOT EXISTS public.cart_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE (user_id, product_id)
);

COMMENT ON TABLE public.cart_items IS 'Giỏ hàng';

CREATE INDEX IF NOT EXISTS cart_items_user_id_idx ON public.cart_items (user_id);

-- 5. Orders
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles ON DELETE SET NULL,
  total numeric(12,0) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipping', 'delivered', 'cancelled')),
  full_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  note text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.orders IS 'Đơn hàng';

CREATE INDEX IF NOT EXISTS orders_user_id_idx ON public.orders (user_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON public.orders (status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders (created_at DESC);

-- 6. Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid NOT NULL REFERENCES public.orders ON DELETE CASCADE,
  product_id uuid REFERENCES public.products ON DELETE SET NULL,
  product_name text NOT NULL,
  product_image text,
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric(12,0) NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.order_items IS 'Chi tiết đơn hàng';

CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON public.order_items (order_id);

-- 7. Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES public.products ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE (product_id, user_id)
);

COMMENT ON TABLE public.reviews IS 'Đánh giá sản phẩm';

CREATE INDEX IF NOT EXISTS reviews_product_id_idx ON public.reviews (product_id);

-- 8. Updated_at triggers cho products và orders
DROP TRIGGER IF EXISTS products_updated_at ON public.products;
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- RLS Policies
-- ============================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Categories: ai cũng xem được
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.categories;
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

-- Products: ai cũng xem được active products
DROP POLICY IF EXISTS "Active products are viewable by everyone" ON public.products;
CREATE POLICY "Active products are viewable by everyone"
  ON public.products FOR SELECT TO anon, authenticated
  USING (status = 'active');

DROP POLICY IF EXISTS "Admins can view all products" ON public.products;
CREATE POLICY "Admins can view all products"
  ON public.products FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins can update products" ON public.products;
CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

-- Cart Items: user chỉ thao tác với giỏ hàng của mình
DROP POLICY IF EXISTS "Users can view their own cart" ON public.cart_items;
CREATE POLICY "Users can view their own cart"
  ON public.cart_items FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can add to their own cart" ON public.cart_items;
CREATE POLICY "Users can add to their own cart"
  ON public.cart_items FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update their own cart" ON public.cart_items;
CREATE POLICY "Users can update their own cart"
  ON public.cart_items FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete from their own cart" ON public.cart_items;
CREATE POLICY "Users can delete from their own cart"
  ON public.cart_items FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Orders: user xem đơn hàng của mình, admin xem tất cả
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
CREATE POLICY "Users can create orders"
  ON public.orders FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

-- Order Items: user xem items của đơn mình, admin xem tất cả
DROP POLICY IF EXISTS "Users can view their own order items" ON public.order_items;
CREATE POLICY "Users can view their own order items"
  ON public.order_items FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = (SELECT auth.uid()))
  );

DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;
CREATE POLICY "Admins can view all order items"
  ON public.order_items FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
  );

DROP POLICY IF EXISTS "Users can create order items" ON public.order_items;
CREATE POLICY "Users can create order items"
  ON public.order_items FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = (SELECT auth.uid()))
  );

-- Reviews: ai cũng xem, user chỉ tạo/xóa review của mình
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can create reviews" ON public.reviews;
CREATE POLICY "Users can create reviews"
  ON public.reviews FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete their own reviews" ON public.reviews;
CREATE POLICY "Users can delete their own reviews"
  ON public.reviews FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- ============================================================
-- Seed Data: Danh mục + Sản phẩm mẫu
-- ============================================================

-- Danh mục
INSERT INTO public.categories (name, slug, description, icon, sort_order) VALUES
  ('Vòng cổ & Dây dắt', 'vong-co-day-dat', 'Vòng cổ, dây xích, dây dắt cho chó mèo', '🎀', 1),
  ('Thức ăn & Hạt', 'thuc-an-hat', 'Thức ăn hạt, pate, snack cho thú cưng', '🦴', 2),
  ('Đồ chơi', 'do-choi', 'Đồ chơi giải trí cho chó mèo', '🧸', 3),
  ('Quần áo', 'quan-ao', 'Quần áo, phụ kiện thời trang cho thú cưng', '👗', 4),
  ('Chăm sóc', 'cham-soc', 'Sản phẩm vệ sinh, chăm sóc sức khỏe', '🧴', 5),
  ('Nhà & Nệm', 'nha-nem', 'Nhà, nệm, giường cho thú cưng', '🏠', 6)
ON CONFLICT (slug) DO NOTHING;

-- Sản phẩm mẫu
INSERT INTO public.products (name, slug, description, detail, price, original_price, image_url, stock, sold, is_featured, category_id) VALUES
  (
    'Vòng cổ da cao cấp cho chó',
    'vong-co-da-cao-cap-cho-cho',
    'Vòng cổ da thật, khóa kim loại chắc chắn, phù hợp chó trung bình và lớn.',
    'Vòng cổ được làm từ da bò thật 100%, mềm mại và bền bỉ theo thời gian. Khóa kim loại không gỉ, có thể điều chỉnh kích thước dễ dàng. Phù hợp cho chó từ 10-30kg. Có nhiều màu sắc: nâu, đen, đỏ.',
    189000, 250000,
    'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=500&h=500&fit=crop',
    50, 23, true,
    (SELECT id FROM public.categories WHERE slug = 'vong-co-day-dat')
  ),
  (
    'Dây dắt tự động co giãn 5m',
    'day-dat-tu-dong-co-gian-5m',
    'Dây dắt retractable 5m, nút khóa an toàn, tay cầm êm ái.',
    'Dây dắt co giãn tự động với chiều dài tối đa 5 mét, cho phép thú cưng tự do khám phá. Nút khóa 1 chạm an toàn, tay cầm cao su chống trượt. Chịu lực tối đa 25kg.',
    165000, 220000,
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=500&fit=crop',
    35, 18, true,
    (SELECT id FROM public.categories WHERE slug = 'vong-co-day-dat')
  ),
  (
    'Hạt Royal Canin cho mèo trưởng thành 2kg',
    'hat-royal-canin-meo-truong-thanh-2kg',
    'Thức ăn hạt dinh dưỡng cao cấp cho mèo từ 12 tháng tuổi.',
    'Royal Canin Regular Fit 32 cung cấp dinh dưỡng cân bằng cho mèo trưởng thành. Công thức giúp duy trì cân nặng lý tưởng, hỗ trợ hệ tiêu hóa và làm đẹp lông. Trọng lượng: 2kg.',
    385000, NULL,
    'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&h=500&fit=crop',
    100, 67, true,
    (SELECT id FROM public.categories WHERE slug = 'thuc-an-hat')
  ),
  (
    'Pate Whiskas vị cá ngừ cho mèo (combo 12 gói)',
    'pate-whiskas-ca-ngu-combo-12',
    'Pate thức ăn ướt Whiskas vị cá ngừ, combo tiết kiệm 12 gói.',
    'Whiskas Pate vị cá ngừ là thức ăn ướt bổ sung dinh dưỡng cho mèo. Được làm từ cá ngừ thật, giàu protein và omega-3. Mỗi gói 85g, combo 12 gói tiết kiệm hơn.',
    156000, 192000,
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=500&fit=crop',
    80, 45, false,
    (SELECT id FROM public.categories WHERE slug = 'thuc-an-hat')
  ),
  (
    'Snack thưởng cho chó vị gà',
    'snack-thuong-cho-vi-ga',
    'Snack training thưởng cho chó, vị gà thật, không chất bảo quản.',
    'Snack thưởng cho chó với thành phần chính là ức gà sấy khô 100%. Không chất bảo quản, không phẩm màu. Phù hợp để training và thưởng cho bé. Trọng lượng: 100g.',
    79000, NULL,
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=500&fit=crop',
    120, 89, true,
    (SELECT id FROM public.categories WHERE slug = 'thuc-an-hat')
  ),
  (
    'Bóng cao su siêu bền cho chó',
    'bong-cao-su-sieu-ben-cho-cho',
    'Bóng đồ chơi cao su tự nhiên, không độc hại, nảy tốt.',
    'Bóng cao su tự nhiên 100%, an toàn khi chó cắn. Độ nảy cao, phù hợp chơi fetch ngoài trời. Kích thước 7.5cm, phù hợp chó mọi kích cỡ. Có 3 màu: đỏ, xanh, vàng.',
    55000, 75000,
    'https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=500&h=500&fit=crop',
    200, 134, true,
    (SELECT id FROM public.categories WHERE slug = 'do-choi')
  ),
  (
    'Cần câu đồ chơi lông vũ cho mèo',
    'can-cau-long-vu-cho-meo',
    'Cần câu mèo với lông vũ nhiều màu, kích thích bản năng săn mồi.',
    'Cần câu đồ chơi dành cho mèo với lông vũ tự nhiên đầy sắc màu. Thanh cần linh hoạt, dễ điều khiển. Kích thích bản năng săn mồi, giúp mèo vận động và giảm stress. Chiều dài cần: 40cm.',
    45000, NULL,
    'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=500&h=500&fit=crop',
    150, 98, false,
    (SELECT id FROM public.categories WHERE slug = 'do-choi')
  ),
  (
    'Áo hoodie mùa đông cho chó nhỏ',
    'ao-hoodie-mua-dong-cho-nho',
    'Áo hoodie ấm áp, chất liệu cotton mềm, nhiều size và màu.',
    'Áo hoodie dành cho chó nhỏ (dưới 8kg) với chất liệu cotton pha fleece, giữ ấm tốt trong mùa đông. Thiết kế có mũ trùm dễ thương. Size S/M/L. Có 4 màu: hồng, xanh navy, xám, đỏ.',
    129000, 169000,
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&h=500&fit=crop',
    60, 31, true,
    (SELECT id FROM public.categories WHERE slug = 'quan-ao')
  ),
  (
    'Váy công chúa cho mèo',
    'vay-cong-chua-cho-meo',
    'Váy tutu dễ thương cho mèo, phù hợp chụp ảnh và dạo chơi.',
    'Váy tutu phong cách công chúa dành cho mèo. Chất liệu vải tulle mềm, không gây khó chịu. Đai thun co giãn dễ mặc. Phù hợp mèo 2-6kg. Nhiều màu: hồng, tím, trắng.',
    95000, 120000,
    'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=500&h=500&fit=crop',
    40, 22, false,
    (SELECT id FROM public.categories WHERE slug = 'quan-ao')
  ),
  (
    'Sữa tắm SOS cho chó mèo 530ml',
    'sua-tam-sos-cho-meo-530ml',
    'Sữa tắm dịu nhẹ, khử mùi, dưỡng lông mượt mà.',
    'Sữa tắm SOS với công thức dịu nhẹ pH cân bằng, phù hợp cho cả chó và mèo. Thành phần tự nhiên giúp khử mùi hiệu quả, dưỡng lông bóng mượt và giảm rụng lông. Dung tích: 530ml.',
    125000, NULL,
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&h=500&fit=crop',
    90, 56, true,
    (SELECT id FROM public.categories WHERE slug = 'cham-soc')
  ),
  (
    'Lược chải lông 2 mặt cho chó mèo',
    'luoc-chai-long-2-mat',
    'Lược chải lông 2 mặt: mặt thưa gỡ rối, mặt dày làm mượt.',
    'Lược chải lông chuyên dụng 2 mặt. Mặt thưa giúp gỡ rối, mặt dày giúp làm mượt và loại bỏ lông rụng. Tay cầm cao su chống trượt, thiết kế ergonomic. Phù hợp mọi loại lông.',
    65000, 89000,
    'https://images.unsplash.com/photo-1544568100-847a948585b9?w=500&h=500&fit=crop',
    75, 41, false,
    (SELECT id FROM public.categories WHERE slug = 'cham-soc')
  ),
  (
    'Nhà gỗ cho mèo 2 tầng',
    'nha-go-meo-2-tang',
    'Nhà gỗ 2 tầng với trụ cào móng, nệm êm ái bên trong.',
    'Nhà gỗ cao cấp 2 tầng cho mèo. Tầng dưới là hang ẩn nấp, tầng trên là ban công ngắm cảnh. Có trụ cào móng bọc thừng sisal. Nệm lót bông mềm có thể tháo giặt. Kích thước: 50x40x65cm.',
    890000, 1200000,
    'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&h=500&fit=crop',
    15, 8, true,
    (SELECT id FROM public.categories WHERE slug = 'nha-nem')
  ),
  (
    'Nệm oval êm ái cho chó',
    'nem-oval-em-ai-cho-cho',
    'Nệm hình oval, bông PP cao cấp, vải nhung mềm mại.',
    'Nệm hình oval với lớp bông PP cao cấp, đàn hồi tốt. Vải nhung mềm mại, giữ ấm vào mùa đông. Đáy chống trượt. Có thể giặt máy. Size M (60x50cm), phù hợp chó 5-15kg.',
    245000, 320000,
    'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=500&h=500&fit=crop',
    30, 19, false,
    (SELECT id FROM public.categories WHERE slug = 'nha-nem')
  ),
  (
    'Bát ăn đôi inox chống lật',
    'bat-an-doi-inox-chong-lat',
    'Bát đôi inox 304 với đế cao su chống lật, dễ vệ sinh.',
    'Bộ bát ăn đôi (ăn + uống) bằng inox 304 cao cấp, an toàn thực phẩm. Đế cao su chống trượt và chống lật. Dung tích mỗi bát: 400ml. Dễ tháo rời vệ sinh. Phù hợp chó mèo dưới 10kg.',
    115000, 150000,
    'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=500&h=500&fit=crop',
    65, 37, true,
    (SELECT id FROM public.categories WHERE slug = 'cham-soc')
  ),
  (
    'Túi vận chuyển thú cưng trong suốt',
    'tui-van-chuyen-thu-cung-trong-suot',
    'Balo trong suốt vận chuyển thú cưng, thông thoáng, thời trang.',
    'Balo vận chuyển thú cưng với mặt trước trong suốt, giúp bé quan sát xung quanh. Có lỗ thông khí ở 2 bên. Đệm lót êm ái có thể tháo giặt. Phù hợp chó mèo dưới 6kg. Kích thước: 33x28x42cm.',
    350000, 450000,
    'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&h=500&fit=crop',
    25, 14, true,
    (SELECT id FROM public.categories WHERE slug = 'vong-co-day-dat')
  )
ON CONFLICT (slug) DO NOTHING;
