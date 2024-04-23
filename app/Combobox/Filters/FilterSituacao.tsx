
"use client"
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CboData, CboEstatica } from '../CboEstatica';

interface SituacaoRequest {
    Nomsituacao: string;
}

interface SituacaoResponse {
    Codsituacao: number;
    Nomsituacao: string;
}

interface Props {
    className: string;
    value: string;
}

const FilterSituacao = ({ value, className }: Props) => {

    const [data, setData] = useState<CboData[]>([]);

    const carregarOpcoes = async () => {
        try {

            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/situacoes`).then(response => {

                const dadosTransformados: CboData[] = response.data.map((item: SituacaoResponse) => ({
                    Value: item.Codsituacao,
                    Description: item.Nomsituacao
                }));

                setData(dadosTransformados);
            });
        } catch (erro) {
            console.error('Erro ao carregar opções:', erro);
        } finally {
        }
    };
   

    return (
        <div className="flex items-end mt-1">
            <CboEstatica className={className} label={"Situação:"}
                itemListaSelecionado={{ Value: value, Description: '' }}
                carregarOpcoes={carregarOpcoes}
                data={data} setData={setData}
                mostraDadosLista={false} />
        </div>
    );
};

export default FilterSituacao;