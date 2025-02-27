import TopLoader from "@/components/TopLoader"
import { Providers } from "./providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopLoader />
          {children}
        </Providers>
      </body>
    </html>
  )
}