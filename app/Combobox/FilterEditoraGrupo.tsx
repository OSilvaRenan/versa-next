import axios from 'axios';
import { useState } from 'react';
import { EditoraDTO } from '../paginas/editora/EditoraDTO';
import { CboData, CboEstatica } from './CboEstatica';

interface Props {
    classNameCombo?: string;
    classNameLista?: string;
    itemSelecionado: CboData;
}

const ListaEditorasGrupo = ({ classNameCombo, classNameLista, itemSelecionado }: Props) => {

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
            <CboEstatica classNameCombo={classNameCombo} classNameLista={classNameLista} label={"Grupo Empresarial:"}
                itemListaSelecionado={itemSelecionado}
                carregarOpcoes={carregarOpcoes}
                data={data} setData={setData}
                mostrarValue={true} />
        </div>
    );
};

export default ListaEditorasGrupo;
