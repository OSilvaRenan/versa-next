"use client"

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CboData, CboEstatica } from '../CboEstatica';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface EmbalagemResponse {
    Codembalagem: number;
    Dscembalagem: string;
}

interface Props {
    codconferencia: number;
    classNameCombo?: string;
    classNameLista?: string;
    value: number;
     onSelect: (value: string) => void;
    setEmbalagem: (value: CboData) => void;
}

const FilterEmbalagem = ({ value, classNameCombo, classNameLista, onSelect, setEmbalagem }: Props) => {

    const [data, setData] = useState<CboData[]>([]);
    const [itemListaSelecionado, setItemListaSelecionado] = useState<CboData>({ Value: value.toString(), Description: '' });

    const carregarOpcoes = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/conferencia/embalagem`);

            const dadosTransformados: CboData[] = response.data.map((item: EmbalagemResponse) => ({
                Value: item.Codembalagem,
                Description: item.Dscembalagem
            }));

            setData(dadosTransformados);
            // Define o primeiro item como selecionado automaticamente, se existir
            if (dadosTransformados.length > 0) {
                setItemListaSelecionado(dadosTransformados[0]);
                setEmbalagem(dadosTransformados[0]);
                onSelect(dadosTransformados[0].Value.toString());
            }
        } catch (erro) {
            console.error('Erro ao carregar opções:', erro);
        }
    };

    useEffect(() => {
        carregarOpcoes();
    }, []);

    return (
      <div className="flex flex-col p-2 w-full ">
            <Label className="py-2" htmlFor="cboembalagem">Situação:</Label>
            <Select value={itemListaSelecionado.Value} onValueChange={(selectedValue) => {
                const selectedItem = data.find(item => item.Value.toString() === selectedValue);
                setItemListaSelecionado(selectedItem || { Value: selectedValue, Description: '' });
                onSelect(selectedValue);
                setEmbalagem(itemListaSelecionado)
            }}>
                <SelectTrigger className="h-8 lg:w-[195px] w-[160px] min-w-full max-w-full" id="cboembalagem" >
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {data.map((embalagem) => (
                        <SelectItem key={embalagem.Value} value={embalagem.Value}>{embalagem.Description}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default FilterEmbalagem;
