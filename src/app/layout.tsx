import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alexander & Isabella — September 12, 2026",
  description:
    "You are cordially invited to celebrate the wedding of Alexander Whitmore and Isabella Chen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-obsidian text-silk antialiased">{children}</body>
    </html>
  );
}
