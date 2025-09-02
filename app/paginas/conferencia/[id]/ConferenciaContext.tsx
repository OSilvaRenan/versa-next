import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { CaixaDTO, conferenciaCaixasResponseDTO, conferenciaItensResponseDTO, conferenciaProdutoResponseDTO, ConferenciaResponseDTO } from '../../../../DTO/ConferenciaDTO';
import { CboData } from '@/app/Combobox/CboEstatica';
import { toast } from '@/components/ui/use-toast';
import { separacaoResponse } from '@/DTO/SeparacaoDTO';

interface ConferenciaContextProps {
    loading: boolean;
    setLoading: (value: boolean) => void;
    lstCaixas: conferenciaCaixasResponseDTO[];
    setLstCaixas: (value: conferenciaCaixasResponseDTO[]) => void;
    produtosConferencia: conferenciaProdutoResponseDTO[];
    setProdutosConferencia: (value: any[]) => void;
    itensConferencia: conferenciaItensResponseDTO[];
    itensLidosLocal: conferenciaProdutoResponseDTO[];
    setItensLidosLocal: (value: conferenciaProdutoResponseDTO[]) => void;
    SetDadosConferencia: (dadosConferencia: ConferenciaResponseDTO) => Promise<void>;
    SetItensConferencia: (itensConferencia: conferenciaItensResponseDTO[]) => Promise<void>;
    SetProdutosConferencia: (produtosConferencia: conferenciaProdutoResponseDTO[]) => Promise<void>;
    SetCaixasConferencia: (caixasConferenica: conferenciaCaixasResponseDTO[]) => Promise<void>;
    ExcluirLeitura: (isbn: string, seqconferenciaitem: number, qtd: number) => Promise<void>;
    SetDadosSeparacao: (itensSeparacao: separacaoResponse[]) => Promise<void>;
    ExcluirCaixa: (codconferencia: number, nrocaixa: number, seqconferenciacaixa: number) => Promise<void>;
    FinalizaConferencia: () => Promise<void>;
    RegistraCaixa: (nrocaixa: number, seqconferenciacaixa: number) => Promise<void>;
    RegistraLeituraAvulsaConferencia: (seqconferenciaitem: number, itemEncontrado: conferenciaProdutoResponseDTO, quantidade: number, isbn: string) => Promise<void>;
    RegistraLeituraConferencia: (seqconferenciaitem: number, itemEncontrado: conferenciaProdutoResponseDTO, quantidade: number) => Promise<void>;
    AtualizaListas: () => void;
    ReiniciaLeitura: () => void;
    caixa: CaixaDTO;
    setCaixa: (value: CaixaDTO) => void;
    conferencia: ConferenciaResponseDTO | undefined;
    setConferencia: (value: ConferenciaResponseDTO) => void;
    codembalagem: string;
    setCodembalagem: (value: string) => void;
    embalagem: CboData;
    setEmbalagem: (value: CboData) => void;
    itensSeparacao: separacaoResponse[];
    itemSeparacao: separacaoResponse | undefined;
    AtualizaItemSeparacao: () => void;
}

const ConferenciaContext = createContext<ConferenciaContextProps | undefined>(undefined);

export const useConferencia = (): ConferenciaContextProps => {
    const context = useContext(ConferenciaContext);
    if (!context) {
        throw new Error('Erro no Contexto');
    }
    return context;
};

interface ConferenciaProviderProps {
    children: ReactNode;
    params: { id: string };
}

