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
      {/* // for desktop */}
      <div className="flex">
        <div className="sm:flex hidden">
          <SideBar />
        </div>
        <div className="flex-1 sm:flex hidden justify-center">{children}</div>
      </div>
      {/* // for mobile */}
      <div>
        <div className="flex flex-col">
          <div className="sm:hidden flex">
            <Navbar />
          </div>
          <div className="sm:hidden flex justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
}