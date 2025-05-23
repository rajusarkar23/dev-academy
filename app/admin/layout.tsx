import Navbar from "@/components/admin/page/Navbar";
import "./dashboard.css";
import SideBar from "@/components/admin/page/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="sm:hidden flex">
        <Navbar />
      </div>
      <div className="flex">
        <div className="sm:flex hidden fixed left-0 top-0 h-screen w-64">
          <SideBar />
        </div>
        <div className="flex-1 sm:ml-64 justify-center flex">{children}</div>
      </div>
    </div>
  );
}