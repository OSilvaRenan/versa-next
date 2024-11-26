"use client";
import { useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data, status } = useSession();

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    status === 'authenticated' ?
    <div className="lg:hidden max-w-full ">
      <button onClick={() => setOpen(!open)} className="btn-icon px-2 h-14 flex items-center ">
        {!open ? <MenuIcon className='transition-colors'/> : <X className='transition-colors'/>}
      </button>
      {open && (
        <div className="fixed z-50 bg-slate-500 text-white flex justify-between items-start h-full w-full max-w-full">
          <Accordion type="single" collapsible className='size-full self-center'>
            <AccordionItem value="item-1" className='px-5'>
              <AccordionTrigger className='text-zinc-300 hover:text-zinc-700 transition-colors py-2'>Cadastro</AccordionTrigger>
              <AccordionContent className="flex flex-col justify-between items-start self-stretch gap-1">
                <Link href='/paginas/autor' className='text-zinc-300 hover:text-zinc-800 transition-colors' onClick={handleLinkClick}> Autor </Link>
                <Link href='/paginas/conferencia' className='text-zinc-300 hover:text-zinc-800 transition-colors' onClick={handleLinkClick}> Conferência </Link>
                <Link href='/paginas/consultapreco' className='text-zinc-300 hover:text-zinc-800 transition-colors' onClick={handleLinkClick}> Consulta Preços </Link>
                <Link href='/paginas/editora' className='text-zinc-300 hover:text-zinc-800 transition-colors' onClick={handleLinkClick}> Editora </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
    :
    null
  );
}
