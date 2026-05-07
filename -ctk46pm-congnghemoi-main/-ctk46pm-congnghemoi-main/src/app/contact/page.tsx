"use client";

import { useActionState } from "react";
import { ContactFormState, sendContactMessage } from "./actions";

const initialState: ContactFormState = {
  success: false,
};

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-[#143A52] dark:text-white">Lien he</h1>
      <p className="mb-8 text-[#6E828A] dark:text-gray-400">
        Ban co cau hoi hoac muon hop tac? Hay gui tin nhan cho toi!
      </p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-4">
          <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
            <h3 className="mb-1 font-semibold text-[#143A52] dark:text-white">Email</h3>
            <a href="mailto:2213795@sv.dlu.edu.vn" className="text-sm text-[#143A52] hover:underline dark:text-white">
              2213795@sv.dlu.edu.vn
            </a>
          </div>
          <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
            <h3 className="mb-1 font-semibold text-[#143A52] dark:text-white">GitHub</h3>
            <a
              href="https://github.com/phucyeudoi1905"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#143A52] hover:underline dark:text-white"
            >
              github.com/phucyeudoi1905
            </a>
          </div>
          <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
            <h3 className="mb-1 font-semibold text-[#143A52] dark:text-white">Dia chi</h3>
            <p className="text-sm text-[#6E828A] dark:text-gray-300">Dai hoc Da Lat, 01 Phu Dong Thien Vuong, Da Lat</p>
          </div>
        </div>
        <div className="md:col-span-2">
          {state.success ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
              <h3 className="mb-2 text-lg font-semibold text-green-700">Gui thanh cong!</h3>
              <p className="text-green-600">Cam on ban da lien he. Toi se phan hoi som nhat co the.</p>
            </div>
          ) : (
            <form action={formAction} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-[#143A52] dark:text-white">
                  Ho va ten
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nguyen Van A"
                  required
                  className="w-full rounded-lg border border-[#CDE3EB] px-4 py-2 focus:ring-2 focus:ring-[#143A52] focus:outline-none"
                />
                {state.errors?.name && <p className="mt-1 text-sm text-red-500">{state.errors.name[0]}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#143A52] dark:text-white">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  className="w-full rounded-lg border border-[#CDE3EB] px-4 py-2 focus:ring-2 focus:ring-[#143A52] focus:outline-none"
                />
                {state.errors?.email && <p className="mt-1 text-sm text-red-500">{state.errors.email[0]}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-[#143A52] dark:text-white">
                  Tieu de
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Chu de ban muon trao doi"
                  required
                  className="w-full rounded-lg border border-[#CDE3EB] px-4 py-2 focus:ring-2 focus:ring-[#143A52] focus:outline-none"
                />
                {state.errors?.subject && <p className="mt-1 text-sm text-red-500">{state.errors.subject[0]}</p>}
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-[#143A52] dark:text-white">
                  Noi dung
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Viet noi dung tin nhan..."
                  required
                  rows={5}
                  className="w-full resize-none rounded-lg border border-[#CDE3EB] px-4 py-2 focus:ring-2 focus:ring-[#143A52] focus:outline-none"
                />
                {state.errors?.message && <p className="mt-1 text-sm text-red-500">{state.errors.message[0]}</p>}
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-[#143A52] px-6 py-3 text-white transition-colors hover:bg-[#0f2f43] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Dang gui..." : "Gui tin nhan"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
