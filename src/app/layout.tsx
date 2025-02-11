import type { Metadata } from "next";
import "./globals.css";
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
        <body className=" font-poppins">
          {children}
          <script
            src="https://messenger.svc.chative.io/static/v1.0/channels/s7f519522-b708-42f4-9a90-fe5bf2912041/messenger.js?mode=livechat"
            defer
          ></script>
        </body>
      </ReduxProvider>
    </html>
  );
}
