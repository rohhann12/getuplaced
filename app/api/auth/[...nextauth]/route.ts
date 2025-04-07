// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

interface ExtendedToken extends JWT {
  accessToken?: string;
  refreshToken?: string;
}
console.log(process.env.G_CLIENT_ID,process.env.G_CLIENT_SECRET)
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.G_CLIENT_ID!,
      clientSecret: process.env.G_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      },
      
    }
  ),
    
  ],
  
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token as ExtendedToken;
    },
    async session({ session, token }) {
      session.accessToken = (token as ExtendedToken).accessToken;
      return session;
    }
  }
});

// ✅ App Router needs these named exports
export { handler as GET, handler as POST };
