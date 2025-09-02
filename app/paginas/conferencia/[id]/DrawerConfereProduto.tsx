import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { RegistraCaixaRequest, RegistraLeituraRequest, RegistraPesoRequest } from '../../../../DTO/ConferenciaDTO'; // Certifique-se de que o caminho está correto
import { useConferencia } from './ConferenciaContext';
import { RegistraCaixaConferencia, RegistraLeitura, RegistraPesoCaixa } from '@/dbs/ConferenciaDb';
import { ObtemCodigoProduto } from '@/dbs/ProdutoDb';

interface Props {
    // conferencia?: ConferenciaResponseDTO;
    // itensLidosLocal: conferenciaProdutoResponse[];
    // setItensLidosLocal: (value: conferenciaProdutoResponse[]) => void;
    // produtosConferencia: conferenciaProdutoResponse[];
    // loading: boolean;
    // setLoading: (value: boolean) => void;
    // AtualizaListas: () => void;
    // caixa: CaixaDTO;
    // setCaixa: (value: CaixaDTO) => void;
    // embalagem: CboData;
    // RegistraCaixa: () => void;
    // setLstcaixas: (value: CaixaResponseDTO[]) => void;
    // lstcaixas: CaixaResponseDTO[];
    // produtosLidos: conferenciaProdutoResponse[];
    // AdicionaLeitura: (novoItem: conferenciaProdutoResponse) => void;
}



