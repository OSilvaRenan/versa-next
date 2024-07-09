"use client"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLast,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationStart
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { Page } from './ConferenciaDTO';

interface Props {
    page: Page
}

const Paginacao = ({ page }: Props) => {

    const searchParams = useSearchParams()!;
    const router = useRouter();
    const nroPages = Math.ceil(page.RecordsCount! / page.PageSize);
    const [pg, setPg] = useState(searchParams.get('pg') || '1');
    const params = new URLSearchParams(searchParams);

    useEffect(() => {
        params.set('pg', '1');
        const query = params.size ? params.toString() : '';
        router.push('/paginas/conferencia?' + query);
      }, [nroPages]);

    function EnviaDadosPaginacao(index: number) {

        if (index <= 0) {
            index = 1;
        }

        if (index > nroPages) {
            index = nroPages;
        }

        if (pg) {
            params.set('pg', index.toString());
        }

        setPg(index.toString());

        const query = params.size ? params.toString() : '';
        router.push('/paginas/conferencia?' + query);
    }

    return (

        <div className="container flex items-center justify-between max-h-full mx-auto mb-3">
            {page.RecordsCount! > 0 && nroPages > 0 ?
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationStart onClick={() => { EnviaDadosPaginacao(1) }} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => { EnviaDadosPaginacao(parseInt(pg) - 1) }} />
                        </PaginationItem>
                        <span className='text-sm'>
                            {page.PageIndex} / {nroPages}
                        </span>
                        <PaginationItem>
                            <PaginationNext onClick={() => { EnviaDadosPaginacao(parseInt(pg) + 1) }} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLast onClick={() => { EnviaDadosPaginacao(nroPages) }} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
                : null}
        </div>
    )
};

export default Paginacao;

