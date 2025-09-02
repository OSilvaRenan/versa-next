
"use client"
import axios from 'axios';
import { useState } from 'react';
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
    const [itemListaSelecionado, setItemListaSelecionado] = useState<CboData>({ Value: value.toString(), Description: '' });
   
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
            <CboEstatica classNameCombo={classNameCombo} classNameLista={classNameLista}
                label={"Situação:"} data={data} setData={setData}
                carregarOpcoes={carregarOpcoes} mostrarValue={false}
                itemListaSelecionado={itemListaSelecionado} setItemListaSelecionado={setItemListaSelecionado}
                 onSelect={onSelect}
            />
    );
};

export default FilterSituacao;