// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as any;

        // ✅ Here: replace this with your database check
        if (
          email === "kuldeepsinghbhadouriya1093@gmail.com" &&
          password === "Kuldeep@123"
        ) {
          return { id: "1", name: "Admin", email: "admin@barterly.com" };
        }

        // ❌ No match
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET, // Add to your .env file
});

export { handler as GET, handler as POST };
