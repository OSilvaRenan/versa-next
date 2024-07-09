"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LstItensPedido } from './LstItensPedido';
import { DrawerAtualizaQtd } from './DrawerAtualizaQtd';
import { ActionsSeparacao } from '@/components/ActionsSeparacao';
import { FiltersItensPedido } from '../FiltersItensPedido';
import { useEffect, useState } from 'react';
import { ConferenciaResponseDTO, separacaoResponse } from '../../ConferenciaDTO';
import axios from 'axios';

interface Props {
    params: { id: string };
}

export default function Page({ params }: Props) {

    
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
    
    const navigation = useRouter();
    return (
        <div className="mx-auto">
            <div className="flex flex-row justify-between  py-2 self-center">
                <span className="py-2 px-2"> Pedido Nº {params.id} | {conferencia?.Situacaoconferencia}</span>
                <div className=' space-x-2 flex align-bottom '>
                    <DrawerAtualizaQtd itens={[]} setAtualizaLista={(value) => null} atualizaLista={false} />
                    <Button
                        // onClick={Pesquisa} 
                        type="button">Enviar P/Separação</Button>
                    <ActionsSeparacao />
                    <Button variant="secondary"
                        onClick={() => navigation.back()}
                        type="button">Voltar</Button>
                </div>
            </div>
            <FiltersItensPedido params={params}  conferencia={conferencia}/>
            <LstItensPedido params={params}/>
        </div>
    );
};

