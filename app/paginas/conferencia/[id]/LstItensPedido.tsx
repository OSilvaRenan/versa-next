import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrashIcon } from "@radix-ui/react-icons";
import { CaixaDTO, conferenciaCaixasResponseDTO, conferenciaItensResponseDTO, conferenciaProdutoResponseDTO, ConferenciaResponseDTO } from '../../../../DTO/ConferenciaDTO';
import { DrawerConfereProduto } from './DrawerConfereProduto';
import { CboData } from '@/app/Combobox/CboEstatica';
import { useConferencia } from './ConferenciaContext';
import { ExcluiCaixaConferencia, ExcluiLeituraConferencia } from '@/dbs/ConferenciaDb';


interface Props {
    // conferencia?: ConferenciaResponseDTO;
    // itensLidosLocal: conferenciaProdutoResponse[];
    // setItensLidosLocal: (value: conferenciaProdutoResponse[]) => void;
    // setLstcaixas: (value: CaixaResponseDTO[]) => void
    // itensConferencia: conferenciaItensResponse[];
    // produtosConferencia: conferenciaProdutoResponse[];
    exibirBtnLeitura: boolean;
    // lstcaixas: CaixaResponseDTO[];
    // caixa: CaixaDTO;
    // setCaixa: (value: CaixaDTO) => void;
    // ExcluirLeitura: (isbn: string, index: number, qtd: number) => void;
    // ExcluirCaixa: (codconferencia: number, nrocaixa: number) => void;
    // RegistraCaixa: () => void;
    // AtualizaListas: () => void;
    // AdicionaLeitura: (novoItem: conferenciaProdutoResponse) => void;
    // loading: boolean;
    // setLoading: (value: boolean) => void;
    // embalagem: CboData;
}

