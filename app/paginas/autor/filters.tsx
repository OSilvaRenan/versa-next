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
import { useState } from 'react';


const Filters = () => {

    const [search, setSearch] = useState((useSearchParams()!).get('search') || '');
    const router = useRouter();

    function Pesquisa() {

        const params = new URLSearchParams(useSearchParams()!!);

        if (search) params.set('search', search);
        const query = params.size ? params.toString() : '';

        router.push('/paginas/autor?' + query);
    }

    return (
        <>
            <div className="flex flex-row justify-between py-2 self-center">
                <span className="py-2">Consulta Autor</span>
                <Button onClick={Pesquisa} type="button">Pesquisar</Button>
            </div>
            <Card className="min-h-[170px] max-w-full">
                <CardContent>
                    <div className="flex items-center justify-between max-h-full max-w-full mx-auto ">
                        <form className="flex items-start flex-row flex-wrap max-w-full lg:justify-start justify-between">
                            <div className="flex items-start lg:flex-row sm:flex-row sm:space-x-2 flex-column flex-wrap max-w-full lg:justify-start justify-between ">
                                <div className='flex flex-col lg:pr-2 pt-2'>
                                <Label className="py-2" htmlFor="search">Nome:</Label>
                                    <Input
                                        // type='hidden'
                                        id="search"
                                        name="search"
                                        placeholder="Filter..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                       className="h-8 lg:w-[200px] w-[200px] max-w-full"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </>


    )
};

export default Filters;