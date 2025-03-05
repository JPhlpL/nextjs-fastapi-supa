"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { postData } from "@/utils/helpers";
import { UserRegistration } from "@/types";
import { Mail, UserIcon, Lock } from 'lucide-react';
import Image from 'next/image';
import { signup } from '@/utils/action'

export default function RegistrationForm() {
  const [formData, setFormData] = useState<UserRegistration>({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    // Check if passwords match
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // First, try to sign up with Supabase
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      
      // Call the signup function with the FormData object
      const signupResult = await signup(formDataToSend);
      
      // Check if there was an error with Supabase signup
      if (signupResult?.error) {
        setError(signupResult.error);
        setIsLoading(false);
        return;
      }
      
      // If Supabase signup was successful, proceed with your API call
      const response = await postData({
        url: process.env.NEXT_PUBLIC_API_URL + "/user/add",
        data: formData,
      });

      if (response) {
        // Both Supabase and your API were successful
        router.push('/login');
      } else {
        // Your API failed but Supabase succeeded
        setError("User was created in authentication system but failed to add to database. Please contact support.");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error?.message || "An error occurred during registration. Please try again.");
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
            <h2 className="text-3xl font-bold text-gray-600">REGISTER</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10 py-6 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            <div className="relative">
              <Label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </Label>
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pl-10 py-6 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-6 rounded-full"
              disabled={isLoading}
            >
              {isLoading ? "REGISTERING..." : "REGISTER"}
            </Button>

            <div className="text-center">
              <span className="text-gray-600">Already have an account?</span>{" "}
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-700 font-medium"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}