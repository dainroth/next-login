// we gonna have to protect this route
// so that no authenticated user can access it
// we can do that by checking if the user is authenticated
// if not, we redirect them to the login page
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);   
    // to prevent flickering
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }else{
        setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };


  if (loading) {
    return null; 
  }

  
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Button variant="ghost" className="justify-start">Dashboard</Button>
          <Button variant="ghost" className="justify-start">Users</Button>
          <Button variant="ghost" className="justify-start">Settings</Button>
        </nav>
        <div className="mt-auto">
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <Button variant="outline">Profile</Button>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">123</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Active Sessions</h3>
            <p className="text-3xl font-bold text-green-600">8</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">System Alerts</h3>
            <p className="text-3xl font-bold text-red-600">2</p>
          </div>
        </section>
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-2">
            <li>User <span className="font-semibold">admin</span> logged in.</li>
            <li>Settings updated by <span className="font-semibold">jane</span>.</li>
            <li>New user <span className="font-semibold">john</span> registered.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}