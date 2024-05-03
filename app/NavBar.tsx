"use client"
import DadosUsuario from '@/components/DadosUsuario'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function NavBar() {
    const { data, status } = useSession();
    return (
        <nav className='flex space-x-6 border-b px-5 h-14 items-center justify-between bg-slate-100 fixed top-0 left-0 w-full'>
            <div className='flex space-x-6 '>
                <Link href="/paginas/home" className='text-zinc-900 hover:text-zinc-400 transition-colors'>Logo</Link>
                <ul className='flex space-x-6'>
                    <li><Link href="/paginas/home" className='text-zinc-900 hover:text-zinc-400 transition-colors'>Inicio</Link></li>
                </ul>
            </div>
            {status === 'authenticated' ?
                <DadosUsuario nomeUsuario={data!.user?.Nome ?? ""} />
                :
                <div>
                    <Link href="/" className='text-zinc-900 hover:text-zinc-400 transition-colors'>Login</Link>
                </div>
            }
        </nav>

    )
}

