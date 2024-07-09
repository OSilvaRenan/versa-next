import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { forwardRef, useState } from "react";
import { truncateString } from "../functions/functions";
import { UseFormRegister } from "react-hook-form";
import { formEditora } from "../paginas/editora/FormEditora";

export interface CboData {
    Value: string;
    Description: string;
}

// interface Props {
//     classNameCombo?: string;
//     classNameLista?: string;
//     label?: string;
//     data: CboData[];
//     itemListaSelecionado?: CboData;
//     mostrarValue: boolean;
//     onSelect?: (value: string) => void;
//     carregarOpcoes: () => void;
//     setData: (value: CboData[]) => void;
//     setItemListaSelecionado?: (value: CboData) => void;

// }

interface Props {
    classNameCombo?: string;
    classNameLista?: string;
    label: string;
    data: CboData[];
    setData: (value: CboData[]) => void;
    itemListaSelecionado?: CboData;
    // mostrarValue: boolean;
    onSelect?: (value: string) => void;
    carregarOpcoes: () => void;
    setItemListaSelecionado?: (value: CboData) => void;

}

export const Select = forwardRef<HTMLSelectElement, Props & ReturnType<UseFormRegister<formEditora>>>(({ onChange, onBlur, name, label,
    classNameCombo, carregarOpcoes, itemListaSelecionado, data, classNameLista,
    setData, setItemListaSelecionado, onSelect }, ref) => {

    const [open, setOpen] = useState(false);

    const handleSearch = async (event: any) => {
        const dados = data.find((lista) => { lista.Description.includes(event.target.value) });

        if (dados != null) {
            setData([dados]);
        }
    };

    return (
        <div className="flex">
            <div className="grid gap-2 self-end">
                <label>{label}</label>

                {/* <Popover open={open} onOpenChange={setOpen} >
                    <PopoverTrigger asChild id="controlepopover"  className={classNameCombo ?? "w-[360px] h-8"}>
                        <Button
                            variant="outline"
                            role="combobox"
                            className="justify-between px-1 py-4 max-w-[340px]"
                            onClick={carregarOpcoes}
                        >
                            {itemListaSelecionado
                                ? itemListaSelecionado.Description != '' ?
                                    truncateString(itemListaSelecionado.Description, 20) :
                                    data.find((lista) => itemListaSelecionado.Value === lista.Value.toString())?.Description ?? "Selecione o registro..."
                                : "Selecione o registro..."}
                            <ChevronDown className="h-4 w-4 shrink-0 opacity-50 z-0" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className={classNameLista ?? "w-[360px] p-0"}>
                        <Command>
                            <CommandInput placeholder="Buscar registro..."
                                onKeyDown={handleSearch} name={name}
                            />
                              <CommandEmpty>Nenhum registro encontrado.</CommandEmpty>
                              <CommandGroup>
                                {data.map((lista) => (
                                    <CommandItem
                                        key={lista.Value}
                                        value={lista.Description}
                                         ref={ref}
                                        onSelect={onChange()}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                itemListaSelecionado != undefined && itemListaSelecionado.Value !='-1' && itemListaSelecionado.Value == lista.Value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {lista.Description}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>

                    </PopoverContent>

                </Popover> */}
                <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </div>
        </div>
    )
});
