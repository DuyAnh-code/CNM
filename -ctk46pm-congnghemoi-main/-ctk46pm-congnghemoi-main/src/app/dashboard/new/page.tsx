import { PostForm } from "@/components/dashboard/post-form";

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-[#143A52] dark:text-white">Viết bài mới</h1>
      <PostForm />
    </div>
  );
}
