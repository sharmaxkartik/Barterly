"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Adjusted import
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Import Firestore instance

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user details from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Redirect to profile page with user details
        router.push(
          `/profile?uid=${user.uid}&firstName=${userData.firstName}&lastName=${userData.lastName}&email=${userData.email}`
        );
      } else {
        alert("User profile not found.");
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      alert("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="container relative h-screen flex items-center justify-center">
      <div className="p-4 lg:p-8 w-full max-w-4xl flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="social">Social Login</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <Card>
                <CardContent className="pt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          type="email"
                          className="w-full rounded-md border border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="password"
                          className="text-sm font-medium"
                        >
                          Password
                        </label>
                        <input
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          type="password"
                          className="w-full rounded-md border border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="remember"
                            className="rounded border-gray-300"
                          />
                          <label
                            htmlFor="remember"
                            className="text-sm text-muted-foreground"
                          >
                            Remember me
                          </label>
                        </div>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <div className="mt-2 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="text-primary hover:underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="social">
              <Card>
                <CardContent className="pt-4 pb-2">
                  <div className="grid gap-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      type="button"
                      onClick={() =>
                        signIn("google", { callbackUrl: "/profile" })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="mr-2 h-4 w-4"
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.63 1.23 9.1 3.26l6.8-6.8C35.63 2.68 30.1 0 24 0 14.64 0 6.68 5.74 3.1 14.06l7.9 6.14C12.7 13.5 17.9 9.5 24 9.5z"
                        />
                        <path
                          fill="#34A853"
                          d="M46.5 24c0-1.5-.14-2.95-.4-4.35H24v8.3h12.7c-.55 2.95-2.2 5.45-4.7 7.15l7.3 5.7C43.6 37.15 46.5 31.05 46.5 24z"
                        />
                        <path
                          fill="#4A90E2"
                          d="M12.7 28.2l-7.9 6.14C6.68 42.26 14.64 48 24 48c5.9 0 11.43-2.68 15.2-7.1l-7.3-5.7c-2.4 1.6-5.4 2.5-7.9 2.5-6.1 0-11.3-4-13.3-9.5z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M3.1 14.06C1.1 18.6 0 23.2 0 24s1.1 5.4 3.1 9.94l7.9-6.14C9.7 25.5 9.5 24.8 9.5 24s.2-1.5.5-2.8l-7.9-6.14z"
                        />
                      </svg>
                      Continue with Google
                    </Button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-center text-sm text-muted-foreground w-full">
                    <Link
                      href="/register"
                      className="text-primary hover:underline underline-offset-4 w-full inline-block"
                    >
                      Create an account
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
