"use client"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Button } from '@/components/ui/button';

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {

    const searchParams = useSearchParams();

    const error = searchParams.get('error');

    async function logar(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const data = {
            nome: formData.get("name"),
            senha: formData.get("password"),
        }
        signIn(
            "credentials", {
            ...data,
            callbackUrl: "/paginas/home"
        }
        )
    }

    return (
        <div className="h-screen flex justify-center items-center bg-slate-500 px-5 ">
            <form
                onSubmit={logar}
                className='bg-white p-6 rounded-lg w-96 max-w-full flex-col gap-2'>
                <h2 className="font-bold text-xl">Login</h2>
                <div className="form-group py-2 w-full">
                    <Label htmlFor="name" className="form-label">Usuário:</Label>
                    <Input type="text" id="name" name="name" className="form-control" required />
                </div>
                <div className="form-group py-2 w-full">
                    <Label htmlFor="password" className="form-label">Senha:</Label>
                    <Input type="password" id="password" name="password" className="form-control" required />
                </div>
                <div className="form-group py-2 ">
                    <Button
                        type="submit"
                        // type='button'
                        onClick={() => logar}
                        className="btn btn-primary w-full">Entrar</Button>
                </div>
                {error === "CredentialsSignin" && <span className='text-red-500 w-full flex justify-center items-center py-2 '>Erro ao efetuar login.</span>}
            </form>

        </div>
    );
};

