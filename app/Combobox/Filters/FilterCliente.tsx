
"use client"
import axios from 'axios';
import { useState } from 'react';
import { CboDinamica } from '../CboDinamica';
import { CboData } from '../CboEstatica';

interface ClienteRequest {
    Nomcliente: string;
}

interface ClienteResponse {
    Codcliente: number;
    Nomcliente: string;
}

interface Props {
    classNameCombo?: string;
    classNameLista?: string;
    value: string;
    onSelect: (value: string) => void
}

const FilterCliente = ({ classNameCombo, classNameLista, value, onSelect }: Props) => {

    const [data, setData] = useState<CboData[]>([]);

    const carregarOpcoes = async (event: any) => {
        if (event.key === 'Enter') {
            try {

                var request: ClienteRequest = {
                    Nomcliente: event.target.value,
                }
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/clientes`, request).then(response => {

                    const dadosTransformados: CboData[] = response.data.map((item: ClienteResponse) => ({
                        Value: item.Codcliente,
                        Description: item.Nomcliente
                    }));

                    setData(dadosTransformados);
                });

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }

        }
    };

    return (
        // <Popover open={open} onOpenChange={setOpen}>
        //     <PopoverTrigger asChild style={{ width }} className={className}>
        //         <Button
        //             variant="outline"
        //             role="combobox"
        //             aria-expanded={open}
        //             className="w-[200px] justify-between"
        //         >
        //             {
        //                 value != "" && clientes.length > 0
        //                     ? clientes.find((cliente) => cliente.Codcliente === parseInt(value))?.Nomcliente
        //                     : "Selecione o cliente..."}
        //             <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        //         </Button>
        //     </PopoverTrigger>
        //     <PopoverContent className="w-[200px] p-0" style={{ width }}>
        //         <Command >
        //             <CommandInput placeholder="Procurar cliente..."
        //                 onKeyDown={handleSearch}
        //             />
        //             <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
        //             <CommandGroup>
        //                 {clientes.map((cliente) => (
        //                     <CommandItem
        //                         key={cliente.Codcliente}
        //                         value={cliente.Nomcliente}
        //                         onSelect={(currentValue) => {
        //                             setOpen(false);
        //                             onSelect(cliente.Codcliente.toString());
        //                         }}
        //                     >
        //                         <Check
        //                             className={cn(
        //                                 "mr-2 h-4 w-4",
        //                                 value === cliente.Codcliente.toString() ? "opacity-100" : "opacity-0"
        //                             )}
        //                         />
        //                         {cliente.Nomcliente}
        //                     </CommandItem>
        //                 ))}
        //             </CommandGroup>
        //         </Command>
        //     </PopoverContent>
        // </Popover>
<CboDinamica  classNameCombo={classNameCombo} classNameLista={classNameLista}  label='Cliente:'
            data={data} carregarOpcoes={carregarOpcoes} mostraDadosLista={false}
            itemListaSelecionado={{ Value: value, Description: '' }} onSelect={onSelect}
             />
    );
};

export default FilterCliente;