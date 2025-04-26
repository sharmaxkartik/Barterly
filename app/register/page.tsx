"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

async function registerUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save additional user data into Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date(),
    });

    console.log("User registered and added to Firestore:", user.uid);
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error(
        "This email is already registered. Please use a different email."
      );
    }
    console.error("Error registering user:", error.message);
    throw new Error(error.message); // Re-throw the error to handle it in the calling function
  }
}

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerUser(email, password);
      console.log("User Registered:", { email, password });

      // Redirect to profile after successful registration
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profile",
      });
    } catch (err: any) {
      setError(err.message || "Failed to register user.");
    }
  };

  return (
    <div className="container relative h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-10 lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
        <div className="relative z-20 flex items-center text-lg font-medium text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Skill Mint
        </div>
        <div className="relative z-20 mt-auto text-white">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;I was surprised by how much I could learn by trading
              skills. The platform makes it easy to connect with professionals
              in various fields.&rdquo;
            </p>
            <footer className="text-sm">James Wilson</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign up to start trading skills and growing your expertise
            </p>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="social">Social Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <Card>
                <CardContent className="pt-4">
                  <form onSubmit={handleRegister}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-300"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-md border border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="password"
                          className="text-sm font-medium text-gray-300"
                        >
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded-md border border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="confirm-password"
                          className="text-sm font-medium text-gray-300"
                        >
                          Confirm Password
                        </label>
                        <input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full rounded-md border border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                      <Button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-all"
                      >
                        Create Account
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <div className="mt-2 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="social">
              <Card>
                <CardContent className="pt-4">
                  <div className="grid gap-4">
                    <Button variant="outline" className="w-full" type="button">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
