"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return null; // or a spinner if you prefer
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xl text-center">
        <h1 className="font-bold text-3xl mb-4 text-gray-800">Welcome Home!</h1>
        <p className="text-gray-600 mb-6">
          This is your home page. You are logged in and can access all features.
        </p>
        <Button>Click me</Button>
      </div>
    </div>
  );
}