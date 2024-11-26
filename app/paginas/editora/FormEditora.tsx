import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import ListaEditorasGrupo from "../../Combobox/ListaEditorasGrupo";
import { EditoraDTO } from "./EditoraDTO";
import { useState, useEffect } from "react";
import { CboData } from "@/app/Combobox/CboEstatica";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast"; // Importando o toast

interface PropsForm {
    item?: EditoraDTO | null;
    className?: React.ComponentProps<"form">;
    onOpenChange: () => void;
}

export interface formEditora {
    Nomeditora: string;
    Editoragrupo: CboData;
}

export function FormEditora({ item, className, onOpenChange }: PropsForm) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<formEditora>({
        defaultValues: {
            Nomeditora: item?.Nomeditora || "",
            Editoragrupo: {
                Description: item?.Nomeditoragrupo?.trimEnd() || "",
                Value: item?.Codeditoragrupo?.toString() || "-1"
            }
        }
    });

    const [itemSelecionado, setItemSelecionado] = useState<CboData>({
        Value: item?.Codeditoragrupo?.toString() || "-1",
        Description: item?.Nomeditoragrupo || ""
    });

    const [data, setData] = useState<CboData[]>([]);

    const carregarOpcoes = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/produto/editoragrupo`);
            const dadosTransformados: CboData[] = response.data.Dados.map((item: EditoraDTO) => ({
                Value: item.Codeditoragrupo.toString(),
                Description: item.Nomeditoragrupo
            }));
            setData(dadosTransformados);
        } catch (erro) {
            console.error("Erro ao carregar opções:", erro);
        }
    };

    useEffect(() => {
        carregarOpcoes();
        if (item) {
            reset({
                Nomeditora: item?.Nomeditora || "",
                Editoragrupo: {
                    Description: item?.Nomeditoragrupo?.trimEnd() || "",
                    Value: item?.Codeditoragrupo?.toString() || "-1"
                }
            });
        }
    }, [item, reset]);

    const PostEditora = async (novaEditora: formEditora) => {
        try {
            const request = {
                Codeditora: item?.Codeditora ?? 0,
                Nomeditora: novaEditora.Nomeditora,
                Codeditoragrupo: itemSelecionado.Value != '-1' ? Number(itemSelecionado.Value) : 0,
            };
            if (item?.Codeditora != null) {
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/editora/${item?.Codeditora}`, request);
                toast({
                    className: "bg-green-300",
                    variant: "default",
                    description: "Editora atualizada.",
                })
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/editora`, request);
                toast({
                    className: "bg-green-300",
                    variant: "default",
                    description: "Uma nova editora foi registrada.",
                })

            }

            onOpenChange();

        } catch (error) {
            if (item?.Codeditora != null) {
                toast({
                    variant: "destructive",
                    description: "Ocorreu um erro ao atualizar a editora.",
                })
            }
            else {
                toast({
                    variant: "destructive",
                    description: "Ocorreu um erro ao registrar a editora.",
                })
             }
           
        }
    };

    const onSubmit = (data: formEditora) => {
        PostEditora(data);
    };

    return (
        <form className={cn("grid items-start gap-6", className)} onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
                <Label htmlFor="nomeditora">Nome:</Label>
                <Input
                    type="text"
                    {...register("Nomeditora", { required: true })}
                />
                {errors.Nomeditora && <span className="text-red-500 text-sm pl-1">Esse campo é obrigatório</span>}
            </div>

            <div className="grid grid-cols-2 gap-2">
                <ListaEditorasGrupo
                    classNameCombo="w-[170px] h-8"
                    classNameLista="w-[250px] p-0"
                    value={itemSelecionado}
                    onChange={setItemSelecionado}
                    id="Codeditoragrupo"
                />
            </div>
            <Button type="submit">Salvar</Button>
        </form>
    );
}
