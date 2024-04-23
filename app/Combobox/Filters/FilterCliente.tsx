
"use client"
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ClienteRequest {
    Nomcliente: string;
}

interface ClienteResponse {
    Codcliente: number;
    Nomcliente: string;
}

interface Props {
    width: string;
    value: string;
    className: string;
    onSelect: (value: string) => void
}

const FilterCliente = ({ width, value, className, onSelect }: Props) => {

    const [clientes, setClientes] = useState<ClienteResponse[]>([]);
    const [open, setOpen] = useState(false)

    const handleSearch = async (event: any) => {
        if (event.key === 'Enter') {
            try {

                var request: ClienteRequest = {
                    Nomcliente: event.target.value,
                }

                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/clientes`, request)
                    .then(function (response) {
                        setClientes(response.data);
                    });

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }

        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild style={{ width }} className={className}>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {
                        value != "" && clientes.length > 0
                            ? clientes.find((cliente) => cliente.Codcliente === parseInt(value))?.Nomcliente
                            : "Selecione o cliente..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" style={{ width }}>
                <Command >
                    <CommandInput placeholder="Procurar cliente..."
                        onKeyDown={handleSearch}
                    />
                    <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                    <CommandGroup>
                        {clientes.map((cliente) => (
                            <CommandItem
                                key={cliente.Codcliente}
                                value={cliente.Nomcliente}
                                onSelect={(currentValue) => {
                                    setOpen(false);
                                    onSelect(cliente.Codcliente.toString());
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === cliente.Codcliente.toString() ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {cliente.Nomcliente}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>

    );
};

export default FilterCliente;