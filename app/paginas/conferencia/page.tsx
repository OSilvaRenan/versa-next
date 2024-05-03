import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Filters from "./filters";
import { ConferenciaRequestDTO, ConferenciaResponseDTO } from "./ConferenciaDTO";
import Link from "next/link";
import { fetchWrapper } from "@/app/api/fetch";
import { PaginedList } from "../autor/columns";
import { formatarData } from "@/app/functions/functions";
import Paginacao from "./paginacao";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Check, Pencil, ShoppingCart } from "lucide-react";

export interface searchQuery {
  datInicio: Date;
  datFim: Date;
  tipoperiodo: string;
  codsituacao: string;
  codoperacao: string;
  codcliente: string;
  pg: string;
  codconferencia: string;
}

interface Props {
  searchParams: searchQuery
}

export default async function ConferenciaPage({ searchParams }: Props) {

  const fetchData = async () => {
    var request: ConferenciaRequestDTO = {
      PeriodoInicial: searchParams.datInicio ? searchParams.datInicio : new Date(),
      PeriodoFinal: searchParams.datFim ? searchParams.datFim : new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
      Codoperacao: searchParams.codoperacao ? parseInt(searchParams.codoperacao) : 0,
      Codsituacao: searchParams.codsituacao ? parseInt(searchParams.codsituacao) : 0,
      Codcliente: searchParams.codcliente ? parseInt(searchParams.codcliente) : 0,
      PeriodoTipo: parseInt(searchParams.tipoperiodo),
      Codconferencia: searchParams.codconferencia ? Number.parseInt(searchParams.codconferencia) : 0,
      Page: {
        RecordsCount: 0,
        PageIndex: searchParams.pg ? parseInt(searchParams.pg) : 1,
        PageSize: 10,
      }
    }

    const data = await fetchWrapper<PaginedList<ConferenciaResponseDTO[]>>('api/conferencia/pesquisa',
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request)
      });

    return data;

  }

  var data = await fetchData();
  var dados = data.Dados;
  var page = data.Page;

  return (
    <div className="mx-auto">
      <Filters />

      <div className='my-5' >
        <Card className="min-h-[38rem]">
          <CardContent className='py-2'>
            <div className=" mx-auto py-2">
              {dados.length == 0 ? <span>Nenhuma conferência encontrada</span> :
                <Table className="container mx-auto max-h-20">
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
                    {dados.map((conferencia) => (
                      <TableRow key={conferencia.Codconferencia} className="h-2 p-0">
                        <TableCell className="h-2 p-0" width="15px" >{conferencia.Codconferencia}</TableCell>
                        <TableCell width="100px" >{formatarData(conferencia.Datconferencia)}</TableCell>
                        <TableCell width="300px">{conferencia.Situacaoconferencia}</TableCell>
                        <TableCell width="300px">{conferencia.Nomoperacao}</TableCell>
                        <TableCell width="300px">{conferencia.Nomcliente}</TableCell>
                        <TableCell className="space-x-2 flex items-center justify-start">
                          <Button variant="ghost" className="p-2"><Link href="#"> <Pencil className="p-1" /></Link></Button>
                          <Button variant="ghost" className="p-2"><Link href={"conferencia/" + conferencia.Codconferencia}><Check className="p-1" /></Link></Button>
                          <Button variant="ghost" className="p-2"><Link href={"conferencia/" + conferencia.Codconferencia + "/separacao"}><ShoppingCart className="p-1" /></Link></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              }
            </div>
            <Paginacao page={page} />
          </CardContent>
        </Card>
      </div>
    </div>

  )
}
