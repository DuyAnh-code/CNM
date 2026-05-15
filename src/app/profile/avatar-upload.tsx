"use client";

import { useState } from "react";
import { uploadAvatar } from "@/app/actions/upload";
import { ImageUpload } from "@/components/image-upload";

interface AvatarUploadProps {
  currentUrl: string | null;
}

export function AvatarUpload({ currentUrl }: AvatarUploadProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>(currentUrl ?? "");

  return (
    <ImageUpload
      currentUrl={currentUrl}
      onUploaded={(url) => setAvatarUrl(url)}
      uploadAction={uploadAvatar}
      label="Ảnh đại diện"
      name="avatar_url"
      compact
    />
  );
}
