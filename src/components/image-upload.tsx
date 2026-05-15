"use client";

import { useState, useRef, useCallback } from "react";

interface ImageUploadProps {
  /** Current image URL (for preview) */
  currentUrl?: string | null;
  /** Called with the public URL after successful upload */
  onUploaded: (url: string) => void;
  /** Server action to call with FormData containing the file */
  uploadAction: (formData: FormData) => Promise<{ url?: string; error?: string }>;
  /** Label text */
  label?: string;
  /** HTML name for the hidden input holding the URL */
  name?: string;
  /** Compact mode for avatar (circular, smaller) */
  compact?: boolean;
}

export function ImageUpload({
  currentUrl,
  onUploaded,
  uploadAction,
  label = "Hình ảnh",
  name = "image_url",
  compact = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      // Client-side validation
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setError("Chỉ chấp nhận file ảnh (JPG, PNG, WebP, GIF)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File quá lớn. Tối đa 5MB");
        return;
      }

      // Show local preview immediately
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadAction(formData);

        if (result.error) {
          setError(result.error);
          setPreview(currentUrl ?? null);
        } else if (result.url) {
          setPreview(result.url);
          onUploaded(result.url);
        }
      } catch {
        setError("Upload thất bại. Vui lòng thử lại.");
        setPreview(currentUrl ?? null);
      } finally {
        setUploading(false);
        URL.revokeObjectURL(localUrl);
      }
    },
    [uploadAction, onUploaded, currentUrl],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  /* ───── Compact / Avatar mode ───── */
  if (compact) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--foreground)]">{label}</label>
        <div className="flex items-center gap-4">
          {/* Avatar circle */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-dashed border-[var(--border)] transition-all hover:border-[var(--accent)]"
          >
            {preview ? (
              <img src={preview} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[var(--surface)] text-2xl">
                👤
              </div>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-xs text-white">📷</span>
            </div>
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            )}
          </button>

          <div className="text-sm text-[var(--muted-strong)]">
            <p>Click để chọn ảnh</p>
            <p className="text-xs">JPG, PNG, WebP · Tối đa 5MB</p>
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleChange}
          className="hidden"
        />
        <input type="hidden" name={name} value={preview ?? ""} />
      </div>
    );
  }

  /* ───── Full mode (product image) ───── */
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[var(--foreground)]">{label}</label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all ${
          dragOver
            ? "border-[var(--accent)] bg-[var(--accent)]/5"
            : "border-[var(--border)] hover:border-[var(--accent)]/50"
        } ${preview ? "p-2" : "p-8"}`}
      >
        {preview ? (
          /* Preview */
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-h-48 rounded-lg object-contain"
            />
            {/* Remove overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="rounded-lg bg-white/20 px-3 py-1.5 text-sm text-white backdrop-blur">
                📷 Đổi ảnh
              </span>
            </div>
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-3 border-white border-t-transparent" />
                  <span className="text-sm text-white">Đang upload...</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-2xl">
              📸
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">
                Kéo thả ảnh vào đây hoặc click để chọn
              </p>
              <p className="mt-1 text-xs text-[var(--muted-strong)]">
                JPG, PNG, WebP, GIF · Tối đa 5MB
              </p>
            </div>
            {uploading && (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
                <span className="text-sm text-[var(--accent)]">Đang upload...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        className="hidden"
      />
      {/* Hidden input giữ URL để submit form */}
      <input type="hidden" name={name} value={preview ?? ""} />
    </div>
  );
}
