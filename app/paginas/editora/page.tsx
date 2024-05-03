import { fetchWrapper } from "../../api/fetch";
import EditoraTable from "./editora-table";
import { EditoraDTO } from "./EditoraDTO";

export interface searchQuery {
  search: string;
}

export default async function EditoraPage() {
  const fetchData = async () => {
  
      const data = await fetchWrapper<EditoraDTO[]>('api/produto/editora',
        {
          method: 'GET',
          cache: 'no-cache',
        });

      return data;
  }

  var data = await fetchData();

  return (
    <div className="mx-auto py-3">
      <div className="mx-auto">
        <p className="text-xl font-bold"> Consulta Editora </p>
      </div>
      <EditoraTable data={data} />
    </div>
  )
}
