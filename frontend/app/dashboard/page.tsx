"use client";

import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || user?.username || "Hacker"}! 👋
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what's happening with your hackathon projects today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white shadow p-6">
          <dt className="truncate text-sm font-medium text-gray-500">My Team Status</dt>
          <dd className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">Pending</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Project Submission</dt>
          <dd className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">Not Submitted</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Current Rank</dt>
          <dd className="mt-2 text-3xl font-semibold tracking-tight text-blue-600">--</dd>
        </div>
      </div>
    </div>
  );
}