
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
    classNameCombo?: string;
    classNameLista?: string;
    value: number;
    onSelect: (value: string) => void;

}

const FilterSituacao = ({ value, classNameCombo, classNameLista, onSelect }: Props) => {

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
        <div className="flex items-end">
            <CboEstatica classNameCombo={classNameCombo} classNameLista={classNameLista} label={"Situação:"}
                itemListaSelecionado={{ Value: value.toString(), Description: '' }} onSelect={onSelect}
                carregarOpcoes={carregarOpcoes}
                data={data} setData={setData}
                mostrarValue={false} />
        </div>
    );
};

export default FilterSituacao;