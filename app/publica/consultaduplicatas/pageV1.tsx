"use client";
import { FormataCNPJCPF, formatarData, formatarDinheiro } from '@/app/functions/functions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { ClipboardCopy, Receipt, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Conta {
  Codconta: number;
  NroDocumento: string;
  Codcliente: number;
  CNPJ: string;
  Nomcliente: string;
  Datvencto: string;
  Vlrvencto: string;
  LinhaDigitavel: string;
  Urlboleto: string;
}
export interface searchQuery {
  pg: string;
};

interface Props {
  searchParams: searchQuery
};

export default function ConsultaContasPage({ searchParams }: Props) {
  const [cnpj, setCnpj] = useState('');
  // const [email, setEmail] = useState('');
  const [contas, setContas] = useState<Conta[]>([]);
  const [loading, setLoading] = useState(false);
  const [cnpjError, setCnpjError] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const cnpjRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cnpj !== "") {
      buscaContas();
    }
  }, [searchParams.pg]);

  useEffect(() => {
    cnpjRef.current?.focus();
  }, []);

  const MascaraCNPFCPF = (value: string) => {
    let vlrformatado = FormataCNPJCPF(value);
    setCnpj(vlrformatado);
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          variant: "default",
          description: "Linha Digitável copiado para a área de transferência.",
        });
      },
      (err) => {
        toast({
          variant: "destructive",
          description: "Falha ao copiar o texto:" + err,
        });
      }
    );
  };

  const buscaContas = async () => {
    if (!validateFields()) return;
    
    setLoading(true);
    const nrosCNPJ = cnpj.trim().replace(/\D/g, '');
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/cliente/consultacontas/${nrosCNPJ}`).then((response) => {
        setContas(response.data);
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateFields = () => {
    let isValid = true;
    if (cnpj === '') {
      setCnpjError('*Informe o CNPJ/CPF');
      isValid = false;
    } else {
      setCnpjError('');
    }
    
    return isValid;
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (event.currentTarget.id === 'cnpj') {
        emailRef.current?.focus();
      } else {
        buscaContas();
      }
    }
  };

  return (
    <div className="mx-5">
      <div className="flex flex-row justify-between py-2 self-center">
        <span className="py-2">Consulta Contas</span>
      </div>
      <Card className="min-h-[170px] max-w-full">
        <CardContent>
          <form onSubmit={buscaContas}>
            <div className="flex flex-wrap flex-col lg:space-x-2 items-start">
              <div className="flex flex-col lg:mb-0 pt-5 pl-4">
                <span className="py-2 text-lg">Informe o CNPJ/CPF para gerar a linha digitável</span>
              </div>
              <div className="flex flex-wrap flex-row lg:space-x-2 items-end pl-4 pb-2">
                <div className="flex flex-col mb-2 lg:mb-0 lg:pl-0 pt-5">
                  <Label className="py-2" htmlFor="cnpj">
                    CNPJ/CPF:
                  </Label>
                  <Input
                    type="text"
                    id="cnpj"
                    name="txcnpj"
                    className="h-8 w-full lg:w-[300px] max-w-full"
                    value={cnpj}
                    onChange={(e) => MascaraCNPFCPF(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={18}
                    ref={cnpjRef}
                    required
                  />
                  {cnpjError && <span className="text-red-500">{cnpjError}</span>}
                </div>
                <div className="flex flex-col mb-2 lg:mb-0">
                  <Button type="submit" id="btnSearch" className="h-8">
                    <Search />
                  </Button>
                </div>
              </div>
            </div>
          </form>
          <div className="container mx-auto p-4">
            {loading && <p>Carregando...</p>}
            {!loading && (contas == null || contas.length === 0) && <p>Nenhuma conta encontrada</p>}
            {!loading && contas &&
              contas.map((conta) => (
                <div
                  key={conta.Codconta}
                  className="max-w-full w-full rounded overflow-hidden shadow-lg bg-white p-4 mb-4 flex items-center"
                >
                  <div className="flex-1">
                    <div className="font-bold text-xl mb-2">
                      Dados do documento
                    </div>
                    <p className="text-gray-700 text-base">
                      <strong>Cliente:</strong> {conta.Nomcliente}
                    </p>
                    <p className="text-gray-700 text-base">
                      <strong>Nro Documento:</strong> {conta.NroDocumento}
                    </p>
                    {/* <p className="text-gray-700 text-base">
                      <strong>CNPJ/CPF:</strong> {MascaraCNPJCPF(conta.CNPJ)}
                    </p> */}
                    <p className="text-gray-700 text-base">
                      <strong>Vencimento:</strong> {formatarData(conta.Datvencto)}
                    </p>
                    <p className="text-gray-700 text-base">
                      <strong>Valor:</strong> {formatarDinheiro(conta.Vlrvencto)}
                    </p>
                    <br />
                    <p className="text-gray-700 flex w-full text-lg">
                      <strong>Linha Digitável:</strong>
                    </p>
                    <p className="text-gray-700 flex w-full text-lg">
                      {conta.LinhaDigitavel}
                      <button onClick={() => copyToClipboard(conta.LinhaDigitavel)} className="text-blue-700 flex items-center">
                        <ClipboardCopy className='h-4 p-0 m-0' /> Copiar
                      </button>
                    </p>
                    <br />
                    <p className="text-gray-700 flex w-full text-lg">
                      <strong>Link para emissão da 2ª via:</strong>
                    </p>
                    <a href={conta.Urlboleto} className="text-gray-700 flex w-full text-lg">
                      {conta.Urlboleto}
                    </a>
                  </div>
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0 flex justify-center items-center ml-4">
                    {/* {conta.Pathimage ? (
                      <img
                        src={conta.Pathimage}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : ( */}
                    <Receipt className="h-8 w-8 text-gray-700" />
                    {/* )} */}
                  </div>
                </div>
              ))}
          </div>
          {/* {produtos?.Page ?
            <Paginacao page={produtos?.Page!} rota="consultapreco" />
            : null} */}
        </CardContent>
      </Card>
    </div>
  );
}
