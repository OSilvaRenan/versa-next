import { formatarData } from "@/app/functions/functions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pesquisaConferencias } from "@/dbs/ConferenciaFetch";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Check, Pencil, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ConferenciaRequestDTO } from "../../../DTO/ConferenciaDTO";
import Filters from "./filters";
import Paginacao from "./paginacao";

export interface searchQuery {
    datInicio: Date;
    datFim: Date;
    tipoperiodo: string;
    codsituacao: string;
    codoperacao: string;
    codcliente: string;
    pg: string;
    codconferencia: string;
};

interface Props {
    searchParams: searchQuery
};

export default async function LstConferenciaPage({ searchParams }: Props) {
    
    const listaConferencias = async () => {
        const request: ConferenciaRequestDTO = {
            PeriodoInicial: searchParams.datInicio ? searchParams.datInicio : new Date(),
            PeriodoFinal: searchParams.datFim ? searchParams.datFim : new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
            Codoperacao: searchParams.codoperacao !== '-1' ? parseInt(searchParams.codoperacao) : 0,
            Codsituacao: searchParams.codsituacao !== '-1' ? parseInt(searchParams.codsituacao) : -1,
            Codcliente: searchParams.codcliente !== '-1' ? parseInt(searchParams.codcliente) : 0,
            PeriodoTipo: parseInt(searchParams.tipoperiodo),
            Codconferencia: searchParams.codconferencia ? parseInt(searchParams.codconferencia) : 0,
            Page: {
                RecordsCount: 0,
                PageIndex: searchParams.pg ? parseInt(searchParams.pg) : 1,
                PageSize: 10,
            }
        };

       return await pesquisaConferencias(request)
    }

    var lstConferencias = await listaConferencias();

    return (
        <div className="mx-5">
            <Filters />
            <div className='my-5' >
                <Card className="min-h-[35rem]">
                    <CardContent className='py-2'>
                        <div className="mx-auto">
                            {lstConferencias.Dados.length == 0 ?
                                <span>Nenhuma conferência encontrada</span>
                                :
                                <Table className=" mx-auto max-h-20">
                                    <TableHeader>
                                        <TableRow className="font-medium w-[5px] max-w-[5px] min-w-[5px]">
                                            <TableHead>Código</TableHead>
                                            <TableHead>Data</TableHead>
                                            <TableHead>Situação</TableHead>
                                            <TableHead>Operação</TableHead>
                                            <TableHead>Cliente</TableHead>
                                            <TableHead>Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {lstConferencias.Dados.map((conferencia: any) => (
                                            <TableRow key={conferencia.Codconferencia} className="h-2 p-0 w-full">
                                                <TableCell className="h-2 pl-4 w-[15px]" >{conferencia.Codconferencia}</TableCell>
                                                <TableCell className="w-[100px]">{formatarData(conferencia.Datconferencia)}</TableCell>
                                                <TableCell className="w-[300px] ">{conferencia.Situacaoconferencia}</TableCell>
                                                <TableCell className="w-[300px]">{conferencia.Nomoperacao}</TableCell>
                                                <TableCell className="w-[300px] ">{conferencia.Nomcliente}</TableCell>
                                                <TableCell className="lg:hidden " >
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild >
                                                            <Button variant="ghost">
                                                                <DotsHorizontalIcon />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className="w-[60px] min-w-[60px] max-w-[60px] rounded-md">
                                                            <DropdownMenuItem> <Button variant="ghost" className="p-2"><Link href="#">
                                                                <Pencil className="p-1" /></Link></Button>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Button variant="ghost" className="p-2">
                                                                    <Link href={"conferencia/" + conferencia.Codconferencia}>
                                                                        <Check className="p-1" /></Link></Button>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Button variant="ghost" className="p-2">
                                                                    <Link href={"conferencia/" + conferencia.Codconferencia + "/separacao"}><ShoppingCart className="p-1" />
                                                                    </Link>
                                                                </Button>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                                <TableCell className="hidden space-x-2 lg:flex items-center justify-start">
                                                    <Button variant="ghost" className="p-2">
                                                        <Link href="#"> <Pencil className="p-1" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" className="p-2">
                                                        <Link href={"conferencia/" + conferencia.Codconferencia}>
                                                            <Check className="p-1" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" className="p-2">
                                                        <Link href={"conferencia/" + conferencia.Codconferencia + "/separacao"}>
                                                            <ShoppingCart className="p-1" />
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                        )
                                        }
                                    </TableBody>
                                </Table>
                            }
                        </div>
                        <Paginacao page={lstConferencias.Page} rota="conferencia" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}