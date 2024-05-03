"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { conferenciaResponse } from '../ConferenciaDTO'
import Paginacao from '../paginacao'

interface Props {
    params: { id: string };
}

export const LstItensPedido = ({ params }: Props) => {

    const [itens, setItens] = useState<conferenciaResponse[]>([]);
    const [atualizaLista, setAtualizaLista] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const buscaItensConferencia = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${params.id}/produtos`).then(response => {
            setItens(response.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        buscaItensConferencia();
    }, [params.id, atualizaLista]);


    return (
        <div className='py-5' >
            <Card>
                <CardTitle className=' container flex flex-row justify-between  py-2 self-center space-x-2 h-8'>
                    <span className='h-8 py-1'>Itens deste pedido</span>
                    <Button className="h-8">Adicionar Item</Button>
                </CardTitle>
                <CardContent className='container py-2'>
                    <div className="container mx-auto ">
                        {itens.length == 0 ? <span>Nenhuma conferência encontrada</span> :
                            <Table className="container mx-auto max-h-20">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Código</TableHead>
                                        <TableHead>Isbn </TableHead>
                                        <TableHead>Produto</TableHead>
                                        <TableHead>Qtd</TableHead>
                                        <TableHead>Qtd Conferida</TableHead>
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
                                            <TableCell className="font-medium">{item.Qtdconferida}</TableCell>
                                            <TableCell className="font-medium">{item.Localizacao}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        }
                    </div>
                    <Paginacao page={{
                        RecordsCount: 0,
                        PageIndex: 1,
                        PageSize: 10,
                    }} />
                </CardContent>
            </Card>
        </div>
    )
}
