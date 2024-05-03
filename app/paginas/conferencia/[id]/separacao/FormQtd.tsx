import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { separacaoResponse } from "./page";

interface PropsForm {
    item: separacaoResponse;
    className?: React.ComponentProps<"form">;
    permiteCampos: boolean;
    setPermiteCampos: (value: boolean) => void;
    ProximoItem: () => void;
    qtdSeparada: number;
    setQtdSeparada: (value: number) => void;
}

export function FormQtd({ item, className, permiteCampos, setPermiteCampos, ProximoItem, qtdSeparada, setQtdSeparada }: PropsForm) {
    const { toast } = useToast();
    const [localizacao, setLocalizacao] = useState('');
    const [isbn, setIsbn] = useState('');
    const [qtdLote, setQtdLote] = useState('1');
    const [habilitaCampo, setHabilitaCampo] = useState(false);

    const HabilitaQtdLote = useCallback(() => {
        setHabilitaCampo(true);
    }, [qtdLote, habilitaCampo]);

    const DesabilitaQtdLote = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            setHabilitaCampo(false);
            SelecionaCampo();
        }
    }, [qtdLote, habilitaCampo]);

    const ConferePeloEnter = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            AtualizaQtdSeparada()
        }
    }, [localizacao, isbn, item, setPermiteCampos]);

    const SelecionaCampo = () => {
        const inputISBN = document.getElementById('isbn') as HTMLInputElement;
        const inputLocalizacao = document.getElementById('localizacao') as HTMLInputElement;

        if (permiteCampos) {
            inputISBN?.focus();
        } else {
            inputLocalizacao?.focus();
        }
    };

    useEffect(() => {
        SelecionaCampo();
    }, [permiteCampos]);

    const AtualizaQtdSeparada = useCallback(async () => {
        if (permiteCampos && item) {
            if (qtdSeparada < item.Quantidade) {
                if (isbn != '') {
                    let qtdSeparar = qtdLote == '' || qtdLote == '0' ? qtdSeparada + 1 : qtdSeparada + parseInt(qtdLote);
                    try {
                        const request = {
                            Codconferencia: item.Codconferencia,
                            localizacao: localizacao ? localizacao : item.Localizacao,
                            Isbn: isbn,
                            QtdSeparada: qtdSeparar
                        };
                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/atualizaqtdseparada`, request).then(response => {

                            setIsbn('');
                            SelecionaCampo();
                            setQtdSeparada(qtdSeparar);
                            setQtdLote('1');
                            if (qtdSeparar == item.Quantidade) {
                                ProximoItem();
                            }
                        });
                    } catch (error) {
                        toast({
                            variant: "default",
                            description: "Erro ao atualizar a quantidade separada: " + error,
                        })
                    }
                } else {
                    toast({
                        variant: "destructive",
                        description: "Informe o ISBN!",
                    })
                }
            } else {
                toast({
                    variant: "default",
                    description: "Todos itens já foram separados: ",
                })
            }
        } else {
            if (item.Localizacao === localizacao || item.Localizacao == '') {
                setPermiteCampos(true);
            } else {
                toast({
                    variant: "destructive",
                    description: "Informe a Localização correta!",
                })
            }
        }
    }, [permiteCampos, item, localizacao, isbn, qtdSeparada]);

    return (
        <form className={cn("grid items-start gap-4", className)} >
            {permiteCampos == false ?
                <div className="grid gap-2">
                    <Label htmlFor="localizacao">Localização:</Label>
                    <Input type="text" id="localizacao" onChange={(e) => setLocalizacao(e.target.value)} onKeyDown={ConferePeloEnter} />
                </div> :
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="isbn">ISBN:</Label>
                        <Input id="isbn" className={habilitaCampo ? "bg-gray-200" : ""}
                            value={isbn} onChange={(e) => setIsbn(e.target.value)}
                            readOnly={habilitaCampo ? habilitaCampo : false} onKeyDown={ConferePeloEnter} />
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3">
                            <div className="grid">
                                <Label htmlFor="qtdseparada">Qtd Separada:</Label>
                            </div>
                            <div className="grid">
                                <Label htmlFor="qtdlote">Qtd Lote:</Label>
                            </div>
                        </div>
                        <div className="grid grid-cols-3" >
                            <div className="grid pr-2">
                                <Input id="qtdseparada" value={qtdSeparada} type="number" readOnly={true} className="bg-gray-200" />
                            </div>
                            <div className="grid pr-2">
                                <Input id="qtdlote" type="number" className={!habilitaCampo ? "bg-gray-200" : ""}
                                    value={qtdLote} onChange={(e) => setQtdLote(e.target.value)}
                                    readOnly={habilitaCampo ? false : true} onKeyDown={DesabilitaQtdLote} />
                            </div>
                            <div className="grid">
                                <Button className="grid" type="button" onClick={HabilitaQtdLote}>Lote</Button>
                            </div>
                        </div>
                    </div>

                </>
            }

            <Button type="button" onClick={AtualizaQtdSeparada}>Confirmar</Button>
        </form >
    )
}