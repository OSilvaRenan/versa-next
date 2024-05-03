"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"
import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { FormQtd } from "./FormQtd"
import { separacaoResponse } from "./page"

interface Props {
    itens: separacaoResponse[];
    className?: React.ComponentProps<"form">;
    setAtualizaLista: (value: boolean) => void;
    atualizaLista: boolean;
}

export function DrawerAtualizaQtd({ itens, setAtualizaLista, atualizaLista }: Props) {

    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [permiteCampos, setPermiteCampos] = useState<boolean>(false);

    const encontrarPrimeiroItemValido = useCallback(() => {
        return itens.find(item => item.Qtdseparada < item.Quantidade)!;
    }, [itens, permiteCampos]);

    // Inicializa o estado do item com o primeiro item válido
    const [item, setItem] = useState<separacaoResponse | undefined>();
    const [index, setIndex] = useState(item ? itens.indexOf(item) : 0);
    const [qtdSeparada, setQtdSeparada] = useState<number>(item ? item.Qtdseparada : 0);

    function OpenDialog() {
        if (open) {
            setItem(encontrarPrimeiroItemValido);
            setIndex(0);

        } else {
            setPermiteCampos(false);
        }
        setAtualizaLista(!atualizaLista);
        setOpen(open => !open);
    };

    function abrirAvisoUltimoItem() {
        setOpenAlert(open => !open);
    };

    useEffect(() => {
        let itemAtual = encontrarPrimeiroItemValido();
        if (itemAtual !== undefined) {
            setItem(itemAtual);
            setQtdSeparada(itemAtual.Qtdseparada)
            setIndex(itens.indexOf(itemAtual));
        }

    }, [open]);

    const ProximoItem = useCallback(() => {

        let novoIndex = index + 1;
        let itemAtual = itens.slice(novoIndex).find(item => item.Qtdseparada < item.Quantidade);

        if (itemAtual) {
            setItem(itemAtual);
            setIndex(itens.indexOf(itemAtual));
            setPermiteCampos(false);
            setQtdSeparada(itemAtual.Qtdseparada);

        } else {
            abrirAvisoUltimoItem()
        }
    }, [index, itens]);

    return (
        <>

            <Dialog open={open} onOpenChange={OpenDialog} modal={true}>
                <DialogTrigger asChild>
                    <Button >Inicia Separação</Button>
                </DialogTrigger>
                {item ?
                    <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={event => event.preventDefault()}>
                        <DialogHeader>
                            <DialogTitle>Separação {item.Codconferencia}</DialogTitle>
                            <DialogDescription>
                                {item.Localizacao ? <span> <b> Localização: </b>{item.Localizacao}</span> : "Esse item não possuilocalização cadastrada."}<br />
                                {permiteCampos ? <>
                                    <span><b>Produto: </b> {item.Isbn ? item.Isbn : ""} - {item.Nomproduto ? item.Nomproduto : ""} </span><br />
                                    {item.Quantidade ? <span> <b>Qtde Solicitada: </b>{item.Quantidade}</span> : ""}
                                    <span> <b>a Conferir: </b> {qtdSeparada > 0 ? item.Quantidade - qtdSeparada : item.Qtdseparada} </span>
                                </> : null}
                            </DialogDescription>
                        </DialogHeader>
                        <FormQtd item={item} ProximoItem={ProximoItem}
                            permiteCampos={permiteCampos} setPermiteCampos={setPermiteCampos}
                            qtdSeparada={qtdSeparada} setQtdSeparada={setQtdSeparada}
                        />
                        {permiteCampos ? <Button type="button" onClick={ProximoItem}>Próximo Item</Button> : null}
                    </DialogContent>
                    : null}
            </Dialog>

            <AlertDialog open={openAlert} onOpenChange={abrirAvisoUltimoItem}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Você chegou ao último item!</AlertDialogTitle>
                        <AlertDialogDescription>
                            Deseja sair da separação?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Não</AlertDialogCancel>
                        <AlertDialogAction onClick={OpenDialog}>Sim</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}


