import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Expert AI Panel",
  description: "Generate panel discussions with AI-powered experts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-neutral-950">
        {children}
        <Footer />
      </body>
    </html>
  );
}
