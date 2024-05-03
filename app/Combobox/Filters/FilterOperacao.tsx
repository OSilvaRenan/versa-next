
"use client"
import axios from 'axios';
import { useState } from 'react';
import { CboDinamica } from '../CboDinamica';
import { CboData } from '../CboEstatica';

interface OperacaoRequest {
    Nomoperacao: string;
}

interface OperacaoResponse {
    Codoperacao: number;
    Nomoperacao: string;
}

interface Props {
    classNameCombo?: string;
    classNameLista?: string;
    value: string;
    onSelect: (value: string) => void
}

const FilterOperacao = ({ classNameCombo, classNameLista,  value, onSelect }: Props) => {

    const [data, setData] = useState<CboData[]>([]);

    const carregarOpcoes = async (event: any) => {
        if (event.key === 'Enter') {
            try {

                var request: OperacaoRequest = {
                    Nomoperacao: event.target.value,
                }

                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/operacoes`, request).then(response => {

                    const dadosTransformados: CboData[] = response.data.map((item: OperacaoResponse) => ({
                        Value: item.Codoperacao,
                        Description: item.Nomoperacao
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
        //     <PopoverTrigger asChild style={{ width }} className={className} >
        //         <Button
        //             variant="outline"
        //             role="combobox"
        //             aria-expanded={open}
        //             className="w-[200px] justify-between"
        //         >
        //             {
        //                   value != "" && operacoes.length > 0
        //                     ? operacoes.find((operacao) => operacao.Codoperacao === parseInt(value))?.Nomoperacao
        //                     : "Selecione a operação..."}
        //             <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        //         </Button>
        //     </PopoverTrigger>
        //     <PopoverContent className="w-[200px] p-0" style={{ width }}>
        //         <Command >
        //             <CommandInput placeholder="Procurar operação..."
        //                 onKeyDown={handleSearch}
        //             />
        //             <CommandEmpty>Nenhuma operação encontrada.</CommandEmpty>
        //             <CommandGroup>
        //                 {operacoes.map((operacao) => (
        //                     <CommandItem
        //                         key={operacao.Codoperacao}
        //                         value={operacao.Nomoperacao}
        //                         onSelect={(currentValue) => {
        //                             setOpen(false);
        //                             onSelect(operacao.Codoperacao.toString());
        //                         }}
        //                     >
        //                         <Check
        //                             className={cn(
        //                                 "mr-2 h-4 w-4",
        //                                 value === operacao.Codoperacao.toString() ? "opacity-100" : "opacity-0"
        //                             )}
        //                         />
        //                         {operacao.Nomoperacao}
        //                     </CommandItem>
        //                 ))}
        //             </CommandGroup>
        //         </Command>
        //     </PopoverContent>
        // </Popover>
        <CboDinamica classNameCombo={classNameCombo} classNameLista={classNameLista} label='Operação:'
            data={data} carregarOpcoes={carregarOpcoes} mostrarValue={false}
            itemListaSelecionado={{ Value: value, Description: '' }} onSelect={onSelect}
        />
    );
};

export default FilterOperacao;