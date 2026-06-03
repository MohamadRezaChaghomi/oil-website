// src/components/sections/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { contactFormSchema, type ContactFormInput } from "@/lib/validations/contactSchema";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";

/**
 * Contact form with validation and submission handling
 */
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      website: "", // honeypot
    },
  });

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50 shadow-md"
    >
      <h2 className="text-2xl font-bold text-foreground mb-6">ارسال پیام</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Honeypot field (hidden) */}
        <div className="hidden">
          <Label htmlFor="website">وبسایت</Label>
          <Input id="website" {...register("website")} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="name">نام و نام خانوادگی *</Label>
            <Input
              id="name"
              {...register("name")}
              error={errors.name?.message}
              placeholder="مثال: محمد رضایی"
            />
          </div>
          <div>
            <Label htmlFor="email">آدرس ایمیل *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="example@domain.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="phone">شماره تماس (اختیاری)</Label>
            <Input
              id="phone"
              {...register("phone")}
              error={errors.phone?.message}
              placeholder="۰۲۱-۱۲۳۴۵۶۷۸"
            />
          </div>
          <div>
            <Label htmlFor="subject">موضوع (اختیاری)</Label>
            <Input
              id="subject"
              {...register("subject")}
              error={errors.subject?.message}
              placeholder="مثال: درخواست همکاری"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="message">پیام *</Label>
          <Textarea
            id="message"
            rows={5}
            {...register("message")}
            error={errors.message?.message}
            placeholder="متن پیام خود را اینجا وارد کنید..."
          />
        </div>

        {submitStatus === "success" && (
          <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg text-sm">
            ✓ پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg text-sm">
            ✗ ارسال پیام با خطا مواجه شد. لطفاً مجدداً تلاش کنید.
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white"
        >
          {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
        </Button>
      </form>
    </motion.div>
  );
}