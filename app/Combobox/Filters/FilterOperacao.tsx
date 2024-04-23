
"use client"
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface OperacaoRequest {
    Nomoperacao: string;
}

interface OperacaoResponse {
    Codoperacao: number;
    Nomoperacao: string;
}

interface Props {
    width: string;
    value: string;
    className: string;
    onSelect: (value: string) => void
}

const FilterOperacao = ({ width, value, onSelect, className }: Props) => {

    const [operacoes, setOperacoes] = useState<OperacaoResponse[]>([]);
    const [open, setOpen] = useState(false)

    const handleSearch = async (event: any) => {
        if (event.key === 'Enter') {
            try {

                var request: OperacaoRequest = {
                    Nomoperacao: event.target.value,
                }

                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/operacoes`, request)
                    .then(function (response) {
                        setOperacoes(response.data);
                    });

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }

        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild style={{ width }} className={className} >
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {
                          value != "" && operacoes.length > 0
                            ? operacoes.find((operacao) => operacao.Codoperacao === parseInt(value))?.Nomoperacao
                            : "Selecione a operação..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" style={{ width }}>
                <Command >
                    <CommandInput placeholder="Procurar operação..."
                        onKeyDown={handleSearch}
                    />
                    <CommandEmpty>Nenhuma operação encontrada.</CommandEmpty>
                    <CommandGroup>
                        {operacoes.map((operacao) => (
                            <CommandItem
                                key={operacao.Codoperacao}
                                value={operacao.Nomoperacao}
                                onSelect={(currentValue) => {
                                    setOpen(false);
                                    onSelect(operacao.Codoperacao.toString());
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === operacao.Codoperacao.toString() ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {operacao.Nomoperacao}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>

    );
};

export default FilterOperacao;