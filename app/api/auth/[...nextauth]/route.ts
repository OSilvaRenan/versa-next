import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export interface UsuarioResponse {
  Codacesso: number;
  Codperfil: number;
  Codusuario: number;
  Codusuarioversa: number;
  Nome: string;
  Ddd: string;
  Telefone: string;
  Empresa: string;
  Cnpj: string;
  Datinclusao: string;
  Indativo: number;
  Userowner: number;
  Codcliente: number;
  Codempresa: number;
  Codvendedor?: number;
  Nomcliente: string;
  Obsentrega: string;
  Tipofrete: number;
  Codestado: number;
  Codtransportadora: number;
  Codrepresentante: number;
  Cgccpf: string;
  Email: string;
  Codalmoxarifado: number;
  Token: string;
  Codempresacli: number;
  Codoperacao: number;
}

// Estendendo a interface padrão Session para incluir UsuarioResponse
declare module "next-auth" {
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
    signIn: "/login",
    signOut: "/login",
    error: "/login" // Definir página de erro
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          ...token.user,
          ...user as unknown as UsuarioResponse
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user as UsuarioResponse
        };
      }
      return session;
    }
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        nome: { label: "Usuario", type: "text" },
        senha: { label: "Senha", type: "password" }
      },
      async authorize<UsuarioResponse>(credentials: any) {
        if (!credentials) {
          throw new Error('Credenciais não fornecidas');
        }

 
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });

          if (res.status === 401) {
            throw new Error('Nome de usuário ou senha incorretos');
          }

          if (res.status === 500) {
            throw new Error('Erro ao se conectar com a API');
          }

          if (!res.ok) {
            throw new Error('Algo deu errado');

          }

          const user: UsuarioResponse = await res.json();
          if (user) {
            return user;
          } else {
            throw new Error('Nome de usuário ou senha incorretos');
          }
        
      }
    })
  ]
});

export { handler as GET, handler as POST };
