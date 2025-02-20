import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin | Add new course",
    description: "Admin add new course"
}

export default function AddNewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            {children}
        </div>
    )
}