export const LstItensPedido = ({ exibirBtnLeitura
    // setLstcaixas,lstcaixas
    // itensConferencia, produtosConferencia, , loading, 
    // ExcluirLeitura, embalagem, setLoading, AtualizaListas, ExcluirCaixa, caixa, setCaixa, conferencia, RegistraCaixa,
    // itensLidosLocal,  setItensLidosLocal, 
}: Props) => {

    const {
        loading,
        ExcluirCaixa,
        ExcluirLeitura,
        itensLidosLocal,
        lstCaixas,
        produtosConferencia,
    } = useConferencia();

    const ExcluirLeituraConferencia = async (isbn: string, seqconferenciaitem: number, qtdconferida: number) => {
        await ExcluiLeituraConferencia(seqconferenciaitem);
        ExcluirLeitura(isbn, seqconferenciaitem, qtdconferida);
    }

    const ExcluirCaixasConferencia = async (codconferencia: number, nrocaixa: number) => {
        const seqconferenciacaixa = await ExcluiCaixaConferencia(codconferencia, nrocaixa);
        if (seqconferenciacaixa != null && seqconferenciacaixa > 0) {
            ExcluirCaixa(codconferencia, nrocaixa, seqconferenciacaixa);
        }
    }

    const CarregaTabelaItensLidosBanco = (itens: conferenciaItensResponseDTO[]) => (
        <Table className="max-h-full">
            <TableHeader>
                <TableRow>
                    <TableHead>Isbn</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Qtd Lida</TableHead>
                    <TableHead>Caixa</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {itens.sort((a, b) => b.Seqconferenciaitem - a.Seqconferenciaitem)
                    .map((item, index) => (
                        <TableRow key={index} className="h-2 p-0 w-full">
                            <TableCell className="font-medium w-[50px]">{item.Isbn}</TableCell>
                            <TableCell className="font-medium w-[300px]">{item.Nomproduto}</TableCell>
                            <TableCell className="font-medium w-[50px]">{item.Quantidade}</TableCell>
                            <TableCell className="font-medium w-[50px]">{item.Nrocaixa}</TableCell>
                            {exibirBtnLeitura && index === 0 && <TableCell className="font-medium w-[50px]" ><Button variant="ghost" onClick={() => ExcluirLeituraConferencia(item.Isbn, item.Seqconferenciaitem, item.Qtdconferida)}><TrashIcon /></Button></TableCell>}
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );

    const CarregaTabelaCaixa = (items: conferenciaCaixasResponseDTO[]) => (
        <Table className="max-h-full">
            <TableHeader>
                <TableRow>
                    {/* <TableHead>seqconferenciacaixa</TableHead> */}
                    <TableHead>Número</TableHead>
                    <TableHead>Embalagem</TableHead>
                    <TableHead>Peso</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={index} className="h-2 p-0 w-full">
                        {/* <TableCell className="font-medium w-[50px]">{item.Seqconferenciacaixa}</TableCell> */}
                        <TableCell className="font-medium w-[300px]">{item.Nrocaixa}</TableCell>
                        <TableCell className="font-medium w-[50px]">{item.Dscembalagem}</TableCell>
                        <TableCell className="font-medium w-[50px]">{item.Pesobruto}</TableCell>
                        {exibirBtnLeitura && index === 0 && <TableCell className="font-medium w-[50px]" ><Button variant="ghost" onClick={() => ExcluirCaixasConferencia(item.Codconferencia, item.Nrocaixa)}><TrashIcon /></Button></TableCell>}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
    // const CarregaTabelaItensLidos = (items: any[]) => (
    //     <Table className="max-h-full">
    //         <TableHeader>
    //             <TableRow>
    //                 <TableHead>Isbn - ItensLidosLocal</TableHead>
    //                 <TableHead>Produto</TableHead>
    //                 <TableHead>Qtd Lida</TableHead>
    //                 <TableHead>Caixa</TableHead>
    //             </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //             {items.toReversed().map((item, index) => (
    //                 <TableRow key={index} className="h-2 p-0 w-full">
    //                     <TableCell className="font-medium w-[50px]">{item.Isbn}</TableCell>
    //                     <TableCell className="font-medium w-[300px]">{item.Nomproduto}</TableCell>
    //                     <TableCell className="font-medium w-[50px]">{item.Quantidade}</TableCell>
    //                     <TableCell className="font-medium w-[50px]">{item.Nrocaixa}</TableCell>
    //                     {exibirBtnLeitura && index === 0 && <TableCell className="font-medium w-[50px]" ><Button variant="ghost" onClick={() => ExcluirLeitura(item.Isbn, item.Seqconferenciaitem)}><TrashIcon /></Button></TableCell>}
    //                 </TableRow>
    //             ))}
    //         </TableBody>
    //     </Table>
    // );

    const CarregaTabelaItensPedido = (items: conferenciaItensResponseDTO[]) => (
        <Table className="max-h-full">
            <TableHeader>
                <TableRow >
                    <TableHead>Isbn</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead>Qtd Conferida</TableHead>
                    <TableHead>Localização</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={index} className={item.Quantidade > item.Qtdconferida ? 'h-2 p-0 w-full' + ' text-red-500' : 'h-2 p-0 w-full'}>
                        <TableCell className="font-medium w-[100px] ">{item.Isbn}</TableCell>
                        <TableCell className="font-medium min-w-[400px] w-[400px] ">{item.Nomproduto}</TableCell>
                        <TableCell className="font-medium w-[100px]">{item.Quantidade}</TableCell>
                        <TableCell className="font-medium w-[100px]">{item.Qtdconferida}</TableCell>
                        <TableCell className="font-medium w-[100px]">{item.Localizacao}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <div className="py-5">
            <Card className="min-h-[14rem] p-0">
                <CardContent>
                    <Tabs defaultValue="leiturasRealizadas" >
                        <div className=" flex flex-row justify-between py-2 self-center h-8 w-full">
                            <TabsList>
                                <TabsTrigger value="leiturasRealizadas" className="font-medium w-full">
                                    Leituras Realizadas
                                </TabsTrigger>
                                <TabsTrigger value="itensPedido" className="font-medium w-full">
                                    Itens
                                </TabsTrigger>
                                <TabsTrigger value="caixa" className="font-medium w-full">
                                    Caixas
                                </TabsTrigger>
                            </TabsList>
                            {exibirBtnLeitura && (
                                <DrawerConfereProduto
                                // setLstcaixas={setLstcaixas} lstcaixas={lstcaixas}
                                // produtosConferencia={produtosConferencia} embalagem={embalagem} conferencia={conferencia}
                                //   loading={loading} setLoading={setLoading} AtualizaListas={AtualizaListas}
                                //     caixa={caixa} setCaixa={setCaixa} RegistraCaixa={RegistraCaixa} 
                                //     itensLidosLocal={itensLidosLocal} setItensLidosLocal={setItensLidosLocal}
                                />
                            )}
                        </div>

                        <TabsContent value="leiturasRealizadas" className="lg:min-h-[300px] lg:h-[300px] lg:max-h-[300px] min-h-auto py-3">
                            <div className="mx-auto min-h-14 py-2">
                                {loading ? (
                                    <>
                                        <Skeleton className="h-[50px] w-full bg-slate-300 my-2" />
                                        <Skeleton className="h-[100px] w-full bg-slate-300 my-2" />
                                    </>
                                ) : itensLidosLocal.length > 0 ? (
                                    CarregaTabelaItensLidosBanco(itensLidosLocal)
                                ) : <span>Nenhuma leitura realizada</span>
                                    //  : produtosLidos.length === 0 ? (
                                    //     <span>Nenhuma leitura realizada</span>
                                    // ) : (
                                    //     CarregaTabelaItensLidos(produtosLidos)
                                    // )
                                }
                            </div>
                        </TabsContent>
                        <TabsContent value="itensPedido" className="lg:min-h-[300px] lg:h-[300px] lg:max-h-[300px] min-h-auto py-3">
                            <div className="mx-auto min-h-14 py-2">
                                {loading ? (
                                    <>
                                        <Skeleton className="h-[50px] w-full bg-slate-300 my-2" />
                                        <Skeleton className="h-[100px] w-full bg-slate-300 my-2" />
                                    </>
                                ) : produtosConferencia.length > 0 ? (
                                    CarregaTabelaItensPedido(produtosConferencia)
                                ) : produtosConferencia.length === 0 && (
                                    <span>Nenhum item encontrado</span>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="caixa" className="lg:min-h-[300px] lg:h-[300px] lg:max-h-[300px] min-h-auto py-3">
                            <div className="mx-auto min-h-14 py-2">
                                {loading ? (
                                    <>
                                        <Skeleton className="h-[50px] w-full bg-slate-300 my-2" />
                                        <Skeleton className="h-[100px] w-full bg-slate-300 my-2" />
                                    </>
                                ) : lstCaixas.length > 0 ? (
                                    CarregaTabelaCaixa(lstCaixas)
                                ) : <span>Nenhuma Caixa encontrada</span>
                                    //  : produtosLidos.length === 0 ? (
                                    //     <span>Nenhuma leitura realizada</span>
                                    // ) : (
                                    //     CarregaTabelaItensLidos(produtosLidos)
                                    // )
                                }
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};
