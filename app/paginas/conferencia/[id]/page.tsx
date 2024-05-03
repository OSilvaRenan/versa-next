
"use client"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FiltersItensPedido } from './FiltersItensPedido';
import { LstItensPedido } from './LstItensPedido';

interface Props {
    params: { id: string };
}

export default function Page({ params }: Props) {
    const navigation = useRouter();
    return (
        <div className="mx-auto">
            <div className='flex flex-row justify-between  py-2 self-center space-x-2'>
                <span className=' py-2 px-2'>Pedido Nº {params.id}</span>
                <div className=' space-x-2 flex align-bottom '>
                <Button variant="secondary"
                        onClick={() => navigation.back()}
                        type="button">Voltar</Button>
                </div>
               
            </div>
            <FiltersItensPedido params={params}/>
            <LstItensPedido params={params}/>
        </div>
    );
};