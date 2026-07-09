"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12 font-sans">
      
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-10 shadow-lg sm:p-12">
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl drop-shadow-sm">
            Welcome back, {user?.username || "Hacker"}! 👋
          </h1>
          <p className="mt-3 text-lg text-blue-100 max-w-2xl font-medium">
            Here is your hackathon mission control. Complete the steps below to dominate the leaderboard.
          </p>
        </div>
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-fuchsia-500 opacity-20 blur-3xl mix-blend-screen"></div>
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400 opacity-20 blur-3xl mix-blend-screen"></div>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Mission Progress</h2>
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 border-t-2 border-slate-100 border-dashed" aria-hidden="true"></div>
          <div className="relative flex justify-between">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-200 ring-4 ring-white z-10 transition-transform hover:scale-110">
                1
              </div>
              <span className="mt-3 text-sm font-bold text-slate-900">Form Team</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 ring-4 ring-white z-10">
                2
              </div>
              <span className="mt-3 text-sm font-medium text-slate-500">Build Project</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 ring-4 ring-white z-10">
                3
              </div>
              <span className="mt-3 text-sm font-medium text-slate-500">Submit</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 ring-4 ring-white z-10">
                4
              </div>
              <span className="mt-3 text-sm font-medium text-slate-500">Get Ranked</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 transition-transform duration-500 group-hover:scale-150"></div>
          <div className="relative z-10">
            <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600 ring-1 ring-inset ring-blue-100">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Team Status</h3>
            <p className="mt-2 text-sm text-slate-500 font-medium">You haven't joined a team yet.</p>
          </div>
          <div className="relative z-10 mt-8">
            <Link href="/dashboard/teams" className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-500">
              + Create or Join Team
            </Link>
          </div>
        </div>

        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="relative z-10 grayscale opacity-70 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100">
            <div className="mb-4 inline-flex rounded-xl bg-slate-50 p-3 text-slate-600 ring-1 ring-inset ring-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:ring-indigo-100">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Project Submission</h3>
            <p className="mt-2 text-sm text-slate-500 font-medium">Your project is waiting to launch.</p>
          </div>
          <div className="relative z-10 mt-8">
            <Link href="/dashboard/submissions" className="inline-flex w-full items-center justify-center rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 transition-colors hover:bg-slate-100 hover:text-slate-900">
              Go to Submissions
            </Link>
          </div>
        </div>

        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-900 p-8 shadow-sm ring-1 ring-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/50">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          
          <div className="relative z-10">
            <div className="mb-4 flex items-center justify-between">
               <div className="inline-flex rounded-xl bg-slate-800/50 p-3 text-yellow-500 ring-1 ring-inset ring-slate-700 backdrop-blur-sm">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300 ring-1 ring-inset ring-slate-700">
                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
                Locked
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">Current Rank</h3>
            <p className="mt-2 text-sm text-slate-400 font-medium">Submit your project to unlock the live leaderboard.</p>
          </div>
          <div className="relative z-10 mt-8">
            <Link href="/dashboard/leaderboard" className="inline-flex w-full items-center justify-center rounded-xl bg-slate-800 px-4 py-3 text-sm font-bold text-slate-300 shadow-sm transition-colors hover:bg-slate-700 hover:text-white">
              View Leaderboard
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}