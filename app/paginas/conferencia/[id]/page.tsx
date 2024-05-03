

import { fetchWrapper } from '@/app/api/fetch';
import { FiltersItensPedido } from './FiltersItensPedido';
import { LstItensPedido } from './LstItensPedido';
import { Button } from '@/components/ui/button';
import { conferenciaResponse } from '../ConferenciaDTO';

interface Props {
    params: { id: string };
}

export default async function Page({ params }: Props) {
    const fetchData = async () => {
        const data = await fetchWrapper<conferenciaResponse[]>(`api/conferencia/${params.id}/produtos`,
            {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    "Content-Type": "application/json",
                },
            });

        return data;
    }

    var conferencia = await fetchData();
    return (
        <div className="mx-auto">
            <div className='flex flex-row justify-between  py-2 self-center space-x-2'>
                <span className=' py-2 px-2'>Pedido Nº {params.id}</span>
                <Button className="h-8"
                    //  onClick={() => router.back()} 
                    type="button">Voltar</Button>
            </div>
            <FiltersItensPedido />
            <LstItensPedido itensConferencia={conferencia} />
        </div>
    );
};