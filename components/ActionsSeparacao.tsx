"use client"

import * as React from "react"
import { Dialog } from "@radix-ui/react-dialog"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { AlertDialog, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"
import { AlertDialogContent } from "@radix-ui/react-alert-dialog"
import { toast } from "./ui/use-toast"



export function ActionsSeparacao() {
    const [open, setIsOpen] = React.useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

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
                        onSelect={() => setShowDeleteDialog(true)}
                        className="text-red-600 "
                    >
                        Cancelar Pedido          </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


        </>
    )
}