import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MAK CONSULTANCY | Professional Tax Consultancy in Pakistan",
  description: "Pakistan's trusted tax consultancy firm. Expert services in tax filing, corporate tax planning, NTN registration, FBR compliance, and wealth management. 15+ years of experience serving 5000+ clients.",
  keywords: "tax consultancy Pakistan, FBR, NTN registration, tax filing, corporate tax, wealth management, Islamabad, Karachi, Lahore",
  openGraph: {
    title: "MAK CONSULTANCY | Professional Tax Consultancy in Pakistan",
    description: "Pakistan's trusted tax consultancy firm. Expert services in tax filing, corporate tax planning, and FBR compliance.",
    type: "website",
    locale: "en_PK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
