"use client"
import DadosUsuario from '@/components/DadosUsuario'
import MobileNav from '@/components/Responsivo/Menubar'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function NavBar() {
    const { data, status } = useSession();
    return (
        <nav className='flex max-w-full space-x-6 border-b h-14 items-center justify-between bg-slate-100 fixed top-0 left-0 w-full'>
            <div className='flex items-center justify-start '>
                <MobileNav />
                <div className='flex space-x-6 lg:p-2 pl-2'>
                    <Link href="/paginas/home" className='text-zinc-900 hover:text-zinc-400 transition-colors'>Logo</Link>
                    <ul className='flex '>
                        <li><Link href="/paginas/home" className='text-zinc-900 hover:text-zinc-400 transition-colors'>Inicio</Link></li>
                    </ul>
                </div>
            </div>
            {status === 'authenticated' ?
                <DadosUsuario nomeUsuario={data!.user?.Nome ?? ""} />
                :
                <div className='flex space-x-2 items-center pr-2'>
                    <Link href="/" className='text-zinc-900 hover:text-zinc-400 transition-colors'>Login</Link>
                </div>
            }
        </nav>

    )
}

