import { toast } from "@/components/ui/use-toast";
import { AtualizaQtdRequest, CancelarSeparacaoRequest, SeparacaoRequest, separacaoResponse } from "@/DTO/SeparacaoDTO";

const axios = require('axios');

// Função para buscar produtos da separação
export async function ListaProdutosSeparacao(codconferencia: number | string): Promise<separacaoResponse[]> {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${codconferencia}/separacao/produtos`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar ListaProdutosSeparacao:', error);
        throw error;
    }
}

// Função para cancelar separacao
export async function CancelarSeparacao(request: CancelarSeparacaoRequest): Promise<separacaoResponse[]> {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}}api/conferencia/cancelaonda`;
        const response = await axios.get(url, request);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar ListaProdutosSeparacao:', error);
        throw error;
    }
}

export async function IniciarSeparacao(request: SeparacaoRequest) {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/iniciaonda`, request);
    } catch (error) {
        console.error('Erro ao iniciar separação:', error);
    }
}

export async function FinalizarSeparacao(request: SeparacaoRequest) {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/finalizaonda`, request);
    } catch (error) {
        console.error('Erro ao iniciar separação:', error);
    }
}

export async function AtualizarQtdSeparada(request: AtualizaQtdRequest) {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/atualizaqtdseparada`, request);
    } catch (error) {
        toast({
            variant: "default",
            description: "Erro ao atualizar a quantidade separada: " + error,
        })
    }
}