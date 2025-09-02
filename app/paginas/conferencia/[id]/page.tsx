"use client"
import { ActionsSeparacaoMobile } from '@/components/ActionsSeparacaoMobile';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CaixaDTO, conferenciaCaixasResponseDTO, conferenciaItensResponseDTO, conferenciaProdutoResponseDTO, ConferenciaResponseDTO } from '../../../../DTO/ConferenciaDTO';
import { FiltersItensPedido } from './FiltersItensPedido';
import { LstItensPedido } from './LstItensPedido';
import { toast } from '@/components/ui/use-toast';
import { CboData } from '@/app/Combobox/CboEstatica';
import { useConferencia } from '@/app/paginas/conferencia/[id]/ConferenciaContext';
import { ListaCaixasConferencia, ListaDadosConferencia, ListaLeituraItensConferencia, ListaProdutosConferencia } from '@/dbs/ConferenciaDb';

interface Props {
    params: { id: string };
}

const situacoesInvalidas = ["Finalizado", "Cancelado", "Em Onda", "Em Separação"];

export default function ConferenciaPage({ params }: Props) {

    // const [conferencia, setConferencia] = useState<ConferenciaResponseDTO>();
    // const [lstcaixas, setLstcaixas] = useState<CaixaResponseDTO[]>([]);
    // const [codembalagem, setCodembalagem] = useState("0");
    // const [embalagem, setEmbalagem] = useState<CboData>({ Value: '0', Description: '' });
    // const [caixa, setCaixa] = useState<CaixaDTO>({ Nrocaixa: 1, Codembalagem: parseInt(codembalagem), Dscembalagem: embalagem.Description, Seqconferenciacaixa: 0, PesoBruto: 0, PesoLiquido: 0 });
    // const [itensConferencia, setItensConferencia] = useState<conferenciaItensResponse[]>([]);
    // const [produtosConferencia, setProdutosConferencia] = useState<conferenciaProdutoResponse[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    const [atualizaLista, setAtualizaLista] = useState<boolean>(true);
    // const [itensLidosLocal, setItensLidosLocal] = useState<conferenciaProdutoResponse[]>([]);

    // const ReiniciaLeitura = () => {
    //     lstcaixas.forEach(caixa => {
    //         ExcluirCaixa(caixa.Codconferencia, caixa.Nrocaixa);
    //     });
    // }

    // const AdicionaLeitura = (novoItem: conferenciaProdutoResponse) => {
    //     setProdutosLidos(prevProdutos => [...prevProdutos, novoItem]);
    // }
    const {
        SetDadosConferencia,
        SetItensConferencia,
        SetProdutosConferencia,
        SetCaixasConferencia,
        ReiniciaLeitura,
        conferencia,
    } = useConferencia();

    useEffect(() => {
        // Usar os params para buscar dados de conferência ao montar o componente
        AtualizaListas();
    }, []);

    const AtualizaListas = () => {
        buscaDadosConferencia();
        buscaItensConferencia();
        buscaProdutosConferencia();
        buscaCaixasConferencia();
    }

    const buscaDadosConferencia = async () => {
        const dadosConferencia: ConferenciaResponseDTO = await ListaDadosConferencia(params.id);

        if (dadosConferencia) {
            SetDadosConferencia(dadosConferencia);
        }
    }

    const buscaItensConferencia = async () => {
        const itensConferencia: conferenciaItensResponseDTO[] = await ListaLeituraItensConferencia(params.id);

        if (itensConferencia) {
            SetItensConferencia(itensConferencia);
        }
    }

    const buscaProdutosConferencia = async () => {
        const produtosConferencia: conferenciaProdutoResponseDTO[] = await ListaProdutosConferencia(params.id);

        if (produtosConferencia) {
            SetProdutosConferencia(produtosConferencia);
        }
    }

    const buscaCaixasConferencia = async () => {
        const caixasConferencia: conferenciaCaixasResponseDTO[] = await ListaCaixasConferencia(params.id);

        if (caixasConferencia) {
            SetCaixasConferencia(caixasConferencia);
        }
    }

    // useEffect(() => {

    //         buscaCaixasConferencia(params.id);
    //         buscaProdutosConferencia(params.id);
    //         buscaItensConferencia(params.id);

    // }, [conferencia?.Codconferencia]);


    // const AtualizaListas = () => {   
    //         buscaDadosConferencia();
    //         buscaItensConferencia(params.id);
    //         buscaProdutosConferencia(params.id);
    //         buscaCaixasConferencia(params.id); 
    // }

    // const ExcluirCaixa = async (codconferencia: number, nrocaixa: number) => {
    //     try {
    //         if (codconferencia > 0 && nrocaixa > 0) {
    //             await axios.post(`${process.env.NEXT_PUBLIC_API_URL}conferencia/${codconferencia}/excluircaixa/${nrocaixa}`).then(response => {

    //                 setCaixa({
    //                     Nrocaixa: caixa.Nrocaixa > 1 ? caixa.Nrocaixa - 1 : 1,
    //                     Codembalagem: parseInt(codembalagem),
    //                     Dscembalagem: embalagem.Description,
    //                     Seqconferenciacaixa: response.data,
    //                     PesoBruto: 0,
    //                     PesoLiquido: 0
    //                 });
    //                 // const itensLido = ProdutosLidos.filter(item => item.Seqconferenciaitem !== seqconferenciaitem);
    //                 // setProdutosLidos(itensLido);
    //                 toast({
    //                     variant: "default",
    //                     description: "Caixa Excluida",
    //                 });
    //                 AtualizaListas();
    //             });

    //         } else {
    //             toast({
    //                 variant: "destructive",
    //                 description: "Erro ao excluir leitura",
    //             });
    //         }

    //     } catch (error) {
    //         toast({
    //             variant: "destructive",
    //             description: "Erro ao excluir leitura: " + error,
    //         });
    //     }
    // }

    // const RegistraCaixa = async () => {
    //     try {
    //         const request = {
    //             Codempresa: conferencia!.Codempresa,
    //             Nrocaixa: caixa.Nrocaixa + 1,
    //             Codembalagem: codembalagem,
    //         };

    //         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}conferencia/${conferencia!.Codconferencia}/registracaixa`, request)
    //             .then(response => {
    //                 setCaixa({
    //                     Nrocaixa: request.Nrocaixa,
    //                     Codembalagem: parseInt(codembalagem),
    //                     Dscembalagem: embalagem.Description,
    //                     Seqconferenciacaixa: response.data,
    //                     PesoBruto: 0,
    //                     PesoLiquido: 0
    //                 });

    //                 AtualizaListas();

    //             });

    //     } catch (error) {
    //         toast({
    //             variant: "default",
    //             description: "Erro ao atualizar a quantidade separada: " + error,
    //         })
    //     }
    // }

    // const ExcluirLeitura = async (isbn: string, seqconferenciaitem: number, qtd: number) => {
    //     try {

    //         if (isbn != "" && seqconferenciaitem != null) {

    //             const itemEncontrado = itensConferencia.find(p => p.Seqconferenciaitem == seqconferenciaitem);

    //             await axios.post(`${process.env.NEXT_PUBLIC_API_URL}conferencia/excluirleitura/${seqconferenciaitem}`).then(response => {
    //                 // const itensLido = ProdutosLidos.filter(item => item.Seqconferenciaitem !== seqconferenciaitem);
    //                 // setProdutosLidos(itensLido);
    //                 // AtualizaListas();            
    //                 const leiturasRestantes = itensLidosLocal.filter(p => !(p.Isbn === isbn && p.Seqconferenciaitem === seqconferenciaitem));

    //                 setItensLidosLocal(leiturasRestantes);

    //                 const novaListaProdutosConferencia = produtosConferencia.map(produto => {
    //                     if (produto.Isbn === isbn) {
    //                         const novaQtdConferida = produto.Qtdconferida - qtd;
    //                         produto.Qtdconferida = novaQtdConferida;
    //                         return produto;
    //                     }
    //                     return produto;
    //                 });

    //                 setProdutosConferencia(novaListaProdutosConferencia);

    //                 if (itemEncontrado) {
    //                     setCaixa({ ...caixa, PesoLiquido: caixa.PesoLiquido - (itemEncontrado.Quantidade * itemEncontrado.Peso) })
    //                 }
    //             });

    //         } else {
    //             toast({
    //                 variant: "default",
    //                 description: "Erro ao excluir leitura",
    //             });
    //         }

    //     } catch (error) {
    //         toast({
    //             variant: "default",
    //             description: "Erro ao excluir leitura: " + error,
    //         });
    //     }
    // }

    // const buscaDadosConferencia = async () => {
    //     try {
    //         setLoading(true);
    //         await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${params.id}`).then(response => {
    //             setConferencia(response.data);
    //             setLoading(false);
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }

    // };

    // const buscaCaixasConferencia = async () => {
    //     try {
    //         setLoading(true);
    //         await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${params.id}/caixas`).then(response => {
    //             setLstcaixas(response.data);
    //             setLoading(false);
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const buscaProdutosConferencia = async () => {
    //     try {
    //         setLoading(true);
    //         await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${params.id}/separacao/produtos`).then(response => {
    //             setProdutosConferencia(response.data);
    //             // setProdutosLidos(response.data);
    //             setLoading(false);
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const buscaItensConferencia = async () => {
    //     try {
    //         setLoading(true);
    //         await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${params.id}/itens`).then(response => {
    //             setItensConferencia(response.data);
    //             setItensLidosLocal(response.data);

    //             setLoading(false);
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        AtualizaListas();
    }, [params.id, atualizaLista]);

    const navigation = useRouter();

    const exibirBtnLeitura = !situacoesInvalidas.includes(conferencia?.Situacaoconferencia ?? "");

    return (
        <div className="mx-5">
            <div className="flex flex-row justify-between py-2 self-center">
                <span className="py-2 px-2"> Pedido Nº {params.id} | {conferencia?.Situacaoconferencia}</span>
                <div className='hidden lg:flex space-x-2 align-bottom '>
                    {exibirBtnLeitura && <Button variant="default" onClick={ReiniciaLeitura} >Reinicializar Leitura </Button>}
                    <Button variant="secondary"
                        onClick={() => navigation.back()}
                        type="button">Voltar</Button>
                </div>
                {/* <div className='lg:hidden flex'>
                    <ActionsSeparacaoMobile disabled={conferencia?.Indseparacao == 9 ? false : true}
                        CancelarSeparacao={CancelarSeparacao} />
                </div> */}
            </div>
            <FiltersItensPedido params={params}
            //  conferencia={conferencia} codembalagem={codembalagem} setCodembalagem={setCodembalagem} setEmbalagem={setEmbalagem}
            />
            <LstItensPedido exibirBtnLeitura={exibirBtnLeitura}
            // produtosConferencia={produtosConferencia} itensConferencia={itensConferencia} setLoading={setLoading} embalagem={embalagem}
            //     loading={loading} ExcluirLeitura={ExcluirLeitura}AtualizaListas={AtualizaListas}
            //     caixa={caixa} setCaixa={setCaixa} lstcaixas={lstCaixas} setLstcaixas={setLstCaixas} ExcluirCaixa={ExcluirCaixa}
            //     RegistraCaixa={RegistraCaixa} conferencia={conferencia}
            //     itensLidosLocal={itensLidosLocal} setItensLidosLocal={setItensLidosLocal}
            />
        </div>
    );
};

