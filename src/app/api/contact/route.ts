import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    const host = process.env.NEXT_PUBLIC_SMTP_HOST || '';
    const fromEmail = 'noreply@amelio-tech.com'
    const fromPass = process.env.NEXT_PUBLIC_FROM_EMAIL_PASSWORD || '';

    const transporter = nodemailer.createTransport({
      pool: true,
      host: host,
      port: 465,
      secure: true,
      auth: {
        user: fromEmail,
        pass: fromPass
      },
    });

    const companyInfo = company ? `\n会社名: ${company}` : '';
    const emailContent = `
以下の内容でお問い合わせがありました。

氏名: ${name}　${companyInfo}
メールアドレス: ${email}

■お問い合わせ内容
${message}
`;

    const mailOptions = {
      from: fromEmail,
      to: 'contact@amelio-tech.com',
      subject: `【HPからのお問い合わせ】${name}様`,
      text: emailContent,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    const autoReplyOptions = {
      from: {
        name: '株式会社Amelio お問い合わせ 自動返信メール ',
        address: fromEmail as string,
      },
      to: email,
      subject: '【自動返信】お問い合わせありがとうございます',
      text: `
${name} 様

お問い合わせいただきありがとうございます。
以下の内容でお問い合わせを受け付けました。
担当者より順次ご連絡いたしますので、少々お待ちください。

■お問い合わせ内容
${message}

※このメールは自動送信されています。返信はご遠慮ください。

==============================
株式会社Amelio
Email: contact@amelio-tech.com
https://amelio-tech.com
==============================
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { success: true, message: 'お問い合わせを受け付けました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'メール送信中にエラーが発生しました' },
      { status: 500 }
    );
  }
}