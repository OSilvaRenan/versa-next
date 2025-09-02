import LoginForm from '@/components/LoginForm'
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import '../globals.css'
import NavBar from '../NavBar'
import { AuthProvider } from '../providers/auth-provider'
import RotaProtegida from '../RotaProtegida'
import SideMenu from '../SideMenu'
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sistema Versa',
  description: 'Solução definitiva para o mercado livreiro',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <AuthProvider>
      <html lang="en" className={inter.className}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </meta>
        </head>
        <body className='max-h-screen max-w-full w-full  bg-slate-400'>
          <NavBar />
          <main className='flex'>
            <div className="hidden lg:flex flex-start pt-14 px-4">
            </div>
            <div className="lg:container w-full lg:ml-[16.7%] pb-4 pt-14">
              {children}
              <Toaster />
            </div>
          </main>
        </body>
      </html>
    </AuthProvider>
  )
}
