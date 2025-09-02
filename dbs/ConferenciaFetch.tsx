import { fetchWrapper } from "@/app/api/fetch";
import { ConferenciaRequestDTO, ConferenciaResponseDTO } from "@/DTO/ConferenciaDTO";
import { PaginedList } from "@/DTO/PageDTO";

export async function pesquisaConferencias(request: ConferenciaRequestDTO): Promise<PaginedList<ConferenciaResponseDTO>> {
    try {
        const data = await fetchWrapper<PaginedList<ConferenciaResponseDTO>>('api/conferencia/pesquisa', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)
        });
        return data;
    } catch (error) {
        console.error('Erro ao buscar ListaCaixasConferencia:', error);
        throw error;
    }
}