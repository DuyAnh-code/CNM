-- Bài thực hành 4: schema, triggers, RLS (chạy trong Supabase SQL Editor hoặc CLI)

-- Profiles
create table if not exists public.profiles (
  id uuid not null references auth.users on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

comment on table public.profiles is 'User profiles - extends auth.users';

create index if not exists profiles_display_name_idx on public.profiles (display_name);

-- Auto profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'display_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Posts enum & table
do $$ begin
  create type post_status as enum ('draft', 'published');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.posts (
  id uuid default gen_random_uuid() not null,
  author_id uuid not null references public.profiles on delete cascade,
  title text not null,
  slug text not null,
  content text,
  excerpt text,
  status post_status default 'draft' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  published_at timestamp with time zone,
  primary key (id),
  unique (slug)
);

comment on table public.posts is 'Blog posts';

create index if not exists posts_author_id_idx on public.posts (author_id);
create index if not exists posts_status_idx on public.posts (status);
create index if not exists posts_published_at_idx on public.posts (published_at desc);
create index if not exists posts_slug_idx on public.posts (slug);

-- Slug helpers (fallback khi title chỉ có ký tự không Latin)
create or replace function public.generate_slug(title text)
returns text
language plpgsql
as $$
declare
  base_slug text;
  final_slug text;
  counter integer := 0;
begin
  base_slug := lower(regexp_replace(coalesce(title, ''), '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  if base_slug is null or base_slug = '' then
    base_slug := 'bai-viet';
  end if;
  final_slug := base_slug;
  while exists (select 1 from public.posts where slug = final_slug) loop
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  end loop;
  return final_slug;
end;
$$;

create or replace function public.set_post_slug()
returns trigger
language plpgsql
as $$
begin
  if new.slug is null or new.slug = '' then
    new.slug := public.generate_slug(new.title);
  end if;
  return new;
end;
$$;

drop trigger if exists posts_set_slug on public.posts;
create trigger posts_set_slug
  before insert on public.posts
  for each row execute function public.set_post_slug();

-- Comments
create table if not exists public.comments (
  id uuid default gen_random_uuid() not null,
  post_id uuid not null references public.posts on delete cascade,
  author_id uuid not null references public.profiles on delete cascade,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

comment on table public.comments is 'Comments on blog posts';

create index if not exists comments_post_id_idx on public.comments (post_id);
create index if not exists comments_author_id_idx on public.comments (author_id);
create index if not exists comments_created_at_idx on public.comments (created_at desc);

-- updated_at triggers
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at
  before update on public.posts
  for each row execute function public.update_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;

drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
  on public.profiles for select to anon, authenticated
  using (true);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Published posts are viewable by everyone" on public.posts;
create policy "Published posts are viewable by everyone"
  on public.posts for select to anon, authenticated
  using (status = 'published');

drop policy if exists "Authors can view all their own posts" on public.posts;
create policy "Authors can view all their own posts"
  on public.posts for select to authenticated
  using ((select auth.uid()) = author_id);

drop policy if exists "Authenticated users can create posts" on public.posts;
create policy "Authenticated users can create posts"
  on public.posts for insert to authenticated
  with check ((select auth.uid()) = author_id);

drop policy if exists "Authors can update their own posts" on public.posts;
create policy "Authors can update their own posts"
  on public.posts for update to authenticated
  using ((select auth.uid()) = author_id)
  with check ((select auth.uid()) = author_id);

drop policy if exists "Authors can delete their own posts" on public.posts;
create policy "Authors can delete their own posts"
  on public.posts for delete to authenticated
  using ((select auth.uid()) = author_id);

drop policy if exists "Comments on published posts are viewable" on public.comments;
create policy "Comments on published posts are viewable"
  on public.comments for select to anon, authenticated
  using (
    exists (
      select 1 from public.posts
      where posts.id = comments.post_id
      and posts.status = 'published'
    )
  );

-- Bài tập 3.1: tác giả xem mọi comment trên bài của mình (kể cả draft)
drop policy if exists "Post authors can view comments on their posts" on public.comments;
create policy "Post authors can view comments on their posts"
  on public.comments for select to authenticated
  using (
    exists (
      select 1 from public.posts
      where posts.id = comments.post_id
      and posts.author_id = (select auth.uid())
    )
  );

drop policy if exists "Authenticated users can create comments" on public.comments;
create policy "Authenticated users can create comments"
  on public.comments for insert to authenticated
  with check ((select auth.uid()) = author_id);

drop policy if exists "Users can delete their own comments" on public.comments;
create policy "Users can delete their own comments"
  on public.comments for delete to authenticated
  using ((select auth.uid()) = author_id);
