
import { axiosWrapper } from "@/app/api/axios";
import { conferenciaCaixasResponseDTO, conferenciaItensResponseDTO, conferenciaProdutoResponseDTO, ConferenciaResponseDTO, RegistraCaixaRequest, RegistraLeituraRequest, RegistraPesoRequest } from "@/DTO/ConferenciaDTO";

//#region GET

// Função para buscar os dados de uma conferência específica
export async function ListaDadosConferencia(codconferencia: number | string): Promise<ConferenciaResponseDTO> {
    try {
        // const url = `${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${codconferencia}`;
        // const response = await axios.get(url);
        // {
        const response = await axiosWrapper(`api/conferencia/${codconferencia}`, "GET");
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar ListaDadosConferencia:', error);
        throw error;
    }
}

// Função para buscar leituras realizadas de uma conferência específica
export async function ListaLeituraItensConferencia(codconferencia: number | string): Promise<conferenciaItensResponseDTO[]> {
    try {
        // const url = `${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${codconferencia}/itens`;
        // const response = await axios.get(url);
        const response = await axiosWrapper(`api/conferencia/${codconferencia}/itens`, "GET");

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar ListaLeituraItensConferencia:', error);
        throw error;
    }
}

// Função para buscar produtos de uma conferência específica
export async function ListaProdutosConferencia(codconferencia: number | string): Promise<conferenciaProdutoResponseDTO[]> {
    try {
        // const url = `${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${codconferencia}/separacao/produtos`;
        // const response = await axios.get(url);
        const response = await axiosWrapper(`api/conferencia/${codconferencia}/separacao/produtos`, "GET");

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar ListaProdutosConferencia:', error);
        throw error;
    }
}

// Função para buscar caixas de uma conferência específica
export async function ListaCaixasConferencia(codconferencia: number | string): Promise<conferenciaCaixasResponseDTO[]> {
    try {
        // const url = `${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${codconferencia}/caixas`;
        // const response = await axios.get(url);
        const response = await axiosWrapper(`api/conferencia/${codconferencia}/caixas`, "GET");
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar ListaCaixasConferencia:', error);
        throw error;
    }
}


//#endregion

//#region POST

// Função para excluir leitura de uma conferência específica
export async function ExcluiLeituraConferencia(seqconferenciaitem: number | string) {
    try {
        // const url = `${process.env.NEXT_PUBLIC_API_URL}conferencia/excluirleitura/${seqconferenciaitem}`;
        // await axios.post(url);

        const response = await axiosWrapper(`conferencia/excluirleitura/${seqconferenciaitem}`, "POST");

    } catch (error) {
        console.error('Erro ao ExcluiLeituraConferencia:', error);
        throw error;
    }
}

// Função para excluir caixa de uma conferência específica
export async function ExcluiCaixaConferencia(codconferencia: number | string, nrocaixa: number | string): Promise<number> {
    try {
        // const url = `${process.env.NEXT_PUBLIC_API_URL}conferencia/${codconferencia}/excluircaixa/${nrocaixa}`;
        // const response = await axios.post(url);
        const response = await axiosWrapper(`conferencia/${codconferencia}/excluircaixa/${nrocaixa}`, "POST");

        return response.data;
    } catch (error) {
        console.error('Erro ao ExcluiCaixaConferencia:', error);
        throw error;
    }
}

// Função para registrar caixa em uma conferência específica
export async function RegistraCaixaConferencia(codconferencia: number | string, request: RegistraCaixaRequest): Promise<number> {
    try {
        // const url = `${process.env.NEXT_PUBLIC_API_URL}conferencia/${codconferencia}/registracaixa`;
        // const response = await axios.post(url, request);
        const response = await axiosWrapper(`conferencia/${codconferencia}/registracaixa`, "POST", request);

        return response.data;
    } catch (error) {
        console.error('Erro ao RegistraCaixaConferencia:', error);
        throw error;
    }
}

// Função para finalizar conferência 
export async function FinalizaConferencia(codconferencia: number | string) {
    try {
        // const url = `${process.env.NEXT_PUBLIC_API_URL}conferencia/${codconferencia}/finalizaconferencia`;
        // await axios.post(url);
        const response = await axiosWrapper(`conferencia/${codconferencia}/finalizaconferencia`, "POST");

    } catch (error) {
        console.error('Erro ao FinalizaConferencia:', error);
        throw error;
    }
}

export async function RegistraPesoCaixa(codconferencia: number | string, nrocaixa: number | string, request: RegistraPesoRequest): Promise<number> {
    try {
        // const url = `${process.env.NEXT_PUBLIC_API_URL}conferencia/${codconferencia}/pesocaixa/${nrocaixa}`;
        // const response = await axios.post(url, request);
        const response = await axiosWrapper(`conferencia/${codconferencia}/pesocaixa/${nrocaixa}`, "POST", request);

        return response.data;
    } catch (error) {
        console.error('Erro ao RegistraPesoCaixa:', error);
        throw error;
    }
}

export async function RegistraLeitura(codconferencia: number | string, request: RegistraLeituraRequest): Promise<number> {
    try {
        // const url = `${process.env.NEXT_PUBLIC_API_URL}conferencia/${codconferencia}/registraleitura`;
        // const response = await axios.post(url, request);

        const response = await axiosWrapper(`conferencia/${codconferencia}/registraleitura`, "POST", request);

        return response.data;
    } catch (error) {
        console.error('Erro ao RegistraLeitura:', error);
        throw error;
    }
}
//#endregion

