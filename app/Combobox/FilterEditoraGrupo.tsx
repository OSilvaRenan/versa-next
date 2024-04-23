import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useState } from 'react';
import { EditoraDTO } from '../editora/EditoraDTO';
import { CboData, CboEstatica } from './CboEstatica';

interface Props {
    className?: string;
    value: string;
    description: string;
}

const ListaEditorasGrupo = ({ value, description, className }: Props) => {

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
            <CboEstatica className={className} label={"Grupo Empresarial:"}
                itemListaSelecionado={{ Value: value, Description: description }} 
                carregarOpcoes={carregarOpcoes}
                data={data} setData={setData}
                mostraDadosLista={true} />
        </div>
    );
};

export default ListaEditorasGrupo;
