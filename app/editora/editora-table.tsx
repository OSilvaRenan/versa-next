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
import { apenasNumeros } from "../functions/functions";
import ListaEditorasGrupo from "../Combobox/FilterEditoraGrupo";
import PaginacaoEditora from "./paginacaoEditora";
import { EditoraDTO } from "./EditoraDTO";
import { DialogCadastroEditora } from "./DialogCadastroEditora";

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
    const filteredByCodeditoragrupo = codeditoragrupo
      ? filteredByFilterValue.filter(editora =>
        editora.Codeditoragrupo.toString() === codeditoragrupo
      )
      : filteredByFilterValue;

    setFilteredData(filteredByCodeditoragrupo);
    setPageCount(Math.ceil(filteredByCodeditoragrupo.length / pageSize));
  }, [filterValue, codeditoragrupo, data, pageSize]);

  // Atualiza a lista de editoras na página atual
  useEffect(() => {
    const newEditoras = filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    setEditoras(newEditoras);
  }, [pageIndex, filteredData]);

  const goToPage = (pageNumber: number) => {
    setPageIndex(pageNumber);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
    setPageIndex(0);
  };

  return (
    <div className="mx-auto">
      <div className="flex items-end justify-between max-h-full mx-auto py-2">
        <div className="flex items-end space-x-5 ">
          <div className='flex flex-col'>
            <Label className="py-2 " htmlFor="filtro">Filtro Editora: </Label>
            <div className='flex flex-row space-x-2'>
              <input
                id="filtro"
                value={filterValue}
                onChange={handleFilterChange}
                className="h-8 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium px-2"
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <ListaEditorasGrupo value={''} description={""} />
          </div>
        </div>
        <DialogCadastroEditora />
      </div>
      <div className="mx-auto ">
        {editoras.length == 0 ? <div className="py-4"> <span >Nenhuma editora encontrada</span> </div> :
          <Table className="container mx-auto max-h-10">
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium min-w-2 w-2 max-win-2 border-spacing-1">Código</TableHead>
                <TableHead className="font-medium min-w-10 w-10 max-win-10">Editora</TableHead>
                <TableHead className="font-medium min-w-10 w-10 max-win-10">Editora Grupo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="h-5">
              {editoras.map((editora) => (
                <TableRow key={editora.Codeditora}>
                  <TableCell className="font-medium w-[30px] max-w-[30px] min-w-[30px] ">{editora.Codeditora}</TableCell>
                  <TableCell width="70px" className="font-medium w-[200px] max-w-[200px] min-w-[200px]">{editora.Nomeditora.trim()}</TableCell>
                  <TableCell width="70px" className="font-medium w-[200px] max-w-[200px] min-w-[200px]">{editora.Nomeditoragrupo}</TableCell>
                  <TableCell width="70px" className="font-medium min-w-10 w-10 max-win-10">
                    <DialogCadastroEditora codeditora={editora.Codeditora}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </div>
      <PaginacaoEditora
        currentPage={pageIndex}
        totalPages={pageCount}
        onPageChange={goToPage}
      />
    </div>
  )
}
