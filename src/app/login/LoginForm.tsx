"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation example (replace with real logic)
    if (username === "admin" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-[30%] flex flex-col gap-5 p-6 bg-white rounded-lg shadow-md max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Login</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">
            Username
          </label>
          <Input
            id="username"
            name="username"
            placeholder="Username"
            className="px-3 py-2"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <Button type="submit" className="mt-3 w-full">
          Login
        </Button>
      </form>
    </div>
  );
}