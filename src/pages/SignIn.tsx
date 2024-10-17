"use client"; // This indicates it's a client-side component in a React app.

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate sign-in logic
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col p-4">
      <header className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-white hover:text-zinc-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </header>

      <main className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Sign In to RepUp
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="bg-zinc-800 text-white border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              className="bg-zinc-800 text-white border-zinc-700"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-white text-zinc-900 hover:bg-zinc-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-zinc-400">Don't have an account?</p>
          <Button
            variant="link"
            asChild
            className="text-white hover:text-zinc-300"
          >
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </main>

      <footer className="mt-8 text-center text-sm text-zinc-500">
        © 2024 GainTrack. All rights reserved.
      </footer>
    </div>
  );
};

export default SignIn;
