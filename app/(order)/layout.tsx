import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Order | Dev Academy",
};

export default function OrderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    );
}
