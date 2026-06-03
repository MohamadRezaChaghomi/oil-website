// src/lib/validations/contactSchema.ts
import { z } from "zod";

/**
 * Schema for contact form validation
 * Includes honeypot field for bot detection
 */
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, "نام باید حداقل ۲ کاراکتر باشد")
    .max(100, "نام نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد")
    .regex(/^[\u0600-\u06FF\s\-']+$/, "نام باید فقط شامل حروف فارسی، فاصله و خط تیره باشد"),
  
  email: z.string()
    .email("لطفاً یک آدرس ایمیل معتبر وارد کنید")
    .max(255, "ایمیل نمی‌تواند بیشتر از ۲۵۵ کاراکتر باشد"),
  
  phone: z.string()
    .optional()
    .refine(
      (val) => !val || /^[\+\d\s\-\(\)]+$/.test(val),
      "شماره تلفن نامعتبر است"
    ),
  
  subject: z.string()
    .min(3, "موضوع باید حداقل ۳ کاراکتر باشد")
    .max(200, "موضوع نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد")
    .optional(),
  
  message: z.string()
    .min(10, "پیام باید حداقل ۱۰ کاراکتر باشد")
    .max(5000, "پیام نمی‌تواند بیشتر از ۵۰۰۰ کاراکتر باشد"),
  
  // Honeypot field - should be empty
  website: z.string()
    .max(0, "شناسایی ربات - لطفاً فرم را مجدداً ارسال کنید")
    .optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;