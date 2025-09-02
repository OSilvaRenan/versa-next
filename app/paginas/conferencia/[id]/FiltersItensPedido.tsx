'use client';
import FilterEmbalagem from '@/app/Combobox/Filters/FilterEmbalagem';
import { formatarData } from '@/app/functions/functions';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useConferencia } from './ConferenciaContext';

interface Props {
    params: { id: string };
    // conferencia?: ConferenciaResponseDTO;
    // codembalagem: string;
    // setCodembalagem: (value: string) => void;
    // setEmbalagem: (value: CboData) => void;
}

export const FiltersItensPedido = ({ params
    // , conferencia, codembalagem, setCodembalagem,setEmbalagem
}: Props) => {

    const {
        conferencia,
        codembalagem, setCodembalagem, setEmbalagem,
    } = useConferencia();

    return (
        <div>
            <Card>
                <CardContent className="container py-2 pb-4">
                    <Tabs defaultValue="pedido" className="w-full">
                        <TabsList>
                            <TabsTrigger value="pedido" className="font-medium w-full">
                                Pedido
                            </TabsTrigger>
                            <TabsTrigger value="destinatario" className="font-medium w-full">
                                Destinatário
                            </TabsTrigger>
                            <TabsTrigger value="transporte" className="font-medium w-full">
                                Transporte
                            </TabsTrigger>
                            <TabsTrigger value="fiscal" className="font-medium w-full">
                                Fiscal
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="pedido" className="lg:min-h-[200px] lg:h-[200px] lg:max-h-[200px] min-h-auto">
                            {conferencia ? (
                                <div className="flex flex-wrap items-start justify-start">
                                    <div className="flex flex-wrap w-full">
                                        <div className="flex flex-col p-2 w-full lg:w-1/4">
                                            <Label className="py-2" htmlFor="tipoperiodo">
                                                Cliente:
                                            </Label>
                                            <Input
                                                type="text"
                                                id="txtNomcliente"
                                                name="datInicio"
                                                className="h-8 w-full bg-gray-200"
                                                value={conferencia.Nomcliente}
                                                readOnly
                                            />
                                        </div>
                                        <div className="flex flex-col p-2 w-full lg:w-1/6">
                                            <Label className="py-2" htmlFor="tipoperiodo">
                                                Data Conferência:
                                            </Label>
                                            <Input
                                                type="text"
                                                id="datInicio"
                                                className="h-8 w-full bg-gray-200"
                                                value={formatarData(conferencia.Datconferencia)}
                                                readOnly
                                            />
                                        </div>
                                        <div className="flex flex-col p-2 w-full lg:w-1/5">
                                            <Label className="py-2" htmlFor="tipoperiodo">
                                                Usuario:
                                            </Label>
                                            <Input
                                                type="text"
                                                id="datInicio"
                                                name="datInicio"
                                                className="h-8 w-full bg-gray-200"
                                                value={conferencia.Nomusuario}
                                                readOnly
                                            />
                                        </div>
                                        <div className="flex flex-col p-2 w-full lg:w-1/3">
                                            <Label className="py-2" htmlFor="txtTransportadora">
                                                Transportadora:
                                            </Label>
                                            <Input
                                                id="txtTransportadora"
                                                className="h-8 w-full bg-gray-200"
                                                value={conferencia.Nomtransportadora}
                                                readOnly
                                            />
                                        </div>
                                        <div className="flex flex-col p-2 w-full lg:w-1/3">
                                            <Label className="py-2" htmlFor="tipoperiodo">
                                                Operação:
                                            </Label>
                                            <Input
                                                type="text"
                                                id="datInicio"
                                                name="datInicio"
                                                className="h-8 w-full bg-gray-200"
                                                value={conferencia.Nomoperacao}
                                                readOnly
                                            />
                                        </div>
                                        <div className="flex flex-col p-2 w-full lg:w-1/3">
                                            <Label className="py-2" htmlFor="tipoperiodo">
                                                Situação:
                                            </Label>
                                            <Input
                                                type="text"
                                                id="datInicio"
                                                name="datInicio"
                                                className="h-8 w-full bg-gray-200"
                                                value={conferencia.Situacaoconferencia}
                                                readOnly
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <FilterEmbalagem classNameCombo="lg:w-[170px] w-[160px] h-8" classNameLista="lg:w-[250px] p-0 w-screen" value={codembalagem == "" ? -1 : parseInt(codembalagem)}
                                                onSelect={setCodembalagem} codconferencia={conferencia.Codconferencia} setEmbalagem={setEmbalagem} />
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </TabsContent>
                        <TabsContent value="destinatario" className="min-h-[200px] h-[200px] max-h-[200px]">
                            Destinatário
                        </TabsContent>
                        <TabsContent value="transporte" className="min-h-[200px] h-[200px] max-h-[200px]">
                            Transporte
                        </TabsContent>
                        <TabsContent value="fiscal" className="min-h-[200px] h-[200px] max-h-[200px]">
                            Fiscal
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
