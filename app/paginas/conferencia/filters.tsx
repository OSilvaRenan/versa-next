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

    const searchParams = useSearchParams()!;
    const [datInicio, setDatInicio] = useState(searchParams.get('datInicio') || new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]);
    const [datFim, setDatFim] = useState(searchParams.get('datFim') || new Date().toISOString().split('T')[0]);
    const [tipoperiodo, setTipoperiodo] = useState(searchParams.get('tipoperiodo') || '0');
    const [codsituacao, setCodsituacao] = useState(searchParams.get('codsituacao') || '');
    const [codoperacao, setCodoperacao] = useState(searchParams.get('codoperacao') || '');
    const [codcliente, setCodcliente] = useState(searchParams.get('codcliente') || '');
    const router = useRouter();

    function Pesquisa() {

        const params = new URLSearchParams(searchParams);

        if (datInicio) params.set('datInicio', datInicio);

        if (datFim) params.set('datFim', datFim);

        if (tipoperiodo) params.set('tipoperiodo', tipoperiodo);

        if (codsituacao) params.set('codsituacao', codsituacao);

        if (codoperacao) params.set('codoperacao', codoperacao);

        if (codcliente) params.set('codcliente', codcliente);

        const query = params.size ? params.toString() : '';

        router.push('/paginas/conferencia?' + query);
    }

    return (
        <>
            <div className="flex flex-row justify-between  py-2 self-center space-x-2">
                <span className="py-2 px-2"> Consulta Conferência </span>
                <Button onClick={Pesquisa} type="button">Pesquisar</Button>
            </div>
            <Card className="min-h-[170px]">
                <CardContent>
                    <div className="flex items-center justify-between max-h-full mx-auto ">
                        <form className="flex flex-1 items-start flex-col">
                            <div className="flex flex-1 items-center space-x-2 py-2">
                                <div className='flex flex-col'>
                                    <Label className="py-2" htmlFor="tipoperiodo">Tipo Período:</Label>
                                    <FilterTipoPeriodo value={tipoperiodo} onSelect={setTipoperiodo} width={"100px"} />
                                </div>
                                <div className='flex flex-col'>
                                    <Label className="py-2" htmlFor="datInicio">Data Início:</Label>
                                    <Input type="date" id="datInicio"
                                        name="datInicio" className="h-8 w-[150px] lg:w-[150px]"
                                        value={datInicio}
                                        onChange={(e) => setDatInicio(e.target.value)} />
                                </div>
                                <div className='flex flex-col'>
                                    <Label className="py-2" htmlFor="datFim">Data Fim:</Label>
                                    <Input type="date" id="datFim"
                                        name="datFim" className="h-8 w-[150px] lg:w-[150px]"
                                        value={datFim}
                                        onChange={(e) => setDatFim(e.target.value)} />
                                </div>
                                <div className='flex flex-col self-end'>
                                    <FilterSituacao classNameCombo="w-[175px] h-8" classNameLista="w-[250px] p-0" value={codsituacao == "" ? -1 : parseInt(codsituacao)} onSelect={setCodsituacao} />
                                </div>

                            </div>
                            <div className="flex flex-1 items-center space-x-2 py-1">
                                <div className='flex flex-col'>
                                    <FilterOperacao classNameCombo="w-[360px] h-8" classNameLista="w-[360px] p-0" value={codoperacao} onSelect={setCodoperacao} />
                                </div>
                                <div className='flex flex-col'>
                                    <FilterCliente classNameCombo="w-[330px]  h-8" classNameLista="w-[330px] p-0" value={codcliente} onSelect={setCodcliente} />
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