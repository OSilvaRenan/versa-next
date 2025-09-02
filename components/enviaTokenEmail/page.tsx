"use client"
import { Check, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { EnviaTokenRequest } from "@/DTO/ClienteDTO";
import { EnviarTokenEmail } from "@/dbs/ClienteDb";
import { useRef, useState } from "react";
import { FormataCNPJCPF } from "@/app/functions/functions";

interface Props {
    cnpj: string;
    setCnpj: (value: string) => void;
    token: string;
    setToken: (value: string) => void;
    // tokenValido: string;
     setEmailValido: (value: string) => void;
         BuscaDuplicatas: () => void;
}

export default function EnviaTokenEmailPage({ cnpj, setCnpj, token, setToken,
     setEmailValido,
     BuscaDuplicatas }: Props) {
    const [email, setEmail] = useState('');
    const [cnpjError, setCnpjError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [tokenError, setTokenError] = useState('');
    const [isActiveToken, setIsActiveToken] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const cnpjRef = useRef<HTMLInputElement>(null);

    const validateFields = () => {
        let isValid = true;
        if (cnpj === '') {
            setCnpjError('*Informe o CNPJ/CPF');
            isValid = false;
        } else {
            setCnpjError('');
        }

        if (email === '') {
            setEmailError('*Informe o e-mail de contato.');
            isValid = false;
        } else {
            setEmailError('');
        }

        return isValid;
    }

    const MascaraCNPJCPF = (value: string) => {
        let vlrformatado = FormataCNPJCPF(value);
        setCnpj(vlrformatado);
    }

    const AtualizaEmails = (value: string) => {
    setEmail(value);
    setEmailValido(value);
    }
    const EnviaTokenEmail = async () => {
        if (!validateFields()) return;

        const nrosCNPJ = cnpj.trim().replace(/\D/g, '');
        try {

            const request: EnviaTokenRequest = {
                Cgccpf: nrosCNPJ,
                EmailContato: email
            }
            await EnviarTokenEmail(request);
            // setTokenValido(response);
            setIsActiveToken(true);
            setCnpjError('');
            setEmailError('');
            // await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/cliente/consultaduplicatas/enviatoken`, request).then((response) => {

            // });
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            validateFields();
        }
    };

    const handleKeyDownToken = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (isActiveToken) {
            if (token == '') {
                setTokenError('*Token inválido');
            } else {
                BuscaDuplicatas();
            }
        }
        }
    };

    function onSubmit() {
        if (isActiveToken) {
            if (token == '') {
                setTokenError('*Token inválido');
            } else {
                BuscaDuplicatas();
            }
        }
    }


    return (
        <div className="flex flex-wrap flex-col items-start">
            <div className="flex flex-col lg:mb-0 py-5 pl-4">
                <span className="py-2 text-lg">{!isActiveToken ? 'Para exibir as duplicatas em aberto, informe o CNPJ/CPF e o e-mail cadastrado no sistema' : 'Informe o Token recebido no seu Email de cadastro'}</span>
            </div>
            <div className="flex flex-wrap flex-row pl-4 pb-2 space-x-2 items-end">
                <div className="flex flex-col mb-2 lg:mb-0 lg:pl-0">
                    <Label className="py-2" htmlFor="cnpj">
                        CNPJ/CPF:
                    </Label>
                    <Input
                        type="text"
                        id="cnpj"
                        name="txcnpj"
                        className="h-8 w-full lg:w-[300px] max-w-full"
                        value={cnpj}
                        onChange={(e) => MascaraCNPJCPF(e.target.value)}
                        onKeyDown={handleKeyDown}
                        maxLength={18}
                        autoFocus={true}
                        ref={cnpjRef}
                    />
                </div>

                <div className="flex flex-col mb-2 lg:mb-0 lg:pl-0">
                    <Label className="py-2" htmlFor="email">
                        E-mail de Contato:
                    </Label>
                    <Input
                        type="text"
                        id="email"
                        name="txemail"
                        className="h-8 w-full lg:w-[300px] max-w-full"
                        value={email}
                        onChange={(e) => AtualizaEmails(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={emailRef}
                    />
                </div>
                <div className="flex items-center pb-0">
                    <Button type="submit" id="btnSearch" className="h-8" onClick={EnviaTokenEmail}>
                        <Search />
                    </Button>
                </div>
            </div>
            <div className="flex flex-wrap flex-row pb-2 space-x-40 items-end">
                <div className="flex flex-col mb-2 lg:mb-0 lg:pl-4">
                    {cnpjError && <span className="text-red-500 text-sm mt-1">{cnpjError}</span>}
                </div>
                <div className="flex flex-col mb-2  lg:mb-0 lg:pl-0">
                    {emailError && <span className="text-red-500 text-sm mt-1">{emailError}</span>}
                </div>
            </div>
            {isActiveToken && <div className="flex flex-wrap flex-row py-5 items-end">
                <span className="flex flex-col mb-2 lg:mb-0 lg:pl-4">Um código de verificação foi enviado para o seu email. Por favor, digite-o abaixo:</span>
            </div>}
            {isActiveToken && (<div className="flex flex-wrap flex-row pl-4 pb-2 space-x-2 items-end">
                <div className="flex flex-col mb-2 lg:mb-0 lg:pl-0">
                    <Label className="py-2" htmlFor="cnpj">
                    Código de Verificação:
                    </Label>
                    <Input
                        type="text"
                        maxLength={6}
                        id="token"
                        name="txtoken"
                        className="h-8 w-full lg:w-[300px] max-w-full"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        onKeyDown={handleKeyDownToken}
                        autoFocus={true}
                        required
                    />
                </div>
                <div className="flex items-center pb-0">
                    <Button type="submit" id="btnSearch" className="h-8" onClick={onSubmit}>
                        <Check />
                    </Button>
                </div>
              
            </div>)}
            <div className="flex flex-wrap flex-row pb-2 ml-5 items-end">
                    <div className="flex flex-col mb-2  lg:mb-0 lg:pl-0">
                        {tokenError && <span className="text-red-500 text-sm">{tokenError}</span>}
                    </div>
                </div>
        </div>
    );
}
