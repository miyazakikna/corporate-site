'use server'
import { EMAIL_TEMPLATE_CONFIG, EMAIL_TEMPLATE } from '@/app/constants/email'
import { ContactForm } from '@/types';
import { Resend } from 'resend';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_ADDRESS = 'noreply@amelio-tech.com';
const TO_ADDRESS = 'contact@amelio-tech.com';

export const submitContactForm = async (data: ContactForm) => {
  try {
    // 1. 管理者への通知メール
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: data.email,
      subject: EMAIL_TEMPLATE_CONFIG[EMAIL_TEMPLATE.OWNER].subject(data),
      text: EMAIL_TEMPLATE_CONFIG[EMAIL_TEMPLATE.OWNER].text(data),
      react: EMAIL_TEMPLATE_CONFIG[EMAIL_TEMPLATE.OWNER].component({ data }) as React.ReactElement,
    });

    // 2. お客様への自動返信メール
    await resend.emails.send({
      from: `株式会社Amelio <${FROM_ADDRESS}>`,
      to: data.email,
      subject: EMAIL_TEMPLATE_CONFIG[EMAIL_TEMPLATE.CUSTOMER].subject(data),
      text: EMAIL_TEMPLATE_CONFIG[EMAIL_TEMPLATE.CUSTOMER].text(data),
      react: EMAIL_TEMPLATE_CONFIG[EMAIL_TEMPLATE.CUSTOMER].component({ data }) as React.ReactElement,
    });

    return { success: true, message: "お問い合わせを受け付けました" };
  } catch (err) {
    console.error('Email sending error:', err);
    return { success: false, message: "メール受信中にエラーが発生しました" };
  }
}