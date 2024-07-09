import axios from 'axios';
import { useState } from 'react';
import { EditoraDTO } from '../paginas/editora/EditoraDTO';
import { CboData, CboEstatica } from './CboEstatica';

interface Props {
    classNameCombo?: string;
    classNameLista?: string;
    value?: CboData;
    onChange?: (value?: CboData) => void;
    id?: string
}

const ListaEditorasGrupo = ({ id, 
    classNameCombo, classNameLista, value, 
    onChange }: Props) => {

    const [data, setData] = useState<CboData[]>([]);

    const carregarOpcoes = async () => {
        try {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/produto/editoragrupo`).then(response => {

                const dadosTransformados: CboData[] = response.data.Dados.map((item: EditoraDTO) => ({
                    Value: item.Codeditoragrupo,
                    Description: item.Nomeditoragrupo
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
            <input type='hidden'
                value={value && value.Value !== '-1' ? value.Value : ''}
                id={id} 
                />
            <CboEstatica classNameCombo={classNameCombo} classNameLista={classNameLista} label={"Grupo Empresarial:"}
                itemListaSelecionado={value}
                carregarOpcoes={carregarOpcoes}
                setItemListaSelecionado={onChange}
                data={data} setData={setData}
                mostrarValue={true} />
        </div>
    );
};

export default ListaEditorasGrupo;
