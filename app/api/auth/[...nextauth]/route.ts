import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import prisma from "../../../utils/db";

async function initializeUserStatus(userId: string) {
  const founders = await prisma.founder.findMany();

  await Promise.all(
    founders.map((founder) =>
      prisma.userFounderStatus.upsert({
        where: {
          userId_founderId: {
            userId,
            founderId: founder.id,
          },
        },
        update: {},
        create: {
          userId,
          founderId: founder.id,
          isSent: false,
        },
      })
    )
  );
}
async function lol(googleUser: any) {
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

const authOptions = NextAuth({
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
      const dbUser = await lol(user);
      if (dbUser) {
        await initializeUserStatus(dbUser.id);
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: "/",
  },
});

export { authOptions as GET, authOptions as POST };
