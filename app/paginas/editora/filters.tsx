"use client"
import FilterCliente from '@/app/Combobox/Filters/FilterCliente';
import FilterOperacao from '@/app/Combobox/Filters/FilterOperacao';
import FilterSituacao from '@/app/Combobox/Filters/FilterSituacao';
import FilterTipoPeriodo from '@/app/Combobox/Filters/FilterTipoPeriodo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { DialogCadastroEditora } from './DialogCadastroEditora';
import { EditoraDTO } from './EditoraDTO';
import { CboData } from '@/app/Combobox/CboEstatica';
import { apenasNumeros } from '@/app/functions/functions';
import ListaEditorasGrupo from '@/app/Combobox/ListaEditorasGrupo';

interface Props{
    data: EditoraDTO[]
}

const Filters = ({data}:Props) => {

    const searchParams = useSearchParams()!;

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const router = useRouter();
    const params = new URLSearchParams(searchParams);

    function Pesquisa() {

        if (search) params.set('search', search);
        const query = params.size ? params.toString() : '';

        router.push('/paginas/editora?' + query);
    }

    const [filterValue, setFilterValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 10; // Número de itens por página
    const [filteredData, setFilteredData] = useState<EditoraDTO[]>(data);
    const [editoras, setEditoras] = useState<EditoraDTO[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [codeditoragrupo, setCodeditoragrupo] = useState<string>('');
    const [dataCbo, setDataCbo] = useState<CboData>({
        Value: '',
        Description: ''
    });


    // useEffect(() => {
    //     // Filtragem com base no filtro de valor
    //     const filteredByFilterValue = filterValue
    //         ? data.filter(editora =>
    //             apenasNumeros(filterValue)
    //                 ? editora.Codeditora.toString().includes(filterValue)
    //                 : editora.Nomeditora.toUpperCase().includes(filterValue.toUpperCase())
    //         )
    //         : data;

    //     // Filtragem adicional com base no código do grupo de editoras
    //     // const filteredByCodeditoragrupo = dataCbo.Value != '-1'
    //     //     ? filteredByFilterValue.filter(editora =>
    //     //         editora.Codeditoragrupo.toString() === dataCbo.Value
    //     //     )
    //     //     : filteredByFilterValue;

    //     // setFilteredData(filteredByCodeditoragrupo);
    //     // setPageCount(Math.ceil(filteredByCodeditoragrupo.length / pageSize));
    // }, [filterValue, dataCbo.Value, data, pageSize]);

    // Atualiza a lista de editoras na página atual
    // useEffect(() => {
    //     const newEditoras = filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    //     setEditoras(newEditoras);
    // }, [pageIndex, filteredData]);

    // const goToPage = (pageNumber: number) => {
    //     setPageIndex(pageNumber);
    //     params.set('pg', (pageNumber + 1).toString());
    //     const query = params.size ? params.toString() : '';
    //     router.push('/paginas/editora?' + query);
    // };

    // const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFilterValue(e.target.value);
    //     setPageIndex(0);
    // };

    // useEffect(() => {
    //     params.set('pg', '1');
    //     setPageIndex(0);
    //     const query = params.size ? params.toString() : '';
    //     router.push('/paginas/editora?' + query);
    // }, [pageCount]);

    return (
        <>

            <div className="flex flex-row justify-between py-2 self-center">
                <span className="py-2"> Consulta Editora </span>
                <DialogCadastroEditora />
                <Button onClick={Pesquisa} type="button">Pesquisar</Button>
            </div>
            <Card className="min-h-[170px]">
                <CardContent className='container py-2'>
                    <div className="flex items-end space-x-2 ">
                        <div className='flex flex-col'>
                            <Label className="py-2 " htmlFor="filtro">Filtro Editora: </Label>
                            <div className='flex flex-row space-x-2'>
                                {/* <input
                                    id="filtro"
                                    value={filterValue}
                                    onChange={handleFilterChange}
                                    className="h-8 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm px-2 bg-white border"
                                /> */}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <ListaEditorasGrupo classNameCombo="w-[200px] h-8" classNameLista="w-[200px] p-0"
                                value={dataCbo} onChange={setDataCbo} id="cboEditoraGrupoFilter"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>


    )
};

export default Filters;