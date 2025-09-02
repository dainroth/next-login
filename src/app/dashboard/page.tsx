// we gonna have to protect this route
// so that no authenticated user can access it
// we can do that by checking if the user is authenticated
// if not, we redirect them to the login page
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";


export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);   
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      router.push("/login");
    }else{
        setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };


  if (loading) {
    return null; // or a spinner if you prefer
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to your Dashboard!</h1>
        <p className="text-gray-600 mb-6">
          You are now logged in. Here you can manage your account, view your data, and access exclusive features.
        </p>
        <div className="flex gap-4">
          <Button>Profile</Button>
          <Button variant="outline">Settings</Button>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}