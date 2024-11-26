import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import React from 'react'

export default function SideMenu() {
    return (
        <nav className='hidden md:flex gap-2 w-1/6 flex-col justify-between items-start border-b-1 bg-slate-500 py-2 fixed top-18 left-0 h-full' >
            <div className="flex flex-col justify-between items-center self-stretch mr-1 h-screen">
                <Accordion type="single" collapsible className='size-full self-center'>
                    <AccordionItem value="item-1" className='px-5'>
                        <AccordionTrigger className='text-zinc-300 hover:text-zinc-700 transition-colors py-2'>Cadastro</AccordionTrigger>
                        <AccordionContent className="flex flex-col justify-between items-start self-stretch gap-1">
                           <Link href='/paginas/autor' className='text-zinc-300 hover:text-zinc-800 transition-colors'> Autor </Link>
                           <Link href='/paginas/conferencia' className='text-zinc-300 hover:text-zinc-800 transition-colors'> Conferência </Link>
                           <Link href='/paginas/consultapreco' className='text-zinc-300 hover:text-zinc-800 transition-colors'> Consulta Preço </Link>
                           <Link href='/paginas/editora' className='text-zinc-300 hover:text-zinc-800 transition-colors'> Editora </Link>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </nav>
    )
}
