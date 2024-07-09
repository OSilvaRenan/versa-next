import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import ListaEditorasGrupo from "../../Combobox/ListaEditorasGrupo";
import { EditoraDTO } from "./EditoraDTO";
import { forwardRef, useState } from "react";
import { CboData } from "@/app/Combobox/CboEstatica";
import axios from "axios";
import { useForm, UseFormRegister } from 'react-hook-form';
import { Select } from "@/app/Combobox/NewCboEstatica";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

interface PropsForm {
    item?: EditoraDTO | null;
    className?: React.ComponentProps<"form">;
}

export interface formEditora{
    Nomeditora: string;
     Editoragrupo: CboData;
    // Age: number;
}




export function FormEditora({ item, className }: PropsForm) {

    // const { register, handleSubmit, formState: { errors } } = useForm({
    //     resolver: yupResolver(schema),
    // });

    
    const { register, handleSubmit, formState: { errors } } = useForm<formEditora>();

    const PostEditora = async (novaEditora: any) => {

        console.log(novaEditora)
         novaEditora.Codeditoragrupo = itemSelecionado.Value != "-1"?  parseInt(itemSelecionado.Value) : 0;

         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/editora`, novaEditora);
    }

    const onSubmit = (data: any) => {
        PostEditora(data);
    };

    // const [nomeditora, setnomeditora] = useState<string>(item?.Nomeditora.trim() ?? "")

    const [itemSelecionado, setItemSelecionado] = useState<CboData>({
        Value: item?.Codeditoragrupo != null && item?.Codeditoragrupo > 0 ? item?.Codeditoragrupo.toString() : '-1',
        Description: item?.Nomeditoragrupo ?? ""
    });

    
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
        <form className={cn("grid items-start gap-6", className)} onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
                <Label htmlFor="nomeditora">Nome:</Label>
                <Input type="text"
                    // id="formnomeditora"
                    // value={nomeditora}
                    // onChange={(e) => setnomeditora(e.target.value)}
                    {...register("Nomeditora", { required: true })}
                />
                {errors.Nomeditora && <span className="text-red-500 text-sm pl-2">This field is required</span>}
            </div> 
            
           <div className="grid grid-cols-2 gap-2">
                <ListaEditorasGrupo 
                classNameCombo="w-[170px] h-8" classNameLista="w-[250px] p-0"
                    value={itemSelecionado}
                    //  onChange={setItemSelecionado}
                      id="Codeditoragrupo"
                    //   {...register("Editoragrupo")}
                />
            </div>
                  {/* <Select label="Editoragrupo" {...register("Editoragrupo")} 
                  itemListaSelecionado={itemSelecionado}
                  carregarOpcoes={carregarOpcoes}
                //   setItemListaSelecionado={onChange}
                  data={data}
                    setData={setData}
                //   mostrarValue={true}
                  
                  /> */}

            <Button
            //  type="button"
            // onClick={PostEditora}
            >Salvar</Button>
        </form >
    )
}