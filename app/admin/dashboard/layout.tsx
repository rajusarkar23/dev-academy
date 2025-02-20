import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin | Dashboard",
    description: "Admin Dashboard"
}

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            {children}
        </div>
    )
}