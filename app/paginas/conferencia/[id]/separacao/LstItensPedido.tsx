import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { DrawerAtualizaQtd } from './DrawerAtualizaQtd'
import { Skeleton } from '@/components/ui/skeleton'
import { separacaoResponse } from '../../ConferenciaDTO'

interface Props {
    params: { id: string };
}

export const LstItensPedido = ({ params }: Props) => {

    const [itens, setItens] = useState<separacaoResponse[]>([]);
    const [atualizaLista, setAtualizaLista] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const buscaItensConferencia = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${params.id}/separacao/produtos`).then(response => {
            setItens(response.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        buscaItensConferencia();
    }, [params.id, atualizaLista]);

    return (
        <div className='py-5' >
            <Card className="min-h-[14rem] ">
                <CardTitle className='container flex flex-row justify-between py-2 self-center space-x-2 h-8'>
                    <span className='h-8 py-1'>Itens deste pedido</span>
                    <DrawerAtualizaQtd itens={itens} setAtualizaLista={setAtualizaLista} atualizaLista={atualizaLista} />
                </CardTitle>
                <CardContent className='container py-2'>
                    <div className="container mx-auto min-h-14 py-2">
                        {loading ? <>
                            <Skeleton className="h-[50px] w-[300] bg-slate-300 my-2 " />
                            <Skeleton className="h-[200px] w-[300] bg-slate-300 my-2" />
                        </>
                            :
                            itens.length === 0 ? <span>Nenhum item encontrado</span> :
                                <Table className="mx-auto max-h-20">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Código</TableHead>
                                            <TableHead>Isbn </TableHead>
                                            <TableHead>Produto</TableHead>
                                            <TableHead>Qtd</TableHead>
                                            <TableHead>Qtd Separada</TableHead>
                                            <TableHead>Localização</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {itens.map((item) => (
                                            <TableRow key={item.Codproduto}>
                                                <TableCell className="font-medium">{item.Codproduto}</TableCell>
                                                <TableCell className="font-medium">{item.Isbn}</TableCell>
                                                <TableCell className="font-medium">{item.Nomproduto}</TableCell>
                                                <TableCell className="font-medium">{item.Quantidade}</TableCell>
                                                <TableCell className="font-medium">{item.Qtdseparada}</TableCell>
                                                <TableCell className="font-medium">{item.Localizacao}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
