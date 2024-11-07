import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const AUTH_CONFIG: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google") {
        return true;
      }

      return false;
    },
  },
};
