import { Comment } from "@/types/database";

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <p className="py-8 text-center text-[#6E828A] dark:text-gray-400">
        Chưa có bình luận nào. Hãy là người đầu tiên!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="rounded-lg bg-[var(--surface)] p-4 dark:bg-gray-800">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="font-medium text-[#143A52] dark:text-white">
              {comment.profiles?.display_name ?? "Ẩn danh"}
            </span>
            <span className="text-sm text-[#6E828A] dark:text-gray-400">
              {new Date(comment.created_at).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <p className="whitespace-pre-wrap text-[#143A52] dark:text-gray-200">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
