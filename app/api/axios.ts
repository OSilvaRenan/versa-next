import axios, { Method } from "axios";

export async function axiosWrapper<T = any>(url: string, metodo: Method, request?: any) {
    try {
        const response = await axios({
            method: metodo,
            url:  `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
            data: request,
        });
        return response as T;
    } catch (error) {
        console.error("Erro na solicitação:", error);
        throw error;
    }
}
