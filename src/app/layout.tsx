import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "../services/AutProvider";
import ReduxProvider from "./components/reduxprovider";

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
      <ReduxProvider>
        <AuthProvider>
          <body className=" font-poppins">{children}</body>
        </AuthProvider>
      </ReduxProvider>
    </html>
  );
}
