"use client"
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { AutorDTO } from '../../paginas/autor/columns';

interface AutorRequest {
    Nomautor: string;
    PageIndex: number;
    PageSize: number;
}

interface Props {
    width: string;
    onAutorSelect: (value: string) => void
}

const FilterAutor = ({ width, onAutorSelect }: Props) => {

    const [autores, setAutores] = useState<AutorDTO[]>([]);
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [codigo, setCodigo] = useState(0)

    const handleSearch = async (event: any) => {
        if (event.key === 'Enter') {
            try {
                var request: AutorRequest = {
                    Nomautor: event.target.value,
                    PageIndex: 1,
                    PageSize: 10
                }
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/produto/autor/pesquisa`, request)
                    .then(function (response) {
                        setAutores(response.data.Dados);
                    });
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }
    };
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild style={{ width }}>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {
                        value
                            ? autores.find((autor) => autor.Codautor === codigo)?.Nomautor
                            : "Selecione o autor..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" style={{ width }}>
                <Command id='search'>
                    <CommandInput placeholder="Procurar autor..."
                        onKeyDown={handleSearch}
                    />
                    <CommandEmpty>Nenhum autor encontrado.</CommandEmpty>
                    <CommandGroup>
                        {autores.map((autor) => (
                            <CommandItem
                                key={autor.Codautor}
                                value={autor.Nomautor}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                    setCodigo(autor.Codautor);
                                    onAutorSelect(currentValue);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === autor.Codautor.toString() ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {autor.Nomautor}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default FilterAutor;