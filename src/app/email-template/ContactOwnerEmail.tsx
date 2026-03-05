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

interface ContactOwnerEmailProps {
  data: ContactForm;
}

export default function ContactOwnerEmail({ data }: ContactOwnerEmailProps) {
  return (
    <Html lang="ja">
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={contentStyle}>
            <Text style={paragraphStyle}>
              ※ このメールは株式会社Amelioコーポレートサイトからの自動配信です。
            </Text>
            <Text style={paragraphStyle}>
              以下の内容でお問い合わせがありました。
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
              ご対応のほど、よろしくお願いいたします。
            </Text>
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
  fontSize: "16px",
  fontWeight: "bold",
  margin: 0,
  letterSpacing: "0.05em",
};

const contentStyle: React.CSSProperties = {
  padding: "32px 40px",
};

const paragraphStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#4a5568",
  lineHeight: "1.8",
  marginBottom: "8px",
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
  fontSize: "14px",
  color: "#4a5568",
  lineHeight: "1.6",
};
