import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials"

export interface UsuarioResponse {
    Codacesso: number;
    Codperfil: number;
    Codusuario: number;
    Codusuarioversa: number;
    Nome: string
    Ddd: string
    Telefone: string
    Empresa: string
    Cnpj: string
    Datinclusao: string;
    Indativo: number;
    Userowner: number;
    Codcliente: number;
    Codempresa: number;
    Codvendedor?: number;
    Nomcliente: string
    Obsentrega: string
    Tipofrete: number;
    Codestado: number;
    Codtransportadora: number;
    Codrepresentante: number;
    Cgccpf: string
    Email: string
    Codalmoxarifado: number;
    Token: string
    Codempresacli: number;
    Codoperacao: number;
}

// Estenda a interface padrão Session para incluir UsuarioResponse
declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user?: UsuarioResponse;
    }
}

// Estendendo a interface JWT para incluir UsuarioResponse
declare module "next-auth/jwt" {
    interface JWT {
      user?: UsuarioResponse & DefaultSession['user'];
    }
  }

const handler = NextAuth({
    pages: {
        signIn: "/",
        signOut: "/"
    },
    callbacks: {
        async jwt({ token, user }) {
          // Se o usuário estiver definido, anexe o UsuarioResponse ao token
          if (user) {
            token.user = {
              ...token.user,
              ...user as unknown as UsuarioResponse
            };
          }
          return token;
        },
        async session({ session, token }) {
          // Anexe o UsuarioResponse à sessão
          if (token.user) {
            session.user = {
              ...session.user,
              ...token.user as UsuarioResponse
            };
          }
          return session;
        },
      },
        providers: [
            CredentialsProvider({
                name: 'Credentials',
                credentials: {
                    nome: { label: "Usuario", type: "text", },
                    senha: { label: "Senha", type: "password" }
                },
                async authorize<UsuarioResponse>(credentials: any,) {

                    if (!credentials) {
                        return null
                    }

                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    })
                    const user: UsuarioResponse = await res.json()

                    // If no error and we have user data, return it
                    if (res.ok && user) {
                        return user
                    }
                    // Return null if user data could not be retrieved
                    return null
                }
            })
        ]
    });

export { handler as GET, handler as POST } 