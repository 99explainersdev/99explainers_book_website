import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "99 Publication",
  description: "99explainers publication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
