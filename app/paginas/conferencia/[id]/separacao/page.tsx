"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LstItensPedido } from './LstItensPedido';
import { DrawerAtualizaQtd } from './DrawerAtualizaQtd';
import { ActionsSeparacao } from '@/components/ActionsSeparacao';
import { FiltersItensPedido } from '../FiltersItensPedido';

interface Props {
    params: { id: string };
}

export default function Page({ params }: Props) {
    const navigation = useRouter();
    return (
        <div className="mx-auto">
            <div className="flex flex-row justify-between  py-2 self-center">
                <span className="py-2 px-2"> Pedido Nº {params.id}</span>
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
            <FiltersItensPedido params={params} />
            <LstItensPedido params={params} />
        </div>
    );
};

