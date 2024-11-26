"use client"
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';

function RotaProtegida({ children }: any) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            const session = await getSession();
            if (!session && pathname !== '/login') {
                // Redireciona para a página de login apenas se não estiver já nela
                router.push('/login');
            }
        };

        checkAuth();
    }, []);

    return children;
}

export default RotaProtegida;
