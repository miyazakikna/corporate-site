import ContactCustomerEmail from "@/app/email-template/ContactCustomerEmail";
import ContactOwnerEmail from "@/app/email-template/ContactOwnerEmail";
import { ContactForm } from "@/types";

export const EMAIL_TEMPLATE = {
  CUSTOMER: "customer",
  OWNER: "owner",
} as const;

export type EmailTemplate = typeof EMAIL_TEMPLATE[keyof typeof EMAIL_TEMPLATE];

export const EMAIL_TEMPLATE_CONFIG: Record<EmailTemplate, {
  subject: (data: ContactForm) => string;
  text: (data: ContactForm) => string;
  component: (props: { data: ContactForm }) => React.ReactNode;
}> = {
  [EMAIL_TEMPLATE.CUSTOMER]: {
    subject: () => `【株式会社Amelio】お問い合わせありがとうございます`,
    text: (data: ContactForm) =>
      `${data.name} 様

お問い合わせいただきありがとうございます。
以下の内容でお問い合わせを受け付けました。
担当者より順次ご連絡いたしますので、少々お待ちください。

---
■ お名前
${data.name}

${data.company ? `■ 会社名\n${data.company}\n` : ""}
■ メールアドレス
${data.email}

■ ご用件
${data.inquiryType}

■ お問い合わせ内容
${data.message}
---

※このメールは自動送信されています。返信はご遠慮ください。

━━━━━━━━━━━━━━━━━━━━━━━━━━
株式会社Amelio
Email：contact@amelio-tech.com
URL：https://amelio-tech.com
━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    component: ContactCustomerEmail,
  },
  [EMAIL_TEMPLATE.OWNER]: {
    subject: (data: ContactForm) => `【HPからのお問い合わせ】${data.name}様（${data.inquiryType}）`,
    text: (data: ContactForm) =>
      `以下の内容でお問い合わせがありました。

---
■ お名前
${data.name}

${data.company ? `■ 会社名\n${data.company}\n` : ""}
■ メールアドレス
${data.email}

■ ご用件
${data.inquiryType}

■ お問い合わせ内容
${data.message}
---

ご対応のほど、よろしくお願いいたします。`,
    component: ContactOwnerEmail,
  },
}