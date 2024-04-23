import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import React from 'react'

export default function SideMenu() {
    return (

        <nav className='w-1/6 flex flex-col justify-between items-start border-b-1 pl-5 bg-slate-300 sticky' >
            <div className="flex flex-col justify-between items-center self-stretch mr-1 h-screen">
                <Accordion type="single" collapsible className='size-full self-center'>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Cadastro</AccordionTrigger>
                        <AccordionContent className="flex flex-col justify-between items-start self-stretch">
                           <Link href='/autor' className='text-zinc-500 hover:text-zinc-800 transition-colors'> Autor </Link>
                           <Link href='/conferencia' className='text-zinc-500 hover:text-zinc-800 transition-colors'> Conferência </Link>
                           <Link href='/editora' className='text-zinc-500 hover:text-zinc-800 transition-colors'> Editora </Link>
                           <Link href='/pagamento' className='text-zinc-500 hover:text-zinc-800 transition-colors'> Pagamento </Link>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

        </nav>
    )
}
