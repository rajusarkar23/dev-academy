import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/page/Navbar";

export const metadata: Metadata = {
  title: "Home | Dev Academy",
  description: "Generated by create next app",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
