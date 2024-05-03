"use client"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react";

interface props {
    nomeUsuario: string;
}

export default function DadosUsuario({ nomeUsuario }: props) {

    function Deslogar() {
        signOut({
            redirect: true,
            callbackUrl: '/' 
        })
    }
    return (
        <div className='flex space-x-2 items-center'>
            <span className='text-zinc-900 hover:text-zinc-400 transition-colors'>
                {nomeUsuario}
            </span>
            <Button variant={"secondary"} onClick={() => Deslogar()}><LogOut /></Button>
        </div>
    )
}