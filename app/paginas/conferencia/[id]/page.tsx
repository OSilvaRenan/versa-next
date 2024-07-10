
"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FiltersItensPedido } from './FiltersItensPedido';
import { LstItensPedido } from './LstItensPedido';
import { useEffect, useState } from 'react';
import { ConferenciaResponseDTO, separacaoResponse } from '../ConferenciaDTO';
import axios from 'axios';

interface Props {
    params: { id: string };
}

export default function Page({ params }: Props) {
    const navigation = useRouter();

    const [conferencia, setConferencia] = useState<ConferenciaResponseDTO>();
    const [loading, setLoading] = useState<boolean>(true);

    const buscaDadosConferencia = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${params.id}`).then(response => {
            setConferencia(response.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        buscaDadosConferencia();
    }, [params.id]);


    return (
        <div className="mx-auto">
            <div className='flex flex-row justify-between  py-2 self-center space-x-2'>
                <span className=' py-2 px-2'>Pedido Nº {params.id} | {conferencia?.Situacaoconferencia}</span>
                <div className=' space-x-2 flex align-bottom '>
                    <Button variant="secondary"
                        onClick={() => navigation.back()}
                        type="button">Voltar</Button>
                </div>
            </div>
            <FiltersItensPedido params={params} conferencia={conferencia}/>
            <LstItensPedido params={params} />
        </div>
    );
};