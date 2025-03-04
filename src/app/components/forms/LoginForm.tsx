"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock } from 'lucide-react';
import Image from 'next/image';
import { login } from '@/app/login/action'


export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/home");
      } else {
        setError(data.error || "An error occurred during login");
      }
    } catch (error) {
      console.error("JWT verification error:", error);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      {/* Left side with background image and gradient overlay */}
      <div className="hidden lg:flex lg:w-1/2 auth-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300/90 to-gray-100/90 flex flex-col justify-between p-12 text-gray-600">
          <div>
            <h2 className="text-4xl font-light mb-2"></h2>
            <h1 className="text-6xl font-bold"></h1>
          </div>
          <div className="text-lg font-bold">
            <h1 className="text-4xl font-bold">Template</h1>
          </div>
          <div className="text-lg font-bold">
            
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-4">
            
            <h2 className="text-3xl font-bold text-gray-600">LOGIN</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
          {/* <form className="space-y-6"> */}
            <div className="relative">
              <Label htmlFor="username" className="sr-only">
                Username
              </Label>
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="pl-10 py-6 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            <div className="relative">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 py-6 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            {error && (
              <p className="text-gray-500 text-sm text-center">{error}</p>
            )}

            <div className="flex items-center justify-end">
              {/* <Link
                href="/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                Forgot Password?
              </Link> */}
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-700 text-white py-6 rounded-full"
              formAction={login}
            >
              LOGIN
            </Button>

            <div className="text-center">
              <span className="text-gray-600">Don`t have an account?</span>{" "}
              <Link
                href="/register"
                className="text-gray-600 hover:text-gray-700 font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}