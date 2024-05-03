import AutorTable from "@/components/autor-table";
import { fetchWrapper } from "../../api/fetch";
import { AutorDTO, PaginedList } from "./columns";

export interface searchQuery {
  search: string;
}

interface Props {
  searchParams: searchQuery
}

export default async function AutorPage({ searchParams }: Props) {
  const fetchData = async () => {
    if (searchParams.search != undefined) {

      var request = {
        nomautor: searchParams.search
      }

      const data = await fetchWrapper<PaginedList<AutorDTO[]>>('api/produto/autor/pesquisa',
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request)
        });

      return data.Dados;
    } else {
      const data = await fetchWrapper<PaginedList<AutorDTO[]>>('api/produto/autor',
        {
          method: 'GET',
        });

      return data.Dados;

    }
  }

  var data = await fetchData();
  return (
    <AutorTable data={data} />
  )
}
