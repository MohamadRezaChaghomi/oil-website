// src/lib/services/emailService.ts
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    const host = process.env.EMAIL_HOST;
    const port = parseInt(process.env.EMAIL_PORT || "587", 10);
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!host || !user || !pass) {
      throw new Error("Missing email configuration in environment variables");
    }

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return transporter;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const { name, email, phone, subject, message } = data;
  const transporter = getTransporter();
  const adminEmail = process.env.EMAIL_TO || process.env.EMAIL_USER;
  if (!adminEmail) throw new Error("No recipient email configured");

  const emailSubject = subject || `New contact message from ${name}`;
  const textContent = `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Subject: ${emailSubject}
Message:
${message}
  `;
  const htmlContent = `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : "Not provided"}</p>
    <p><strong>Subject:</strong> ${escapeHtml(emailSubject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME || "Website Contact"}" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    replyTo: email,
    subject: emailSubject,
    text: textContent,
    html: htmlContent,
  });
}

export async function sendAutoReply(data: ContactEmailData): Promise<void> {
  const transporter = getTransporter();
  const { name, email } = data;
  const autoReplyText = `
Dear ${name},

Thank you for contacting us. We have received your message and will get back to you as soon as possible.

Best regards,
Oil & Gas Company Team
  `;
  const autoReplyHtml = `
    <h2>Thank you, ${escapeHtml(name)}</h2>
    <p>We have received your message and will get back to you as soon as possible.</p>
    <p>Best regards,<br>Oil & Gas Company Team</p>
  `;

  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME || "Oil & Gas Company"}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "We received your message",
    text: autoReplyText,
    html: autoReplyHtml,
  });
}

export async function verifyEmailConfig(): Promise<boolean> {
  try {
    const transporter = getTransporter();
    await transporter.verify();
    return true;
  } catch {
    return false;
  }
}