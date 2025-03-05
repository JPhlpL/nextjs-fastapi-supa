"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Use the Supabase client directly for login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.session) {
        // Successful login - navigate to account page
        router.push('/home');
        // Force a refresh of the current page data
        router.refresh();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
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
            <div className="relative">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <p className="text-red-500 text-sm text-center">{error}</p>
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
              disabled={isLoading}
            >
              {isLoading ? "LOGGING IN..." : "LOGIN"}
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