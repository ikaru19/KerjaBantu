"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useStore } from "@/store/useStore";
import { users } from "@/data/users";

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser, hasCompletedOnboarding } = useStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simple mock authentication
    setTimeout(() => {
      // Find user with matching email
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (user) {
        // In a real app, we would check password hash here
        setCurrentUser(user);
        
        // Check if user has completed onboarding
        if (hasCompletedOnboarding) {
          router.push('/dashboard');
        } else {
          router.push('/onboarding');
        }
      } else {
        setError("Invalid email or password");
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome to <span className="text-primary">KerjaBantu</span>
          </h1>
          <p className="text-gray-600">
            Login to access your account
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="text-primary hover:text-primary-dark font-medium">
                Forgot password?
              </a>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:text-primary-dark font-medium">
              Register
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
} 