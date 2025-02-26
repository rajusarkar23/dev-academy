import Link from "next/link";

export default function SideBar() {
  return (
    <div className="w-60 bg-zinc-800 min-h-screen text-white p-4 shadow-lg">
      <Link href={"/admin/dashboard"} className="text-2xl font-bold">Admin Dashboard</Link>

      <div className="mt-8 flex justify-center">
        <Link href={"/admin/dashboard"} className="hover:bg-black w-full h-10 flex items-center justify-center rounded transition-all text-xl font-semibold">Dashboard</Link>
      </div>
    </div>
  );
}
