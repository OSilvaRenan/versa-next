"use client"
import * as React from "react";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { apenasNumeros } from "../../functions/functions";
import ListaEditorasGrupo from "../../Combobox/ListaEditorasGrupo";
import PaginacaoEditora from "./paginacaoEditora";
import { EditoraDTO } from "./EditoraDTO";
import { DialogCadastroEditora } from "./DialogCadastroEditora";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Paginacao from "@/components/Paginacao";
import { CboData } from "@/app/Combobox/CboEstatica";

interface Props {
  data: EditoraDTO[]
}

export default function EditoraTable({ data }: Props) {

  const [filterValue, setFilterValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10; // Número de itens por página
  const [filteredData, setFilteredData] = useState<EditoraDTO[]>(data);
  const [editoras, setEditoras] = useState<EditoraDTO[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [codeditoragrupo, setCodeditoragrupo] = useState<string>('');
  const [dataCbo, setDataCbo] = useState<CboData>({
    Value: '',
    Description: ''
  });

  const searchParams = useSearchParams()!;
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  
  useEffect(() => {
    // Filtragem com base no filtro de valor
    const filteredByFilterValue = filterValue
      ? data.filter(editora =>
        apenasNumeros(filterValue)
          ? editora.Codeditora.toString().includes(filterValue)
          : editora.Nomeditora.toUpperCase().includes(filterValue.toUpperCase())
      )
      : data;

    // Filtragem adicional com base no código do grupo de editoras
    const filteredByCodeditoragrupo = dataCbo.Value != '-1'
      ? filteredByFilterValue.filter(editora =>
        editora.Codeditoragrupo.toString() === dataCbo.Value
      )
      : filteredByFilterValue;

    setFilteredData(filteredByCodeditoragrupo);
    setPageCount(Math.ceil(filteredByCodeditoragrupo.length / pageSize));
  }, [filterValue, dataCbo.Value, data, pageSize]);

  // Atualiza a lista de editoras na página atual
  useEffect(() => {
    const newEditoras = filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    setEditoras(newEditoras);
  }, [pageIndex, filteredData]);

  const goToPage = (pageNumber: number) => {
    setPageIndex(pageNumber);
    params.set('pg', (pageNumber + 1).toString());
    const query = params.size ? params.toString() : '';
    router.push('/paginas/editora?' + query);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
    setPageIndex(0);
  };

  useEffect(() => {
    params.set('pg', '1');
    setPageIndex(0);
    const query = params.size ? params.toString() : '';
    router.push('/paginas/editora?' + query);
  }, [pageCount]);

  // useEffect(() => {
  //   params.set('pg', '1');

  // }, [pageCount]);

  return (
    <div className="mx-auto">
      <div className="flex flex-row justify-between  py-2 self-center space-x-2">
        <span className="py-2 px-2"> Consulta Editora </span>
        <DialogCadastroEditora />
      </div>

      <Card className="min-h-[170px]">
        <CardContent className='container py-2'>
          <div className="flex items-end space-x-2 ">
            <div className='flex flex-col'>
              <Label className="py-2 " htmlFor="filtro">Filtro Editora: </Label>
              <div className='flex flex-row space-x-2'>
                <input
                  id="filtro"
                  value={filterValue}
                  onChange={handleFilterChange}
                  className="h-8 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm px-2 bg-white border"
                />
              </div>
            </div>
            <div className='flex flex-col'>
              <ListaEditorasGrupo classNameCombo="w-[200px] h-8" classNameLista="w-[200px] p-0"
                value={dataCbo} onChange={setDataCbo} id="cboEditoraGrupoFilter"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='my-5' >
        <Card className="min-h-[38rem]">
          <CardContent className='py-2'>
            <div className=" mx-auto py-2">
              {editoras.length == 0 ? <div className="py-4"> <span >Nenhuma editora encontrada</span> </div> :
                <Table className="container mx-auto max-h-8 p-2">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Editora</TableHead>
                      <TableHead>Editora Grupo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="py-0">
                    {editoras.map((editora) => (
                      <TableRow key={editora.Codeditora} className="py-0" >
                        <TableCell width="15px" className="h-2 p-0">{editora.Codeditora}</TableCell>
                        <TableCell width="500px">{editora.Nomeditora.trim()}</TableCell>
                        <TableCell width="500px">{editora.Nomeditoragrupo}</TableCell>
                        <TableCell className="space-x-2 flex items-center justify-start">
                          <DialogCadastroEditora codeditora={editora.Codeditora}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              }
            </div>
            <Paginacao dadosPage={{PageIndex: pageIndex,  TotalPage: pageCount, PageSize: pageSize}}
              // currentPage={pageIndex}
              // totalPages={pageCount}
              onPageChange={goToPage}
            />

          </CardContent>
        </Card >
      </div>
    </div>
  )
}
