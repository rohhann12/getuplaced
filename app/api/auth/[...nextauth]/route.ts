import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import prisma from "../../../utils/db";

export async function upsertGoogleUser(googleUser: any) {
  const { email, name } = googleUser;

  if (!email) return null;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) return existingUser;

  const newUser = await prisma.user.create({
    data: {
      email,
      name
    },
  });

  return newUser;
}

interface ExtendedToken extends JWT {
  accessToken?: string;
  refreshToken?: string;
  email?: string;
}

export const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.G_CLIENT_ID!,
      clientSecret: process.env.G_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }

      if (user?.email) {
        token.email = user.email;
      }

      return token as ExtendedToken;
    },
    async session({ session, token }) {
      session.accessToken = (token as ExtendedToken).accessToken;
      return session;
    },
    async signIn({ user }) {
      await upsertGoogleUser({
        email: user.email,
        name: user.name,
      });
      return true;
    },
  },
  pages: {
    signIn: "/",
  },
});

export { authOptions as GET, authOptions as POST };
