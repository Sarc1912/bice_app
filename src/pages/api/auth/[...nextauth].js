import NextAuth from 'next-auth'
import { SessionProvider, Providers } from 'next-auth/react';
import CredentialsProvider from "next-auth/providers/credentials"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "username", type: "text" },
        password: {  label: "password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          const user = await prisma.User.findUnique({
            where: { username: credentials.username },
          })
      
          if (user && user.clave === credentials.password) {
            console.log("here")
            return { id: user.id, name: user.correo }
          } else {
            console.log("here")
            return null
          }
        } catch (error) {
          console.error("Error al buscar al usuario:", error)
          return null
        }
      }
    })
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session(session, token) {
      session.userId = token.id
      return session
    },
  },
})
