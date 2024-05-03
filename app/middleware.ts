export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/paginas/home',
        '/paginas/autor',
        '/paginas/conferencia',
        '/paginas/editora',
        '/paginas/pagamento',
        '/paginas/conferencia/[id]',
        '/paginas/conferencia/[id]/separacao',
    ],
}