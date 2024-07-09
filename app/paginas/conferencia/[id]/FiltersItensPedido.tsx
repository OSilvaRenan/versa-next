"use client"
import { formatarData } from '@/app/functions/functions'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ConferenciaResponseDTO, separacaoResponse } from '../ConferenciaDTO'

interface Props {
    params: { id: string };
    conferencia?: ConferenciaResponseDTO
}

export const FiltersItensPedido = ({ params, conferencia }: Props) => {

  

    return (
        <div >
            <Card>
                <CardContent className='container py-2'>
                    <Tabs defaultValue="pedido" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="pedido">O Pedido</TabsTrigger>
                            <TabsTrigger value="destinatario">Destinatario</TabsTrigger>
                            <TabsTrigger value="transporte">Transporte</TabsTrigger>
                            <TabsTrigger value="fiscal">Fiscal</TabsTrigger>
                        </TabsList>
                        <TabsContent value="pedido" className="min-h-[200px] h-[200px] max-h[200px]">
                            {conferencia ?
                                <div className="flex flex-1 items-start flex-col">
                                    <div className="flex flex-1 items-center space-x-2 py-2">
                                        <div className='flex flex-col'>
                                            <Label className="py-2" htmlFor="tipoperiodo">Cliente:</Label>
                                            <Input type="text" id="datInicio"
                                                name="datInicio" className="h-8 w-[250px] lg:w-[250px] bg-gray-200"
                                                value={conferencia.Nomcliente}
                                                readOnly={true}
                                            // onChange={(e) => setDatInicio(e.target.value)}
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <Label className="py-2" htmlFor="tipoperiodo">Transportadora:</Label>
                                            <Input type="text" id="datInicio"
                                                name="datInicio" className="h-8 w-[250px] lg:w-[250px] bg-gray-200"
                                                value={conferencia.Nomtransportadora}
                                                readOnly={true}
                                            // onChange={(e) => setDatInicio(e.target.value)}
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <Label className="py-2" htmlFor="tipoperiodo">Situação:</Label>
                                            <Input type="text" id="datInicio"
                                                name="datInicio" className="h-8 w-[250px] lg:w-[250px] bg-gray-200"
                                                value={conferencia.Situacaoconferencia}
                                                readOnly={true}
                                            // onChange={(e) => setDatInicio(e.target.value)}
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <Label className="py-2" htmlFor="tipoperiodo">Data Conferencia:</Label>
                                            <Input id="datInicio"
                                                name="datInicio" className="h-8 w-[200px] lg:w-[200px] bg-gray-200"
                                                value={formatarData(conferencia.Datconferencia)}
                                                readOnly={true}
                                            // onChange={(e) => setDatInicio(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-1 items-end space-x-2 py-2 align-middle">
                                        <div className='flex flex-col'>
                                            <Label className="py-2" htmlFor="tipoperiodo">Operação:</Label>
                                            <Input type="text" id="datInicio"
                                                name="datInicio" className="h-8 w-[655px] lg:w-[655px] bg-gray-200"
                                                value={conferencia.Nomoperacao}
                                                readOnly={true}
                                            // onChange={(e) => setDatInicio(e.target.value)}
                                            />
                                        </div>


                                    </div>

                                </div> : null}
                        </TabsContent>
                        <TabsContent value="destinatario" className="min-h-[200px] h-[200px] max-h[200px]" >Destinatario</TabsContent>
                        <TabsContent value="transporte" className="min-h-[200px] h-[200px] max-h[200px]" >Transporte</TabsContent>
                        <TabsContent value="fiscal" className="min-h-[200px] h-[200px] max-h[200px]" >Fiscal</TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
