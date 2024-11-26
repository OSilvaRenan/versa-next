'use client';
import { formatarData } from '@/app/functions/functions';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ConferenciaResponseDTO, separacaoResponse } from '../ConferenciaDTO';

interface Props {
    params: { id: string };
    conferencia?: ConferenciaResponseDTO;
}

export const FiltersItensPedido = ({ params, conferencia }: Props) => {
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
                                        <div className="flex flex-col p-2 w-full lg:w-1/3">
                                            <Label className="py-2" htmlFor="tipoperiodo">
                                                Cliente:
                                            </Label>
                                            <Input
                                                type="text"
                                                id="datInicio"
                                                name="datInicio"
                                                className="h-8 w-full bg-gray-200"
                                                value={conferencia.Nomcliente}
                                                readOnly
                                            />
                                        </div>
                                        <div className="flex flex-col p-2 w-full lg:w-1/3">
                                            <Label className="py-2" htmlFor="tipoperiodo">
                                                Transportadora:
                                            </Label>
                                            <Input
                                                type="text"
                                                id="datInicio"
                                                name="datInicio"
                                                className="h-8 w-full bg-gray-200"
                                                value={conferencia.Nomtransportadora}
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
                                        <div className="flex flex-col p-2 w-full lg:w-1/3">
                                            <Label className="py-2" htmlFor="tipoperiodo">
                                                Data Conferência:
                                            </Label>
                                            <Input
                                                id="datInicio"
                                                name="datInicio"
                                                className="h-8 w-full bg-gray-200"
                                                value={formatarData(conferencia.Datconferencia)}
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
