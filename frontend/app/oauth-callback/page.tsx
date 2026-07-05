"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

function CallbackLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");

    if (token && userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        
        login(userData, token);
        
        router.push("/dashboard");
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/login?error=OAuthFailed");
      }
    } else {
      router.push("/login");
    }
  }, [router, searchParams, login]);

  return null;
}

export default function OAuthCallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Authenticating...</h2>
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-500">Please wait while we log you in securely.</p>
      </div>
      
      <Suspense fallback={null}>
        <CallbackLogic />
      </Suspense>
    </div>
  );
}