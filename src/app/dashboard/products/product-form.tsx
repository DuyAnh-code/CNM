"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/app/actions/products";
import { uploadProductImage } from "@/app/actions/upload";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/image-upload";

interface ProductFormProps {
  categories: { id: string; name: string }[];
  product?: {
    id: string;
    name: string;
    description: string | null;
    detail: string | null;
    price: number;
    original_price: number | null;
    category_id: string | null;
    image_url: string | null;
    stock: number;
    is_featured: boolean;
    status: string;
  };
}

export function ProductForm({ categories, product }: ProductFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(product?.image_url ?? "");
  const router = useRouter();
  const isEdit = !!product;

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    // Override image_url with the latest uploaded URL
    formData.set("image_url", imageUrl);

    const result = isEdit
      ? await updateProduct(product!.id, formData)
      : await createProduct(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard/products");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5 rounded-2xl glass p-6">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</div>
      )}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Tên sản phẩm *</label>
        <input id="name" name="name" type="text" required defaultValue={product?.name ?? ""} placeholder="Vòng cổ da cho chó" className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-all" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Giá bán (VND) *</label>
          <input id="price" name="price" type="number" required defaultValue={product?.price ?? ""} placeholder="189000" className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-all" />
        </div>
        <div>
          <label htmlFor="original_price" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Giá gốc (nếu giảm giá)</label>
          <input id="original_price" name="original_price" type="number" defaultValue={product?.original_price ?? ""} placeholder="250000" className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category_id" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Danh mục</label>
          <select id="category_id" name="category_id" defaultValue={product?.category_id ?? ""} className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none transition-all">
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="stock" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Số lượng kho</label>
          <input id="stock" name="stock" type="number" defaultValue={product?.stock ?? 0} className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none transition-all" />
        </div>
      </div>

      {/* Image Upload — thay thế input URL thủ công */}
      <ImageUpload
        currentUrl={product?.image_url}
        onUploaded={(url) => setImageUrl(url)}
        uploadAction={uploadProductImage}
        label="Hình ảnh sản phẩm"
        name="image_url"
      />

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Mô tả ngắn</label>
        <textarea id="description" name="description" rows={2} defaultValue={product?.description ?? ""} placeholder="Mô tả ngắn gọn sản phẩm..." className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-all" />
      </div>

      <div>
        <label htmlFor="detail" className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Chi tiết sản phẩm</label>
        <textarea id="detail" name="detail" rows={5} defaultValue={product?.detail ?? ""} placeholder="Thông tin chi tiết về sản phẩm..." className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-all" />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_featured" defaultChecked={product?.is_featured ?? false} className="h-4 w-4 rounded border-[var(--border)] accent-[var(--accent)]" />
          <span className="text-sm text-[var(--foreground)]">Sản phẩm nổi bật</span>
        </label>

        {isEdit && (
          <div className="flex items-center gap-2">
            <label htmlFor="status" className="text-sm text-[var(--foreground)]">Trạng thái:</label>
            <select id="status" name="status" defaultValue={product?.status ?? "active"} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none">
              <option value="active">Đang bán</option>
              <option value="inactive">Ngừng bán</option>
            </select>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[var(--accent)] px-6 py-3.5 font-semibold text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Đang xử lý..." : isEdit ? "💾 Cập nhật sản phẩm" : "➕ Thêm sản phẩm"}
      </button>
    </form>
  );
}
