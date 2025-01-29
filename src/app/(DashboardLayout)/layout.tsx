import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Publication",
  description: "99explainers publication",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      Admin/user/Driver SideBard
      {children}
    </div>
  );
}
