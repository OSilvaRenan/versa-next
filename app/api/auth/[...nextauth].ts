// app/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
 
    // Adicione outros provedores aqui
  ],
};

export default NextAuth(authOptions);