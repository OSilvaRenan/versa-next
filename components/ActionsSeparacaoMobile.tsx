"use client"

import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useRouter } from 'next/navigation'
import * as React from "react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"


interface Props {
    disabled: boolean;
    CancelarSeparacao: () => {}
}

export function ActionsSeparacaoMobile({ disabled, CancelarSeparacao }: Props) {
    const [open, setIsOpen] = React.useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
    const navigation = useRouter();

    return (
        <>

            <DropdownMenu >
                <DropdownMenuTrigger asChild >
                    <Button variant="secondary">
                        <span className="sr-only">Actions</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-100 p-2 m-1 rounded-md	">
                    <DropdownMenuItem
                        disabled={disabled}
                        onSelect={CancelarSeparacao}
                    >
                        Cancelar Separação
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Enviar P/Separação
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => setShowDeleteDialog(true)}
                        className="text-red-600 ">
                        Cancelar Pedido
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => navigation.back()}>
                        Voltar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}