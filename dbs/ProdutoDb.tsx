const axios = require('axios');


export async function ObtemCodigoProduto(isbn: string): Promise<number> {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}api/produto/isbn/${isbn}`;
        const response = await axios.get(url);
        return response.data.Codproduto;
    } catch (error) {
        console.error('Erro ao buscar ListaCaixasConferencia:', error);
        throw error;
    }
}