"use client";
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import BarcodeScanner from '@/components/scanner/BarcodeScanner';
import axios from 'axios';
import { Camera, CameraOff, Package, Search } from 'lucide-react';
import { formatarDinheiro } from '@/app/functions/functions';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Paginacao from '../conferencia/paginacao';
import { Page } from '@/DTO/PageDTO';

interface Produtos {
  Codproduto: number;
  Titulo: string;
  Isbn: string;
  Pathimage: string;
  Preco: string;
}
interface PaginedList<T> {
  Dados: T[];
  Page: Page;
}

export interface searchQuery {
  pg: string;
};

interface Props {
  searchParams: searchQuery
};

export default function ConsultaPrecoPage({ searchParams }: Props) {

  const [searchQuery, setSearchQuery] = useState('');
  const [camera, setCamera] = useState(false);
  const [open, setOpen] = useState(false);
  const [produtos, setProdutos] = useState<PaginedList<Produtos>>();
  
  const [loading, setLoading] = useState(false);
    
  const handleDetected = (code: string) => {
    setSearchQuery(code);
    buscaProduto();
    setCamera(false);
    setOpen(false);
  };

  function OpenDialog() {
    setOpen(open => !open);
    setCamera(camera => !camera);
  };

  useEffect(() => {

    if(searchQuery != ""){
      buscaProduto();

    }
}, [searchParams.pg ]);

const buscaProduto = async () => {
    setLoading(true);
    const isISBN = /^[0-9]{10,13}$/.test(searchQuery.trim()); // Validação simples de ISBN (10 ou 13 dígitos)
    const request = {
      Nome: isISBN ? "" : searchQuery.trimEnd(),
      Editora: "",
      ISBN: isISBN ? searchQuery.trim() : "",
      PageIndex: searchParams.pg ? parseInt(searchParams.pg) : 1,
      PageSize: 10,
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/produto/consultapreco`, request);
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setProdutos({Dados: [], Page: {PageIndex: 0, PageSize: 0, RecordsCount: 0}});
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      buscaProduto();
    }
  };

  return (
    <div className="mx-5">
      <div className="flex flex-row justify-between py-2 self-center">
        <span className="py-2">Consulta Preço</span>
      </div>
      <Card className="min-h-[170px] max-w-full">
        <CardContent>
          <div className="flex flex-wrap lg:space-x-2 items-end">
            <div className="flex flex-col mb-2 lg:mb-0 mr-1">
              <Label className="py-2" htmlFor="isbn">
                Isbn:
              </Label>
              <Input
                type="text"
                id="isbn"
                name="isbn"
                className="h-8 w-full lg:w-[300px] max-w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex flex-col mb-2 lg:mb-0 mr-1">
              <Dialog open={open} onOpenChange={OpenDialog} modal={true} >
                <DialogTrigger
                  asChild
                  className="flex items-center justify-center h-8"
                >
                  <Button variant="default" >{camera ? <CameraOff /> : <Camera />}</Button>
                </DialogTrigger>
                <DialogContent className='w-full'>
                  <DialogHeader>
                    <DialogTitle>Scanear Código de Barras</DialogTitle>
                  </DialogHeader>
                  <div className="p-0 lg:mt-2 justify-items-start">
                    {camera && <BarcodeScanner onDetected={handleDetected} />}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-col mb-2 lg:mb-0">
              <Button onClick={buscaProduto} type="button" id="btnSearch" className="h-8">
                <Search />
              </Button>
            </div>
          </div>

          <div className="container mx-auto p-4">
            {loading && <p>Carregando...</p>}
            {!loading && produtos?.Dados.length === 0 && <p>Nenhum produto encontrado</p>}
            {!loading && produtos &&
              produtos.Dados.map((produto) => (
                <div
                  key={produto.Codproduto}
                  className="max-w-full w-full rounded overflow-hidden shadow-lg bg-white p-4 mb-4 flex items-center"
                >
                  <div className="flex-1">
                    <div className="font-bold text-xl mb-2">
                      {produto.Titulo}
                    </div>
                    <p className="text-gray-700 text-base">
                      <strong>ISBN:</strong> {produto.Isbn}
                    </p>
                    <p className="text-gray-700 text-base">
                      <strong>Valor:</strong> {formatarDinheiro(produto.Preco)}
                    </p>
                  </div>
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0 flex justify-center items-center ml-4">
                    {produto.Pathimage ? (
                      <img
                        src={produto.Pathimage}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Package className="h-8 w-8 text-gray-700" />
                    )}
                  </div>
                </div>
              ))}
          </div>
          {produtos?.Page? 
           <Paginacao page={produtos?.Page!} rota="consultapreco" />  
          : null}
        </CardContent>
      </Card>
    </div>
  );
}
