import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <nav className='flex space-x-6 border-b px-5 h-14 items-center justify-between bg-slate-100 sticky top-0'>
            <div className='flex space-x-6 '>
                <Link href="/"> Logo</Link>
                <ul className='flex space-x-6'>
                    <li><Link href="/" className='text-zinc-500 hover:text-zinc-800 transition-colors'>Inicio</Link></li>
                </ul>
            </div>
            <div>
                <Link href="/login">Login</Link>
            </div>
        </nav>
    )
}

export default NavBar