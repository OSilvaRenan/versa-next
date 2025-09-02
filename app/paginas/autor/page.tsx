import { fetchWrapper } from "@/app/api/fetch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Pencil } from "lucide-react";
import Link from "next/link";
import Paginacao from "../conferencia/paginacao";
import { AutorDTO } from "../../../DTO/AutorDTO";
import Filters from "./filters";
import { PaginedList } from "@/DTO/PageDTO";

interface searchQuery {
    search: string;
}

interface Props {
    searchParams: searchQuery
};

export default async function AutorPage({ searchParams }: Props) {
    const fetchData = async () => {
        if (searchParams.search != undefined) {

            var request = {
                nomautor: searchParams.search
            }


            const data = await fetchWrapper<PaginedList<AutorDTO>>('api/produto/autor/pesquisa', {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request)
            });

            return data;
        }

    }

    var data = await fetchData();
    var dados = data?.Dados;
    var page = data?.Page;

    return (
        <div className="mx-5">
            <Filters />
            <div className='my-5' >
                <Card className="min-h-[35rem]">
                    <CardContent className='py-2'>
                        <div className="mx-auto">
                            {dados != undefined && dados.length > 0 ?
                                <Table className=" mx-auto max-h-20">
                                    <TableHeader>
                                        <TableRow className="font-medium w-[5px] max-w-[5px] min-w-[5px]">
                                            <TableHead>Código</TableHead>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {dados?.map((autor) => (
                                            <TableRow key={autor.Codautor} className="h-2 p-0 w-full">
                                                <TableCell className="h-2 pl-4 w-[50px]" >{autor.Codautor}</TableCell>
                                                <TableCell className="w-[600px] ">{autor.Nomautor}</TableCell>

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
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                                <TableCell className="hidden space-x-2 lg:flex items-center justify-start">
                                                    <Button variant="ghost" className="p-2">
                                                        <Link href="#"> <Pencil className="p-1" />
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                        )
                                        }
                                    </TableBody>
                                </Table>
                                :
                                <span>Nenhum autor encontrado</span>
                            }
                        </div>
                        {page != undefined ?
                            <Paginacao page={page!} rota="autor" />
                            : null
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}