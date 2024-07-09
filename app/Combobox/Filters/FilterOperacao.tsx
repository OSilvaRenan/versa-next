
"use client"
import axios from 'axios';
import { useState } from 'react';
import { CboDinamica } from '../CboDinamica';
import { CboData } from '../CboEstatica';

interface OperacaoRequest {
    Nomoperacao: string;
}

interface OperacaoResponse {
    Codoperacao: number;
    Nomoperacao: string;
}

interface Props {
    classNameCombo?: string;
    classNameLista?: string;
    value: string;
    onSelect: (value: string) => void
}

const FilterOperacao = ({ classNameCombo, classNameLista, value, onSelect }: Props) => {

    const [data, setData] = useState<CboData[]>([]);
    const [itemListaSelecionado, setItemListaSelecionado] = useState<CboData>({ Value: value.toString(), Description: '' });

    const carregarOpcoes = async (event: any) => {
        if (event.key === 'Enter') {
            try {
                var request: OperacaoRequest = {
                    Nomoperacao: event.target.value,
                }
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/operacoes`, request).then(response => {

                    const dadosTransformados: CboData[] = response.data.map((item: OperacaoResponse) => ({
                        Value: item.Codoperacao,
                        Description: item.Nomoperacao
                    }));

                    setData(dadosTransformados);
                });
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }
    };

    return (
        <CboDinamica classNameCombo={classNameCombo} classNameLista={classNameLista}
            label='Operação:' data={data} setData={setData}
            carregarOpcoes={carregarOpcoes} mostrarValue={false}
            itemListaSelecionado={itemListaSelecionado} setItemListaSelecionado={setItemListaSelecionado}
            onSelect={onSelect}
        />
    );
};

export default FilterOperacao;