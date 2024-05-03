import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import ListaEditorasGrupo from "../../Combobox/FilterEditoraGrupo";
import { EditoraDTO } from "./EditoraDTO";
import { useState } from "react";

interface PropsForm {
    item?: EditoraDTO | null;
    className?: React.ComponentProps<"form">;
}

export function FormEditora({ item, className }: PropsForm) {

    const [nomeditora, setnomeditora] = useState<string>(item?.Nomeditora.trim() ?? "")

    return (
        <form className={cn("grid items-start gap-6", className)} >
            <div className="grid gap-2">
                <Label htmlFor="nomeditora">Nome:</Label>
                <Input type="text" id="nomeditora"
                    value={nomeditora}
                    onChange={(e) => setnomeditora(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <ListaEditorasGrupo classNameCombo="w-[170px] h-8" classNameLista="w-[250px] p-0"
                    itemSelecionado={{
                        Value: item?.Codeditoragrupo != null && item?.Codeditoragrupo > 0 ? item?.Codeditoragrupo.toString() : '',
                        Description: item?.Nomeditoragrupo ?? ""
                    }}
                />
            </div>
            <Button type="button"
            // onClick={AtualizaQtdSeparada}
            >Salvar</Button>
        </form >
    )
}