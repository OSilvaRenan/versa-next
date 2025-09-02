import { axiosWrapper } from "@/app/api/axios";
import { ConsultaDuplicatasRequest, DuplicatasResponse, EnviaTokenRequest, ValidaTokenRequest, ValidaTokenResponse } from "@/DTO/ClienteDTO";

//#region GET



//#endregion

//#region POST

// Função para listar duplicatas em aberto via cnpj 
export async function BuscarDuplicatasEmAberto(request: ConsultaDuplicatasRequest): Promise<DuplicatasResponse[]> {
    try {
        const response = await axiosWrapper(`api/cliente/consultacontas`, "POST", request);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar BuscarDuplicatasEmAberto:', error);
        throw error;
    }
}
// Função para enviar token por email
export async function EnviarTokenEmail(request: EnviaTokenRequest): Promise<string> {
    try {
        const response = await axiosWrapper(`api/cliente/consultacontas/enviatoken`, "POST", request);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar EnviarTokenEmail:', error);
        throw error;
    }
}

// Função para validar token
export async function ValidaToken(request: ValidaTokenRequest): Promise<ValidaTokenResponse> {
    try {
        const response = await axiosWrapper(`api/cliente/consultacontas/validatoken`, "POST", request);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar EnviarTokenEmail:', error);
        throw error;
    }
}

//#endregion
