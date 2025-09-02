"use client"
import { getSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface Props {
    children: React.ReactNode;
}

function RotaProtegida({ children }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            const session = await getSession();
            if (!session && pathname !== '/paginas') {
                // Redireciona para a página de login apenas se não estiver já nela
                router.push('/paginas');
            }
        };

        checkAuth();
    }, []);

    return children;
}

export default RotaProtegida;
