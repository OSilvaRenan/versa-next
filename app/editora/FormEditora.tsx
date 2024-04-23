import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ListaEditorasGrupo from "../Combobox/FilterEditoraGrupo";
import { EditoraDTO } from "./EditoraDTO";

interface PropsForm {
    item?: EditoraDTO | null;
    className?: React.ComponentProps<"form">;
}

export function FormEditora({ item, className }: PropsForm) {

    return (
        <form className={cn("grid items-start gap-6", className)} >
            <div className="grid gap-2">
                <Label htmlFor="nomeditora">Nome:</Label>
                <Input type="text" id="nomeditora"
                    value={item?.Nomeditora.trim() ?? ""}
                //   onChange={(e) => setLocalizacao(e.target.value)} onKeyDown={ConferePeloEnter} 
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <ListaEditorasGrupo value={item?.Codeditoragrupo != null && item?.Codeditoragrupo > 0 ? item?.Codeditoragrupo.toString() : ''} description={item?.Nomeditoragrupo ?? ""} />
            </div>
            <Button type="button"
            // onClick={AtualizaQtdSeparada}
            >Salvar</Button>
        </form >
    )
}