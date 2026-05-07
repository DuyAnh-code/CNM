import { Comment } from "@/types/database";

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <p className="py-8 text-center text-[var(--muted-strong)]">
        Chưa có bình luận nào. Hãy là người đầu tiên!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div key={comment.id} className="rounded-xl glass p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="font-medium text-[var(--foreground)]">
              {comment.profiles?.display_name ?? "Ẩn danh"}
            </span>
            <span className="text-xs text-[var(--muted)]">
              {new Date(comment.created_at).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <p className="whitespace-pre-wrap text-sm text-[var(--muted-strong)]">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
