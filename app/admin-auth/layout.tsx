import "../admin/dashboard.css";
import SideBar from "@/components/admin/page/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}