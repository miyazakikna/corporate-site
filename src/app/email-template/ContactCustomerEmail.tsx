import { ContactForm } from "@/types";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";
import React from "react";

interface ContactCustomerEmailProps {
  data: ContactForm;
}

export default function ContactCustomerEmail({ data }: ContactCustomerEmailProps) {
  return (
    <Html lang="ja">
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={contentStyle}>
            <Text style={greetingStyle}>{data.name} 様</Text>

            <Text style={paragraphStyle}>
              お問い合わせいただきありがとうございます。
              <br />
              以下の内容でお問い合わせを受け付けました。
              <br />
              担当者より順次ご連絡いたしますので、少々お待ちください。
            </Text>

            <Hr style={dividerStyle} />

            <Text style={labelStyle}>■ お名前</Text>
            <Text style={valueStyle}>{data.name}</Text>

            {data.company && (
              <>
                <Text style={labelStyle}>■ 会社名</Text>
                <Text style={valueStyle}>{data.company}</Text>
              </>
            )}

            <Text style={labelStyle}>■ メールアドレス</Text>
            <Text style={valueStyle}>{data.email}</Text>

            <Text style={labelStyle}>■ ご用件</Text>
            <Text style={valueStyle}>{data.inquiryType}</Text>

            <Text style={labelStyle}>■ お問い合わせ内容</Text>
            <Text style={valueStyle}>
              {data.message.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Text>

            <Hr style={dividerStyle} />

            <Text style={noteStyle}>
              ※このメールは自動送信されています。返信はご遠慮ください。
            </Text>
          </Section>

          <Section style={footerStyle}>
            <Hr style={dividerStyle} />
            <Text style={footerText}>
              株式会社Amelio<br />
              Email：contact@amelio-tech.com<br />
              URL：https://amelio-tech.com
            </Text>
            <Hr style={dividerStyle} />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle: React.CSSProperties = {
  backgroundColor: "#f4f6f9",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: 0,
  padding: "24px 0",
};

const containerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  maxWidth: "600px",
  margin: "0 auto",
  overflow: "hidden",
};

const headerStyle: React.CSSProperties = {
  backgroundColor: "#1a2b4a",
  padding: "24px 40px",
};

const logoText: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "bold",
  margin: 0,
  letterSpacing: "0.05em",
};

const contentStyle: React.CSSProperties = {
  padding: "32px 40px",
};

const greetingStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#1a2b4a",
  fontWeight: "bold",
  marginBottom: "16px",
};

const paragraphStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#4a5568",
  lineHeight: "1.8",
  marginBottom: "24px",
};

const dividerStyle: React.CSSProperties = {
  borderColor: "#e2e8f0",
  margin: "24px 0",
};

const labelStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#718096",
  fontWeight: "bold",
  marginBottom: "4px",
  marginTop: "16px",
};

const valueStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#1a2b4a",
  marginTop: "0",
  marginBottom: "0",
};

const noteStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#a0aec0",
  lineHeight: "1.6",
};

const footerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "0 40px 32px 40px",
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  color: "#718096",
  lineHeight: "1.8",
  margin: 0,
};
