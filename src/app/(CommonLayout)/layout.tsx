import type { Metadata } from "next";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

export const metadata: Metadata = {
  title: "99 Publication",
  description: "99explainers publication",
};

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
     <Footer/>
    </>
  );
}
