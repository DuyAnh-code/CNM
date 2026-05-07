"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Ten phai co it nhat 2 ky tu").max(100, "Ten khong duoc qua 100 ky tu"),
  email: z.string().email("Email khong hop le"),
  subject: z.string().min(5, "Tieu de phai co it nhat 5 ky tu").max(200, "Tieu de khong duoc qua 200 ky tu"),
  message: z.string().min(10, "Noi dung phai co it nhat 10 ky tu").max(2000, "Noi dung khong duoc qua 2000 ky tu"),
});

export interface ContactFormState {
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const result = contactSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  console.log("Tin nhan lien he moi:", result.data);
  return { success: true };
}
