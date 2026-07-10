"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-blue-400">HackSphere</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          <Link href="/dashboard" className="group flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white">
            Dashboard
          </Link>
          <Link href="/dashboard/teams" className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
            My Team
          </Link>
          <Link href="/dashboard/submissions" className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
            Submissions
          </Link>
          <Link href="/dashboard/leaderboard" className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
            Leaderboard
          </Link>

          {(user?.role?.toLowerCase() === 'judge' || user?.role?.toLowerCase() === 'teacher') && (
            <Link href="/dashboard/evaluations" className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-emerald-400 hover:bg-gray-800 hover:text-emerald-300">
              <svg className="mr-3 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Evaluations
            </Link>
          )}
        </nav>
      </div>

      <div className="border-t border-gray-800 p-4">
        <div className="mb-4">
          <p className="text-sm font-medium text-white">{user?.name || user?.username || "User"}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
          <span className="mt-1 inline-flex items-center rounded-full bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30 capitalize">
            {user?.role}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}