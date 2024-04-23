import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

export interface CboData {
    Value: string;
    Description: string;
}

interface Props {
    className?: string;
    label?: string;
    // value: string;
    // description: string
    data: CboData[];
    // onSelect: (value: string) => void;
    carregarOpcoes: () => void;
    setData: (value: CboData[]) => void;
    itemListaSelecionado: CboData;
    mostraDadosLista: boolean;
}

export const CboEstatica = ({ className, label, mostraDadosLista, data, setData, carregarOpcoes, itemListaSelecionado }: Props) => {

    const [open, setOpen] = useState(false);
    const [itemLista, setItemLista] = useState<CboData>(itemListaSelecionado);

    const handleSearch = async (event: any) => {
        const dados = data.find((lista) => { lista.Description.includes(event.target.value) });

        if (dados != null) {
            setData([dados]);
        }
    };

    return (
        <div className="flex ">
            <div className="grid gap-2 self-end ">
                <Label htmlFor="controlepopover"> {label}</Label>

                <Popover open={open} onOpenChange={setOpen} >
                    <PopoverTrigger asChild id="controlepopover">
                        <Button
                            variant="outline"
                            role="combobox"
                            // aria-expanded={open}
                            className="w-[170px] justify-between h-8 max-w-[170px] p-1"
                            onClick={carregarOpcoes}
                        >
                            {itemLista.Value
                                ? itemLista.Description != '' ? itemLista.Description : data.find((lista) => itemLista.Value === lista.Value.toString())?.Description
                                : "Selecione o registro..."}

                            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command >
                            <CommandInput placeholder="Buscar registro..."
                                onKeyDown={handleSearch}
                            />
                            <CommandEmpty>Nenhum registro encontrado.</CommandEmpty>
                            <CommandGroup>
                                {data.map((lista) => (
                                    <CommandItem
                                        key={lista.Value}
                                        value={lista.Description}
                                        onSelect={() => {
                                            setItemLista(itemLista.Value == lista.Value ?
                                                { Value: "", Description: "" } :
                                                { Value: lista.Value.toString(), Description: lista.Description });
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                itemLista.Value === lista.Value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {lista.Description}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>


            </div>
            {mostraDadosLista ?
                <>
                    <div className="grid gap-2 self-end px-2">
                        <Input type="text" id="value"
                            value={itemLista.Value}
                            className="w-[50px] h-8"
                        //   onChange={(e) => setLocalizacao(e.target.value)} onKeyDown={ConferePeloEnter} 
                        />
                    </div>
                    <div className="grid gap-2 self-end">
                        <Input type="text" id="description"
                            value={itemLista.Description}
                            className="w-[140px] h-8"
                        //   onChange={(e) => setLocalizacao(e.target.value)} onKeyDown={ConferePeloEnter} 
                        />
                    </div>

                </>
                : null}
        </div >

    )
};
