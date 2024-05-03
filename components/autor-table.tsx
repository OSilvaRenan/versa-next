"use client"
// import { DataTable } from "@/app/editora/data-table/data-table";
import Search from "@/components/search";
import { AutorDTO, columns } from "@/app/paginas/autor/columns";
import { useEffect, useState } from "react";
import { fetchWrapper } from "@/app/api/fetch";
import FilterAutor from "@/app/Combobox/Filters/FilterAutor";

interface Props {
  data: AutorDTO[]
}


export default function AutorTable({ data }: Props) {

  // const [autores, setAutores] = useState<AutorDTO[]>([]);


  return (
    <div className="container mx-auto py-10 ">
      <h2> Autores </h2>
      <br></br>
      <Search />
      {/* <DataTable columns={columns} data={data} /> */}
      
    </div>
  )
}
