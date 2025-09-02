"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

import FilterCliente from '@/app/Combobox/Filters/FilterCliente';
import FilterOperacao from '@/app/Combobox/Filters/FilterOperacao';
import FilterSituacao from '@/app/Combobox/Filters/FilterSituacao';
import FilterTipoPeriodo from '@/app/Combobox/Filters/FilterTipoPeriodo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Filters = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [datInicio, setDatInicio] = useState(searchParams.get('datInicio') || new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]);
    const [datFim, setDatFim] = useState(searchParams.get('datFim') || new Date().toISOString().split('T')[0]);
    const [tipoperiodo, setTipoperiodo] = useState(searchParams.get('tipoperiodo') || '3');
    const [codsituacao, setCodsituacao] = useState(searchParams.get('codsituacao') || '-1');
    const [codoperacao, setCodoperacao] = useState(searchParams.get('codoperacao') || '');
    const [codcliente, setCodcliente] = useState(searchParams.get('codcliente') || '');

    const handlePesquisa = () => {
        const params = new URLSearchParams(searchParams);

    datInicio ? params.set('datInicio', datInicio) : setDatInicio('-1');

    datFim ? params.set('datFim', datFim) : setDatFim('-1');

    tipoperiodo ? params.set('tipoperiodo', tipoperiodo) : setTipoperiodo('-1');

     codsituacao !== '-1' ? params.set('codsituacao', codsituacao) : setCodsituacao('-1');

    codoperacao && codoperacao !== '-1' ? params.set('codoperacao', codoperacao) : setCodoperacao('-1');

    codcliente && codcliente !== '-1' ? params.set('codcliente', codcliente) : setCodcliente('-1');

    const query = params.size ? params.toString() : '';
    router.push('/paginas/conferencia?' + query);
    };
    

    return (
        <>
            <div className="flex flex-row justify-between py-2 self-center">
                <span className="py-2">Consulta Conferência</span>
                <Button onClick={handlePesquisa} type="button">Pesquisar</Button>
            </div>
            <Card className="min-h-[170px] max-w-full">
                <CardContent>
                    <div className="flex items-center justify-between max-h-full max-w-full mx-auto">
                        <form className="flex items-start flex-row flex-wrap max-w-full lg:justify-start justify-between">
                            <div className="flex items-start flex-row flex-wrap max-w-full space-y-2 lg:justify-start justify-between sm:space-x-2">
                                <div className="flex flex-col pt-2">
                                    <Label className="py-2" htmlFor="tipoperiodo">Tipo Período:</Label>
                                    <FilterTipoPeriodo value={tipoperiodo} onSelect={setTipoperiodo} width={"85px"} />
                                </div>
                                <div className="flex flex-col lg:pl-3">
                                    <Label className="py-2 px-2" htmlFor="datInicio">Data Início:</Label>
                                    <Input type="date" id="datInicio" name="datInicio" className="h-8 lg:w-[155px] w-[160px] max-w-full"
                                        value={datInicio} onChange={(e) => setDatInicio(e.target.value)} />
                                </div>
                                <div className="flex flex-col lg:px-3">
                                    <Label className="py-2" htmlFor="datFim">Data Fim:</Label>
                                    <Input type="date" id="datFim" name="datFim" className="h-8 lg:w-[150px] w-[160px] max-w-full"
                                        value={datFim} onChange={(e) => setDatFim(e.target.value)} />
                                </div>
                                <div className="flex flex-col">
                                    <FilterSituacao classNameCombo="lg:w-[170px] w-[160px] h-8" classNameLista="lg:w-[250px] p-0 w-screen" 
                                        value={codsituacao === "" ? -1 : parseInt(codsituacao)} onSelect={setCodsituacao} />
                                </div>
                            </div>
                            <div className="flex items-start lg:flex-row sm:flex-row sm:space-x-2 flex-column flex-wrap max-w-full lg:justify-start justify-between">
                                <div className="flex flex-col lg:pr-2 pt-2">
                                    <FilterOperacao classNameCombo="lg:w-[360px] w-[250px] max-w-screen-md h-8" classNameLista="lg:w-[360px] w-[300px] p-0"
                                        value={codoperacao} onSelect={setCodoperacao} />
                                </div>
                                <div className="flex flex-col pt-2">
                                    <FilterCliente classNameCombo="lg:w-[340px] w-[250px] h-8" classNameLista="lg:w-[340px] w-[300px] p-0"
                                        value={codcliente} onSelect={setCodcliente} />
                                </div>
                            </div>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default Filters;
