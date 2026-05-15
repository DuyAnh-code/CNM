export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  detail: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  images: string[];
  stock: number;
  sold: number;
  is_featured: boolean;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
  // Joined
  categories?: Category | null;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  // Joined
  products?: Product | null;
}

export type OrderStatus = "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";

export interface Order {
  id: string;
  user_id: string | null;
  total: number;
  status: OrderStatus;
  full_name: string;
  phone: string;
  address: string;
  note: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  order_items?: OrderItem[];
  profiles?: Pick<Profile, "display_name" | "avatar_url"> | null;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  // Joined
  profiles?: Pick<Profile, "display_name" | "avatar_url"> | null;
}
