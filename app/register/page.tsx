"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Adjusted import
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Import Firestore instance

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const firstName = (document.getElementById("firstName") as HTMLInputElement)
      .value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement)
      .value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById("confirmPassword") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
      });

      // Redirect to profile page with user details
      router.push(
        `/profile?uid=${user.uid}&firstName=${firstName}&lastName=${lastName}&email=${email}`
      );
    } catch (error: any) {
      console.error("Error during registration:", error);
      alert(error.message);
    }
  };

  return (
    <div className="container relative h-screen flex items-center justify-center">
      <div className="p-6 lg:p-12 w-full max-w-4xl flex items-center justify-center">
        <div className="flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Create an account
            </h1>
            <p className="text-base text-muted-foreground">
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
                <CardContent className="pt-6">
                  <form onSubmit={handleRegister}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label
                          htmlFor="firstName"
                          className="text-sm font-medium text-gray-300"
                        >
                          First Name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          className="w-full rounded-md border border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="lastName"
                          className="text-sm font-medium text-gray-300"
                        >
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          className="w-full rounded-md border border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                          required
                        />
                      </div>
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
                          className="w-full rounded-md border border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
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
                          className="w-full rounded-md border border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium text-gray-300"
                        >
                          Confirm Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm Password"
                          className="w-full rounded-md border border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-all"
                      >
                        Create Account
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <div className="mt-4 text-center text-sm text-muted-foreground">
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
          </Tabs>
        </div>
      </div>
    </div>
  );
}
