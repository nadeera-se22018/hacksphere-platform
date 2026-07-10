"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import NotificationListener from "../../components/NotificationListener"; 
import { Toaster } from "react-hot-toast"; 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
        if (!user) {
            router.push("/login");
        } else if (user.role === "pending") {
            router.push("/choose-role");
        }
    }
  }, [user, loading, router]);

  if (loading || !user || user.role === "pending") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <NotificationListener />
      <Toaster position="top-right" />

      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}