export function DrawerConfereProduto({
    // produtosConferencia, embalagem, setLoading, AtualizaListas, conferencia,
    // caixa, setCaixa, RegistraCaixa, itensLidosLocal, setItensLidosLocal,
    //  setLstcaixas, lstcaixas
    // produtosLidos, AdicionaLeitura, 
}: Props) {
    const [open, setOpen] = useState(false);
    const [isbn, setIsbn] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [peso, setPeso] = useState('');
    const [habilitaFechamentoCaixa, setHabilitaFechamentoCaixa] = useState(false);
    const [habilitaQuantidade, setHabilitaQuantidade] = useState(false);

    const handlePesoChange = (e: any) => {
        const valor = e.target.value;
        if (/^[0-9]*\.?[0-9]*$/.test(valor) && valor.length <= 5) {
            setPeso(valor);
        }
    };

    const {
        RegistraCaixa,
        RegistraLeituraAvulsaConferencia,
        RegistraLeituraConferencia,
        conferencia,
        embalagem,
        setCaixa,
        caixa,
        itensLidosLocal,
        produtosConferencia,
        setLoading,
        FinalizaConferencia
    } = useConferencia();


    const FechaConferencia = async () => {
        FinalizaConferencia();
        OpenDialog();
    }

    const RegistrarCaixa = async () => {
        if (conferencia != null && conferencia.Codconferencia > 0 && conferencia.Codempresa > 0) {

            const request: RegistraCaixaRequest = {
                Codempresa: conferencia.Codempresa,
                Nrocaixa: caixa.Nrocaixa + 1,
                Codembalagem: parseInt(embalagem.Value),
            };

            const seqconferenciacaixa = await RegistraCaixaConferencia(conferencia.Codconferencia, request);

            if (seqconferenciacaixa != null && seqconferenciacaixa > 0) {
                RegistraCaixa(request.Nrocaixa, seqconferenciacaixa);
            }
        }
    }

    const RegistraCaixaPeso = async () => {
        try {
            setLoading(true);

            const request: RegistraPesoRequest = {
                Pesobruto: peso,
                PesoLiquido: caixa.PesoLiquido,
            };

            const seqconferenciacaixa = await RegistraPesoCaixa(conferencia!.Codconferencia, caixa.Nrocaixa, request);

            if (seqconferenciacaixa != null && seqconferenciacaixa > 0) {
                setCaixa({ ...caixa, Seqconferenciacaixa: seqconferenciacaixa });
                setPeso('');
                toast({
                    variant: "default",
                    description: "Caixa Fechada!",
                });
                HabilitaPeso();
                RegistrarCaixa();
            }

            // await axios.post(`${process.env.NEXT_PUBLIC_API_URL}conferencia/${conferencia!.Codconferencia}/pesocaixa/${caixa.Nrocaixa}`, request)
            //     .then(response => {
            //         setCaixa({ ...caixa, Seqconferenciacaixa: response.data });
            //         setPeso('');
            //         // const newItem = { ...itemEncontrado, Seqconferenciaitem: seqconferenciaitem, Quantidade: quantidade, Nrocaixa: caixa.Nrocaixa.toString() };
            //         // AdicionaLeitura(newItem);

            //         toast({
            //             variant: "default",
            //             description: "Caixa Fechada!",
            //         });
            //         HabilitaPeso();
            //         RegistraCaixa();
            //     });

        } catch (error) {
            toast({
                variant: "default",
                description: "Erro ao atualizar a quantidade separada: " + error,
            })
        }
    }


    const OpenDialog = () => {
        setOpen(!open);
        if (open == false) {
            setHabilitaQuantidade(false);
            setHabilitaFechamentoCaixa(false);
        }
    }

    const HabilitaPeso = () => {
        setHabilitaFechamentoCaixa(!habilitaFechamentoCaixa);
        setHabilitaQuantidade(false);
    };

    const HabilitaQuantidade = () => {
        setHabilitaQuantidade(!habilitaQuantidade);
        setHabilitaFechamentoCaixa(false);
    };

    // const ConfirmaPeso = (event: React.KeyboardEvent) => {
    //     if (event.key === 'Enter') {
    //         if (peso != "") {
    //             document.getElementById('btnConfirmar')?.focus();
    //         }
    //     }
    // };

    // const ConfirmaQuantidade = (event: React.KeyboardEvent) => {
    //     if (event.key === 'Enter') {
    //         if (quantidade > 0) {
    //             document.getElementById('btnConfirmar')?.focus();
    //         } else {
    //             toast({
    //                 variant: "destructive",
    //                 description: "Informe a quantidade!",
    //             });
    //         }
    //     }
    // };
    const RegistraLeituraAvulsa = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (habilitaQuantidade) {
            if (quantidade <= 0) {
                setCaixa(
                    {
                        Nrocaixa: 1,
                        Codembalagem: parseInt(embalagem.Value),
                        Dscembalagem: embalagem.Description,
                        Seqconferenciacaixa: caixa.Seqconferenciacaixa,
                        PesoBruto: 0,
                        PesoLiquido: 0
                    });
                toast({
                    variant: "default",
                    description: "Informe a quantidade!",
                });

            }
            HabilitaQuantidade();
            return;
        }


        if (habilitaFechamentoCaixa) {
            if (peso != "") {
                RegistraCaixaPeso();
                RegistrarCaixa();
            } else {
                toast({
                    variant: "destructive",
                    description: "Insira o peso!",
                });
            }

            return;
        }

        let itemEncontrado = itensLidosLocal.find(p => p.Isbn == isbn);

        if (itemEncontrado?.Codproduto == null || itemEncontrado?.Codproduto == 0) {
            const codproduto = await ObtemCodigoProduto(isbn);
            // await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/produto/isbn/${isbn}`)
            //     .then(response => {
            //     itemEncontrado!.Codproduto = response.data.Codproduto;
            // });
            if (codproduto != null && codproduto > 0) {
                itemEncontrado!.Codproduto = codproduto;
            }

        }

        // try {
        if (conferencia != null && conferencia.Codconferencia > 0) {
            const request: RegistraLeituraRequest = {
                Codempresa: conferencia!.Codempresa,
                Nrocaixa: caixa.Nrocaixa,
                Codembalagem: parseInt(embalagem.Value),
                Codproduto: itemEncontrado!.Codproduto,
                Quantidade: quantidade
            };

            const seqconferenciaitem = await RegistraLeitura(conferencia!.Codconferencia, request);

            if (itemEncontrado != null) {
                RegistraLeituraAvulsaConferencia(seqconferenciaitem, itemEncontrado, quantidade, isbn);
                setQuantidade(1);
            }
        }

        // await axios.post(`${process.env.NEXT_PUBLIC_API_URL}conferencia/${conferencia!.Codconferencia}/registraleitura`, request)
        //     .then(response => {


        //         });
        // } catch (error) {
        //     toast({
        //         variant: "default",
        //         description: "Erro ao atualizar a quantidade separada: " + error,
        //     })
        // }


        const itensNaoLidos = produtosConferencia.filter(item =>
            item.Qtdconferida < item.Quantidade
        );

        if (itensNaoLidos.length == 0) {
            if (peso != '' && parseFloat(peso) > 0) {
                FinalizaConferencia();
            } else {
                HabilitaPeso();
            }
            setIsbn("");
        }
    };

    const AtualizaQtdSeparada = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const itemEncontrado = produtosConferencia.find(item => item.Isbn.trim() === isbn.trim());
        setIsbn("");

        if (!itemEncontrado) {
            toast({
                variant: "destructive",
                description: "Item não encontrado!",
            });
            return;
        }

        if (habilitaQuantidade) {
            if (quantidade <= 0) {
                setCaixa(
                    {
                        Nrocaixa: 1,
                        Codembalagem: parseInt(embalagem.Value),
                        Dscembalagem: embalagem.Description,
                        Seqconferenciacaixa: caixa.Seqconferenciacaixa,
                        PesoBruto: 0,
                        PesoLiquido: 0
                    });
                toast({
                    variant: "default",
                    description: "Informe a quantidade!",
                });

            }
            HabilitaQuantidade();
            return;
        }

        if (habilitaFechamentoCaixa && peso != "" && parseFloat(peso) > 0 && itemEncontrado.Qtdconferida === itemEncontrado.Quantidade) {
            RegistraCaixaPeso();
            FechaConferencia();
            return;
        }

        if (habilitaFechamentoCaixa) {
            if (peso != "") {
                RegistraCaixaPeso();
            } else {
                toast({
                    variant: "destructive",
                    description: "Insira o peso!",
                });
            }

            return;
        }

        if (itemEncontrado.Quantidade <= itemEncontrado.Qtdconferida) {
            toast({
                variant: "destructive",
                description: "Item já lido!",
            });
            return;
        }
        if (quantidade + itemEncontrado.Qtdconferida > itemEncontrado.Quantidade) {
            toast({
                variant: "destructive",
                description: "A quantidade selecionada excede a quantidade do pedido!",
            });
            return;
        }

        if (quantidade > 0) {
            itemEncontrado.Qtdconferida += quantidade;
        } else {
            toast({
                variant: "destructive",
                description: "Não é possível conferir a quantidade!",
            });
            return;
        }

        // try {
            setLoading(true);

            const request: RegistraLeituraRequest = {
                Codempresa: itemEncontrado.Codempresa,
                Nrocaixa: caixa.Nrocaixa,
                Codembalagem: parseInt(embalagem.Value),
                Codproduto: itemEncontrado.Codproduto,
                Quantidade: quantidade
            };

            // await axios.post(`${process.env.NEXT_PUBLIC_API_URL}conferencia/${itemEncontrado.Codconferencia}/registraleitura`, request)
            // .then(response => {
            const seqconferenciaitem = await RegistraLeitura(conferencia!.Codconferencia, request);

            RegistraLeituraConferencia(seqconferenciaitem, itemEncontrado, quantidade);

            setQuantidade(1);
           
        // });

    // } catch (error) {
    //     toast({
    //         variant: "default",
    //         description: "Erro ao atualizar a quantidade separada: " + error,
    //     })
    // }

   
    // setProdutosLidos(prevProdutos => [...prevProdutos, newItem]);

    const itensNaoLidos = produtosConferencia.filter(item =>
        item.Qtdconferida < item.Quantidade
    );

    if (itensNaoLidos.length == 0) {

        if (peso != '' && parseFloat(peso) > 0) {
            FechaConferencia();
        } else {
            HabilitaPeso();
        }
    }
};

