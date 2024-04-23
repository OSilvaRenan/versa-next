import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const FiltersItensPedido = () => {
    return (
        <div className='py-2'>
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
                            <form className="flex flex-1 items-start flex-col">
                                <div className="flex flex-1 items-center space-x-2 py-2">
                                    <div className='flex flex-col'>
                                        <Label className="py-2" htmlFor="tipoperiodo">Input Teste 01:</Label>
                                        <Input type="text" id="datInicio"
                                            name="datInicio" className="h-8 w-[250px] lg:w-[250px] bg-gray-200"
                                            value={"Input Teste 01"}
                                            readOnly={true}
                                        // onChange={(e) => setDatInicio(e.target.value)}
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <Label className="py-2" htmlFor="tipoperiodo">Input Teste 02:</Label>
                                        <Input type="text" id="datInicio"
                                            name="datInicio" className="h-8 w-[250px] lg:w-[250px] bg-gray-200"
                                            value={"Input Teste 02"}
                                            readOnly={true}
                                        // onChange={(e) => setDatInicio(e.target.value)}
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <Label className="py-2" htmlFor="tipoperiodo">Input Teste 03:</Label>
                                        <Input type="text" id="datInicio"
                                            name="datInicio" className="h-8 w-[250px] lg:w-[250px] bg-gray-200"
                                            value={"Input Teste 01"}
                                            readOnly={true}
                                        // onChange={(e) => setDatInicio(e.target.value)}
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <Label className="py-2" htmlFor="tipoperiodo">Input Teste 04</Label>
                                        <Input type="date" id="datInicio"
                                            name="datInicio" className="h-8 w-[200px] lg:w-[200px] bg-gray-200"
                                            value={"2020-12-12"}
                                            readOnly={true}
                                        // onChange={(e) => setDatInicio(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-1 items-end space-x-2 py-2 align-middle">
                                    <div className='flex flex-col'>
                                        <Label className="py-2" htmlFor="tipoperiodo">Input Teste 05:</Label>
                                        <Input type="text" id="datInicio"
                                            name="datInicio" className="h-8 w-[655px] lg:w-[655px] bg-gray-200"
                                            value={"Input Teste 05"}
                                            readOnly={true}
                                        // onChange={(e) => setDatInicio(e.target.value)}
                                        />
                                    </div>

                                    <div className='flex flex-col '>
                                        <Button className="h-8"
                                            type="button">Cancelar Pedido</Button>
                                    </div>

                                    <div className='flex flex-col'>
                                        <Button className="h-8"
                                            type="button">Enviar P/Separação</Button>
                                    </div>
                                </div>

                            </form>
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
