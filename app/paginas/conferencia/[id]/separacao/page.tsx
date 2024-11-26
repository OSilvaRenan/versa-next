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
import { ActionsSeparacaoMobile } from '@/components/ActionsSeparacaoMobile';

interface Props {
    params: { id: string };
}

export default function Page({ params }: Props) {

    const [conferencia, setConferencia] = useState<ConferenciaResponseDTO>();
    const [itensSeparacao, setItensSeparacao] = useState<separacaoResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [atualizaLista, setAtualizaLista] = useState<boolean>(true);

    const buscaDadosConferencia = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${params.id}`).then(response => {
            setConferencia(response.data);
            setLoading(false);
        });
    };

    const buscaItensConferencia = async () => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/${params.id}/separacao/produtos`).then(response => {
            setItensSeparacao(response.data);
            setLoading(false);
        });
    };

    async function CancelarSeparacao() {
        try {
            var request = {
                Codconferencia: conferencia?.Codconferencia,
            }
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/cancelaonda`, request);
        } catch (error) {
            console.error('Erro ao iniciar separação:', error);
        }
    }

    useEffect(() => {
        buscaDadosConferencia();
        buscaItensConferencia();
    }, [params.id, atualizaLista]);

    const navigation = useRouter();
    return (
        <div className="mx-5">
            <div className="flex flex-row justify-between py-2 self-center">
                <span className="py-2 px-2"> Pedido Nº {params.id} | {conferencia?.Situacaoconferencia}</span>
                <div className='hidden lg:flex space-x-2 align-bottom '>
                    <DrawerAtualizaQtd itens={itensSeparacao} setAtualizaLista={setAtualizaLista} atualizaLista={atualizaLista}
                        situacaoConferencia={conferencia?.Situacaoconferencia ?? ""} codconferencia={parseInt(params.id)} 
                        disabled={conferencia?.Indseparacao == 0 || conferencia?.Indseparacao == 9? false : true}/>
                    <Button
                        disabled={conferencia?.Indseparacao == 9 ? false : true}
                        onClick={CancelarSeparacao}
                        type="button">Cancelar Separação</Button>
                    <Button
                        // onClick={Pesquisa}
                        type="button">Enviar P/Separação</Button>
                    <ActionsSeparacao />
                    <Button variant="secondary"
                        onClick={() => navigation.back()}
                        type="button">Voltar</Button>
                </div>
                <div className='lg:hidden flex'>
                <ActionsSeparacaoMobile disabled={conferencia?.Indseparacao == 9 ? false : true} CancelarSeparacao={CancelarSeparacao}/>
                </div>
            </div>
            <FiltersItensPedido params={params} conferencia={conferencia} />
            <LstItensPedido itens={itensSeparacao} loading={loading}
            />
        </div>
    );
};

