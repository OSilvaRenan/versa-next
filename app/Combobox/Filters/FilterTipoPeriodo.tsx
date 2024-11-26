
"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
    width: string;
    value: string;
    onSelect: (value: string) => void
}

const FilterTipoPeriodo = ({ value, onSelect }: Props) => {

    const tiposPeriodo = [
        { id: "0", label: "Inicio" },
        { id: "1", label: "Conclusão" },
        { id: "2", label: "Data Nota" },
        { id: "3", label: "Data Conferencia" },
    ]

    return (
        <Select value={value} onValueChange={(selectedValue) => { onSelect(selectedValue) }}>
            <SelectTrigger className="h-8 lg:w-[195px] w-[160px] min-w-full max-w-full" id="tipoperiodo" name="tipoperiodo" >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {tiposPeriodo.map((periodo) => (
                    <SelectItem key={periodo.id} value={periodo.id}>{periodo.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>

    );
};

export default FilterTipoPeriodo;