return (
    <>
        <Dialog open={open} onOpenChange={OpenDialog} modal={true}>
            <DialogTrigger asChild>
                <Button>Realizar Leitura</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={event => event.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Conferência de Produto</DialogTitle>
                    <DialogDescription>
                        {/* Informações adicionais sobre o item podem ser colocadas aqui */}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={conferencia != undefined && conferencia.Indavulso == 0 ? AtualizaQtdSeparada : RegistraLeituraAvulsa} className="grid items-start gap-4">
                    {!habilitaQuantidade && !habilitaFechamentoCaixa && (
                        <div className="grid gap-2">
                            <Label htmlFor="txtIsbn">ISBN:</Label>
                            <Input type="text" id="txtIsbn" autoFocus={true} required
                                value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                        </div>
                    )}
                    {habilitaQuantidade && (
                        <div className="grid gap-2">
                            <Label htmlFor="txtQuantidade">Quantidade:</Label>
                            <Input type="number" id="txtQuantidade" autoFocus={true} required
                                value={quantidade} onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    if (input.value.length > 7) {
                                        input.value = input.value.slice(0, 7);
                                    }
                                    setQuantidade(parseInt(input.value));
                                }} />
                        </div>
                    )}
                    {habilitaFechamentoCaixa && (
                        <div className="grid gap-2">
                            <Label htmlFor="txtPeso">Peso:</Label>
                            <Input type="text" id="txtPeso" autoFocus={true} required
                                value={peso} onChange={handlePesoChange} />
                        </div>
                    )}
                    <div className="grid">
                        <Button id="btnConfirmar" type="submit">Confirmar</Button>
                    </div>
                    <div className="flex space-x-2 items-center justify-between">
                        <Button id="btnQuantidade" className="w-[180px]" type="button" onClick={HabilitaQuantidade}>Quantidade</Button>
                        <Button id="btnFecharCaixa" className="w-[180px]" type="button" onClick={HabilitaPeso}>Fechar Caixa</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </>
);
}
