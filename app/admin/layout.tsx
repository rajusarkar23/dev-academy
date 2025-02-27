import "./dashboard.css";
import SideBar from "@/components/admin/page/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}