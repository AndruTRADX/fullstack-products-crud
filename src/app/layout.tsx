import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { ProviderAuth } from '@/hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fullstack Tables',
  description: 'Thas was an aplication too CRUD data in tables, maincra',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ProviderAuth>
        <body className={inter.className}>{children}</body>
      </ProviderAuth>
    </html>
  )
}
