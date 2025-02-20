import Navbar from "@/components/admin/page/Navbar"
import "./dashboard.css"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}