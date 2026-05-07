import { PostForm } from "@/components/dashboard/post-form";

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 animate-fade-in-up">
      <h1 className="mb-8 text-3xl font-bold">
        <span className="gradient-text">Viết bài mới</span>
      </h1>
      <PostForm />
    </div>
  );
}
