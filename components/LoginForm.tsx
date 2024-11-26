"use client";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    nome: yup.string().required('Este campo é obrigatório'),
    senha: yup.string().required('Este campo é obrigatório')
});

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const searchParams = useSearchParams();
    const [apiError, setApiError] = useState<string | null>(searchParams.get('error'));

    async function logar(data: { nome: string, senha: string }) {

        try {
            const result = await signIn("credentials", {
                ...data,
                redirect: false 
            });

            if (result?.error) {
                if(result?.error === "fetch failed"){
                    setApiError("Erro ao se conectar com a API.");
                }else{
                    setApiError(result.error);
                }
                

            } else {
                window.location.href = "/paginas/home"; 
            }
        } catch (err) {
            setApiError("Erro ao se conectar com a API.");
            console.error("Erro durante o login:", err);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-slate-500 px-5">
            <form onSubmit={handleSubmit(logar)} className="bg-white p-6 rounded-lg w-96 max-w-full flex-col gap-2">
                <h2 className="font-bold text-xl">Login</h2>
                <div className="form-group py-2 w-full">
                    <Label htmlFor="name" className="form-label">Usuário:</Label>
                    <Input
                        type="text"
                        id="name"
                        {...register("nome")}
                        className="form-control"
                    />
                    {errors.nome && <span className='text-red-500 text-sm'>{errors.nome.message}</span>}
                </div>
                <div className="form-group py-2 w-full">
                    <Label htmlFor="password" className="form-label">Senha:</Label>
                    <Input
                        type="password"
                        id="password"
                        {...register("senha")}
                        className="form-control"
                    />
                    {errors.senha && <span className='text-red-500 text-sm'>{errors.senha.message}</span>}
                </div>
                <div className="form-group py-2 ">
                    <Button type="submit" className="btn btn-primary w-full">Entrar</Button>
                </div>
                {apiError && <span className='text-red-500 w-full flex justify-center items-center py-2'>{apiError}</span>}
                {/* {error && !apiError && <span className='text-red-500 w-full flex justify-center items-center py-2'>{error}</span>} */}
            </form>
        </div>
    );
}
