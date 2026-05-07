export type PostStatus = "draft" | "published";

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  status: PostStatus;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  profiles?: Pick<Profile, "display_name" | "avatar_url"> | Profile | null;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  profiles?: Pick<Profile, "display_name" | "avatar_url"> | Profile | null;
}
