import { Page } from "@/app/paginas/conferencia/ConferenciaDTO";
import { Pagination, PaginationContent, PaginationItem, PaginationLast, PaginationNext, PaginationPrevious, PaginationStart } from "./ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface PaginacaoProps {
  dadosPage: Page;
  onPageChange: (page: number) => void;
}

const Paginacao: React.FC<PaginacaoProps> = ({ dadosPage, onPageChange }) => {
  const searchParams = useSearchParams()!;
  const router = useRouter();
  const params = new URLSearchParams(searchParams);



  function EnviaDadosPaginacao(index: number) {
    var totalPages = dadosPage.TotalPage != null ? dadosPage.TotalPage : 1
    index = Math.max(0, Math.min(index, totalPages - 1)); // Garante que o índice esteja dentro dos limites

    // if (index <= 0) {
    //   index = 1;
    // }

    if (index > totalPages) {
      index = totalPages;
    }
    onPageChange(index);

  }

  return (
    <div className="container flex items-center justify-between max-h-full mx-auto mb-3">
      <Pagination>
        <PaginationContent>
          {dadosPage.TotalPage != null && dadosPage.TotalPage > 1 && (
            <>
              <PaginationItem>
                <PaginationStart onClick={() => EnviaDadosPaginacao(0)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious onClick={() => EnviaDadosPaginacao(dadosPage.PageIndex - 1)} />
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <span className='text-sm'>
              {dadosPage.PageIndex + 1} / {dadosPage.TotalPage != null && dadosPage.TotalPage <= 1 ? 1 : dadosPage.TotalPage}
            </span>
          </PaginationItem>
          {dadosPage.TotalPage != null && dadosPage.TotalPage > 1 && (
            <>
              <PaginationItem>
                <PaginationNext onClick={() => EnviaDadosPaginacao(dadosPage.PageIndex + 1)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast onClick={() => EnviaDadosPaginacao(dadosPage.TotalPage != null ? dadosPage.TotalPage : 1)} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginacao;