import React, { useEffect } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLast, PaginationLink, PaginationNext, PaginationPrevious, PaginationStart } from '@/components/ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginacaoProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginacaoEditora: React.FC<PaginacaoProps> = ({currentPage, totalPages, onPageChange }) => {
  const searchParams = useSearchParams()!;
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    params.set('pg', '1');
    const query = params.size ? params.toString() : '';
    router.push('/editora?' + query);
  }, [totalPages]);

  function EnviaDadosPaginacao(index: number) {
    index = Math.max(0, Math.min(index, totalPages - 1)); // Garante que o índice esteja dentro dos limites

    if (index > 0) {
      params.set('pg', index.toString());
    }

    onPageChange(index);

    const query = params.size ? params.toString() : '';
    router.push('/editora?' + query);
  }

  return (
    <div className="container flex items-center justify-between max-h-full mx-auto mb-3">
      <Pagination>
        <PaginationContent>
          {totalPages > 1 && (
            <>
              <PaginationItem>
                <PaginationStart onClick={() => EnviaDadosPaginacao(0)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious onClick={() => EnviaDadosPaginacao(currentPage - 1)} />
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationLink className='px-8'>
              {currentPage + 1} / {totalPages <= 1 ? 1 : totalPages}
            </PaginationLink>
          </PaginationItem>
          {totalPages > 1 && (
            <>
              <PaginationItem>
                <PaginationNext onClick={() => EnviaDadosPaginacao(currentPage + 1)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast onClick={() => EnviaDadosPaginacao(totalPages)} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginacaoEditora;