export const ConferenciaProvider: React.FC<ConferenciaProviderProps> = ({ children, params }) => {
    const [loading, setLoading] = useState(false);
    const [conferencia, setConferencia] = useState<ConferenciaResponseDTO>();
    const [codembalagem, setCodembalagem] = useState("0");
    const [seqconferenciaitem, setSeqconferenciaitem] = useState(0);
    const [embalagem, setEmbalagem] = useState<CboData>({ Value: '0', Description: '' });
    const [lstCaixas, setLstCaixas] = useState<conferenciaCaixasResponseDTO[]>([]);
    const [caixa, setCaixa] = useState<CaixaDTO>({ Nrocaixa: 1, Codembalagem: parseInt(codembalagem), Dscembalagem: embalagem.Description, Seqconferenciacaixa: 0, PesoBruto: 0, PesoLiquido: 0 });
    const [produtosConferencia, setProdutosConferencia] = useState<conferenciaProdutoResponseDTO[]>([]);
    const [itensConferencia, setItensConferencia] = useState<conferenciaItensResponseDTO[]>([]);
    const [itensLidosLocal, setItensLidosLocal] = useState<conferenciaItensResponseDTO[]>([]);
    const [itensSeparacao, setItensSeparacao] = useState<separacaoResponse[]>([]);

    const encontrarPrimeiroItemValido = useCallback(() => {
        return itensSeparacao.find(item => item.Qtdseparada < item.Quantidade)!;
    }, [itensSeparacao]);

    const [itemSeparacao, setItemSeparacao] = useState<separacaoResponse>(encontrarPrimeiroItemValido);


    const AtualizaItemSeparacao = () => {
        setItemSeparacao(encontrarPrimeiroItemValido);
    }

    const AtualizaListas = () => {
        //     // buscaDadosConferencia();
        //     // BuscaItensConferencia(params.id);
        //     // buscaProdutosConferencia(params.id);
        //     // buscaCaixasConferencia(params.id);
    }

    const ReiniciaLeitura = () => {
        lstCaixas.forEach(caixa => {
            ExcluirCaixa(caixa.Codconferencia, caixa.Nrocaixa, caixa.Seqconferenciacaixa);
        });
    }

    const SetDadosConferencia = async (dadosConferencia: ConferenciaResponseDTO) => {
        try {
            setLoading(true);
            // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${params.id}`);
            // setConferencia(response.data);
            setConferencia(dadosConferencia);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const SetItensConferencia = async (itensConferencia: conferenciaItensResponseDTO[]) => {
        try {
            setLoading(true);
            // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${codconferencia}/itens`);
            // setItensConferencia(response.data);
            // setItensLidosLocal(response.data);
            setItensConferencia(itensConferencia);
            setItensLidosLocal(itensConferencia);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const SetProdutosConferencia = async (produtosConferencia: conferenciaProdutoResponseDTO[]) => {
        try {
            setLoading(true);
            // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${codconferencia}/separacao/produtos`);
            // setProdutosConferencia(response.data);
            setProdutosConferencia(produtosConferencia);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const SetCaixasConferencia = async (caixasConferenica: conferenciaCaixasResponseDTO[]) => {
        try {
            setLoading(true);
            // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${codconferencia}/caixas`);
            // setLstCaixas(response.data);
            setLstCaixas(caixasConferenica);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const ExcluirLeitura = async (isbn: string, seqconferenciaitem: number, qtd: number) => {
        try {
            if (isbn !== "" && seqconferenciaitem !== null) {
                const itemEncontrado = itensConferencia.find(p => p.Seqconferenciaitem === seqconferenciaitem);

                // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}conferencia/excluirleitura/${seqconferenciaitem}`);
                const leiturasRestantes = itensLidosLocal.filter(p => !(p.Isbn === isbn && p.Seqconferenciaitem === seqconferenciaitem));
                setItensLidosLocal(leiturasRestantes);

                const novaListaProdutosConferencia = produtosConferencia.map(produto => {
                    if (produto.Isbn === isbn) {
                        const novaQtdConferida = produto.Qtdconferida - qtd;
                        produto.Qtdconferida = novaQtdConferida;
                        return produto;
                    }
                    return produto;
                });

                setProdutosConferencia(novaListaProdutosConferencia);

                if (itemEncontrado) {
                    setCaixa({ ...caixa, PesoLiquido: caixa.PesoLiquido - (itemEncontrado.Quantidade * itemEncontrado.Peso) });
                }

            } else {
                toast({
                    variant: "default",
                    description: "Erro ao excluir leitura",
                });
            }

        } catch (error) {
            toast({
                variant: "default",
                description: "Erro ao excluir leitura: " + error,
            });
        }
    };

    const ExcluirCaixa = async (codconferencia: number, nrocaixa: number, seqconferenciacaixa: number) => {
        try {
            if (codconferencia > 0 && nrocaixa > 0) {
                // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}conferencia/${codconferencia}/excluircaixa/${nrocaixa}`);
                setCaixa({
                    Nrocaixa: caixa.Nrocaixa > 1 ? caixa.Nrocaixa - 1 : 1,
                    Codembalagem: parseInt(codembalagem),
                    Dscembalagem: embalagem.Description,
                    // Seqconferenciacaixa: response.data,
                    Seqconferenciacaixa: seqconferenciacaixa,
                    PesoBruto: 0,
                    PesoLiquido: 0
                });
                toast({
                    variant: "default",
                    description: "Caixa Excluida",
                });
                AtualizaListas();
            } else {
                toast({
                    variant: "destructive",
                    description: "Erro ao excluir leitura",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Erro ao excluir leitura: " + error,
            });
        }
    };

    const RegistraCaixa = async (nrocaixa: number, seqconferenciacaixa: number) => {
        try {
            // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}conferencia/${conferencia!.Codconferencia}/registracaixa`, request);
            setCaixa({
                // Nrocaixa: request.Nrocaixa,
                Nrocaixa: nrocaixa,
                Codembalagem: parseInt(codembalagem),
                Dscembalagem: embalagem.Description,
                // Seqconferenciacaixa: response.data,
                Seqconferenciacaixa: seqconferenciacaixa,
                PesoBruto: 0,
                PesoLiquido: 0
            });

            AtualizaListas();
        } catch (error) {
            toast({
                variant: "default",
                description: "Erro ao atualizar a quantidade separada: " + error,
            });
        }
    };

    const RegistraLeituraAvulsaConferencia = async (seqconferenciaitem: number, itemEncontrado: conferenciaProdutoResponseDTO, quantidade: number, isbn: string) => {
        toast({
            variant: "default",
            description: "Item lido com sucesso!",
        });


        const novaLeitura: conferenciaProdutoResponseDTO = {
            Codempresa: conferencia!.Codempresa,
            Nrocaixa: caixa.Nrocaixa.toString(),
            Codproduto: itemEncontrado!.Codproduto,
            Qtdconferida: quantidade,
            Codconferencia: conferencia!.Codconferencia,
            Isbn: itemEncontrado!.Isbn,
            Quantidade: quantidade,
            Nomproduto: itemEncontrado!.Nomproduto,
            Peso: itemEncontrado!.Peso,
            Localizacao: itemEncontrado!.Localizacao,
            Seqconferenciaitem: seqconferenciaitem
        }
        setItensLidosLocal([...itensLidosLocal, novaLeitura]);

        let produtoEncontrado = produtosConferencia.find(p => p.Isbn === isbn);

        if (!produtoEncontrado) {
            const produtoConferencia = {
                Codconferencia: conferencia!.Codconferencia,
                Codempresa: conferencia!.Codempresa,
                Codproduto: itemEncontrado!.Codproduto,
                Isbn: itemEncontrado!.Isbn,
                Quantidade: quantidade,
                Nomproduto: itemEncontrado!.Nomproduto,
                Peso: itemEncontrado!.Peso,
                Localizacao: itemEncontrado!.Localizacao,
                Seqconferenciaitem: seqconferenciaitem,
                Nrocaixa: caixa.Nrocaixa.toString(),
                Qtdconferida: quantidade
            };

            setProdutosConferencia([...produtosConferencia, produtoConferencia]);
        } else {
            produtoEncontrado.Quantidade += quantidade;
            produtoEncontrado.Qtdconferida += quantidade;

            setProdutosConferencia([...produtosConferencia]);
        }

        setCaixa({ ...caixa, PesoLiquido: caixa.PesoLiquido + (quantidade * itemEncontrado!.Peso) });

        const caixaEncontrada = lstCaixas.find(c => c.Seqconferenciacaixa === caixa.Seqconferenciacaixa);

        if (caixaEncontrada == undefined) {
            const objCaixaParaLista: conferenciaCaixasResponseDTO = {
                Seqconferenciacaixa: caixa.Seqconferenciacaixa,
                Codempresa: conferencia!.Codempresa,
                Codconferencia: conferencia!.Codconferencia,
                Nrocaixa: caixa.Nrocaixa,
                Pesobruto: caixa.PesoBruto,
                Codembalagem: caixa.Codembalagem,
                Dscembalagem: embalagem.Description
            }
            setLstCaixas([...lstCaixas, objCaixaParaLista]);
        }

        setLoading(false);
        setSeqconferenciaitem(seqconferenciaitem + 1);
    }

    const RegistraLeituraConferencia = async (seqconferenciaitem: number, itemEncontrado: conferenciaProdutoResponseDTO, quantidade: number) => {
        setSeqconferenciaitem(seqconferenciaitem);

        toast({
            variant: "default",
            description: "Item lido com sucesso!",
        });

        const novaLeitura: conferenciaProdutoResponseDTO = {
            Codempresa: conferencia!.Codempresa,
            Nrocaixa: caixa.Nrocaixa.toString(),
            Codproduto: itemEncontrado!.Codproduto,
            Qtdconferida: quantidade,
            Codconferencia: conferencia!.Codconferencia,
            Isbn: itemEncontrado!.Isbn,
            Quantidade: quantidade,
            Nomproduto: itemEncontrado!.Nomproduto,
            Peso: itemEncontrado!.Peso,
            Localizacao: itemEncontrado!.Localizacao,
            Seqconferenciaitem: seqconferenciaitem
        }
        setItensLidosLocal([...itensLidosLocal, novaLeitura]);

        setCaixa({ ...caixa, PesoLiquido: caixa.PesoLiquido + (quantidade * itemEncontrado!.Peso) });

        const caixaEncontrada = lstCaixas.find(c => c.Seqconferenciacaixa === caixa.Seqconferenciacaixa);

        if (caixaEncontrada == undefined) {
            const objCaixaParaLista: conferenciaCaixasResponseDTO = {
                Seqconferenciacaixa: caixa.Seqconferenciacaixa,
                Codempresa: conferencia!.Codempresa,
                Codconferencia: conferencia!.Codconferencia,
                Nrocaixa: caixa.Nrocaixa,
                Pesobruto: caixa.PesoBruto,
                Codembalagem: caixa.Codembalagem,
                Dscembalagem: embalagem.Description
            }
            setLstCaixas([...lstCaixas, objCaixaParaLista]);
        }
        setSeqconferenciaitem(seqconferenciaitem + 1);
        setLoading(false);
    }

    const FinalizaConferencia = async () => {
        try {

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}conferencia/${conferencia!.Codconferencia}/finalizaconferencia`)
                .then(response => {
                    AtualizaListas();
                    toast({
                        variant: "default",
                        description: "Conferência finalizada com sucesso!",
                    });

                });

        } catch (error) {
            toast({
                variant: "default",
                description: "Erro ao atualizar a quantidade separada: " + error,
            })
        }
    }

    const SetDadosSeparacao = async (itensSeparacao: separacaoResponse[]) => {
        setLoading(true);
        setItensSeparacao(itensSeparacao);
        setLoading(false);
    }


    return (
        <ConferenciaContext.Provider value={{
            loading,
            setLoading,
            lstCaixas,
            setLstCaixas,
            produtosConferencia,
            setProdutosConferencia,
            RegistraLeituraAvulsaConferencia,
            RegistraLeituraConferencia,
            itensConferencia,
            itensLidosLocal,
            setItensLidosLocal,
            caixa,
            setCaixa,
            conferencia,
            setConferencia,
            codembalagem,
            setCodembalagem,
            embalagem,
            setEmbalagem,
            itensSeparacao,
            itemSeparacao,
            SetDadosConferencia,
            SetItensConferencia,
            SetProdutosConferencia,
            SetCaixasConferencia,
            ExcluirLeitura,
            ExcluirCaixa,
            RegistraCaixa,
            AtualizaListas,
            ReiniciaLeitura,
            SetDadosSeparacao,
            FinalizaConferencia,
            AtualizaItemSeparacao
        }}>
            {children}
        </ConferenciaContext.Provider>
    );
};
