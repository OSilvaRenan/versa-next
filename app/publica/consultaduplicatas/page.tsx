"use client";
import { formatarData, formatarDinheiro, ValidaDocumento } from '@/app/functions/functions';
import EnviaTokenEmailPage from '@/components/enviaTokenEmail/page';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { BuscarDuplicatasEmAberto, ValidaToken } from '@/dbs/ClienteDb';
import { DuplicatasResponse, ValidaTokenRequest } from '@/DTO/ClienteDTO';
import { ClipboardCopy, Receipt } from 'lucide-react';
import { useState } from 'react';

export default function ConsultaDuplicatasPage() {
  const [cnpj, setCnpj] = useState('');
  const [duplicatas, setDuplicatas] = useState<DuplicatasResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');

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

  const buscaDuplicatas = async () => {
    setDuplicatas([]);
    setLoading(true);
    //remove mascara e inclui zero a esquerda caso não tenha
    const nrosCNPJ = ValidaDocumento(cnpj);
    
    const requestToken: ValidaTokenRequest = {
      Cgccpf: nrosCNPJ,
      Email: email,
      Token: token
    }
 
    const dadosValidos = await ValidaToken(requestToken);

    if(dadosValidos){
      const response = await BuscarDuplicatasEmAberto(dadosValidos);
      console.log(response)
      if(response == null || response.length == 0){
         toast({
                        variant: "destructive",
                        description: "Token Inválido: ",
                    });
      }
      setDuplicatas(response);
      setLoading(false);
    }
  };

  return (
    <div className="mx-5">
      <div className="flex flex-row justify-between py-2 self-center">
        <span className="py-2">Consulta Duplicatas em Aberto</span>
      </div>
      <Card className="min-h-[170px] max-w-full">
        <CardContent>
          {duplicatas == null || duplicatas.length == 0 &&<EnviaTokenEmailPage BuscaDuplicatas={buscaDuplicatas} cnpj={cnpj} setCnpj={setCnpj} setEmailValido={setEmail}
           token={token} setToken={setToken}
            // tokenValido={tokenValido} setTokenValido={setTokenValido}
             />}
            <div className="container mx-auto p-4">
            {/* {loading && isActiveToken && <p>Carregando...</p>} */}
            {/* {!loading && isActiveToken && (duplicatas == null || duplicatas.length === 0) && <p>Nenhum boleto encontrado para o CNPJ/CPF informado</p>} */}
            {!loading &&
              // isActiveToken && 
              duplicatas &&
              duplicatas.map((conta) => (
                conta.LinhaDigitavel != null && conta.LinhaDigitavel != '' ?
                  <div
                    key={conta.Codconta}
                    className="max-w-full w-full rounded overflow-hidden shadow-lg bg-white p-4 mb-4 flex items-center"
                  >
                    <div className="flex-1">
                      <div className="font-bold text-xl mb-4">
                        Dados do documento
                      </div>
                      <p className="text-gray-700 text-base">
                        <strong>{conta.Razaosocial}</strong>
                      </p>
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
                  : null
              ))}
          </div>
          {/* {produtos?.Page ?
            <Paginacao page={produtos?.Page!} rota="consultapreco" />
            : null} */}
        </CardContent>
      </Card>
    </div >
  );
}
