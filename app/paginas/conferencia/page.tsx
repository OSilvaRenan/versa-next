import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Filters from "./filters";
import { ConferenciaRequestDTO, ConferenciaResponseDTO } from "./ConferenciaDTO";
import Link from "next/link";
import { fetchWrapper } from "@/app/api/fetch";
import { PaginedList } from "../autor/columns";
import { formatarData } from "@/app/functions/functions";
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

    <div className="mx-auto py-3 ">
      <div className="mx-auto">
        <p className="text-xl font-bold"> Consulta Conferência </p>
      </div>
      <Filters />
      <div className="mx-auto ">
        {dados.length == 0 ? <span>Nenhuma conferência encontrada</span> :
          <Table className="container mx-auto max-h-20">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10px] max-w-[10px] min-w-[10px]">Código</TableHead>
                <TableHead>Data </TableHead>
                <TableHead>Situação</TableHead>
                <TableHead>Operação</TableHead>
                <TableHead>Cliente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dados.map((conferencia) => (
                <TableRow key={conferencia.Codconferencia}>
                  <TableCell className="font-medium w-[10px] max-w-[10px] min-w-[10px]"><Link href={"conferencia/" + conferencia.Codconferencia}>{conferencia.Codconferencia} </Link></TableCell>
                  <TableCell className="font-medium w-[20px] max-w-[20px] min-w-[20px]">{formatarData(conferencia.Datconferencia)}</TableCell>
                  <TableCell className="font-medium w-[20px] max-w-[20px] min-w-[20px]">{conferencia.Situacaoconferencia}</TableCell>
                  <TableCell className="font-medium w-[20px] max-w-[20px] min-w-[20px]">{conferencia.Nomoperacao}</TableCell>
                  <TableCell className="font-medium  w-[30px] max-w-[30px] min-w-[30px]">{conferencia.Nomcliente}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </div>
      <Paginacao page={page} />
    </div>
  )
}
