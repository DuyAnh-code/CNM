"use client";

import { useActionState } from "react";
import { ContactFormState, sendContactMessage } from "./actions";

const initialState: ContactFormState = {
  success: false,
};

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 animate-fade-in-up">
      <h1 className="mb-2 text-3xl font-bold">
        <span className="gradient-text">Liên hệ</span>
      </h1>
      <p className="mb-8 text-[var(--muted-strong)]">
        Bạn có câu hỏi hoặc muốn hợp tác? Hãy gửi tin nhắn cho tôi!
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Contact info cards */}
        <div className="space-y-4">
          <div className="rounded-xl glass p-4 transition-all hover:glow-sm">
            <div className="mb-2 text-lg">📧</div>
            <h3 className="mb-1 text-sm font-semibold text-[var(--foreground)]">Email</h3>
            <a
              href="mailto:2212338@sv.dlu.edu.vn"
              className="text-sm text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
            >
              2212338@sv.dlu.edu.vn
            </a>
          </div>
          <div className="rounded-xl glass p-4 transition-all hover:glow-sm">
            <div className="mb-2 text-lg">🐙</div>
            <h3 className="mb-1 text-sm font-semibold text-[var(--foreground)]">GitHub</h3>
            <a
              href="https://github.com/duyanh-le"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
            >
              github.com/duyanh-le
            </a>
          </div>
          <div className="rounded-xl glass p-4 transition-all hover:glow-sm">
            <div className="mb-2 text-lg">📍</div>
            <h3 className="mb-1 text-sm font-semibold text-[var(--foreground)]">Địa chỉ</h3>
            <p className="text-sm text-[var(--muted-strong)]">
              Đại học Đà Lạt, 01 Phù Đổng Thiên Vương, Đà Lạt
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          {state.success ? (
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-8 text-center">
              <div className="mb-3 text-4xl">✅</div>
              <h3 className="mb-2 text-lg font-semibold text-green-400">Gửi thành công!</h3>
              <p className="text-green-300/80">
                Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.
              </p>
            </div>
          ) : (
            <form action={formAction} className="space-y-4 rounded-xl glass p-6">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                  Họ và tên
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  required
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
                />
                {state.errors?.name && <p className="mt-1 text-sm text-red-400">{state.errors.name[0]}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
                />
                {state.errors?.email && <p className="mt-1 text-sm text-red-400">{state.errors.email[0]}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                  Tiêu đề
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Chủ đề bạn muốn trao đổi"
                  required
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
                />
                {state.errors?.subject && <p className="mt-1 text-sm text-red-400">{state.errors.subject[0]}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                  Nội dung
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Viết nội dung tin nhắn..."
                  required
                  rows={5}
                  className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none transition-all"
                />
                {state.errors?.message && <p className="mt-1 text-sm text-red-400">{state.errors.message[0]}</p>}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-[var(--accent)] px-6 py-3 font-medium text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Đang gửi..." : "Gửi tin nhắn"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
