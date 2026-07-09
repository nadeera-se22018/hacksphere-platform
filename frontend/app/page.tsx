import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-black tracking-tight text-blue-600">
                HackSphere<span className="text-slate-900">.</span>
              </span>
            </div>
            <div>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-4 animate-pulse">
            Next-Gen Hackathon Orchestration Platform
          </span>
          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Manage Hackathons with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Real-Time Precision.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg lg:text-xl text-slate-600 leading-relaxed">
            An advanced polyglot microservices platform empowering organizers and participants with instantaneous updates, multi-stack evaluation, and robust team orchestration.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link
              href="/login"
              className="rounded-xl bg-blue-600 px-6 py-3.5 text-base font-bold text-white shadow-md hover:bg-blue-500 transition-all hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Enter Platform →
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Powered by Polyglot Microservices
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Built on a decoupled cloud-native architecture optimized for speed, persistence, and real-time responsiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 flex items-center justify-center bg-blue-600 text-white rounded-xl font-bold mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Secure Identity</h3>
              <p className="text-sm text-slate-600">
                Stateless authentication utilizing JWT, custom authorization middleware, and seamless Google OAuth federation.
              </p>
            </div>

            <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 flex items-center justify-center bg-indigo-600 text-white rounded-xl font-bold mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Team Orchestration</h3>
              <p className="text-sm text-slate-600">
                Robust group management and lifecycle event tracking managed independently via Node.js and MongoDB Atlas stacks.
              </p>
            </div>

            <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 flex items-center justify-center bg-emerald-600 text-white rounded-xl font-bold mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Python Evaluation</h3>
              <p className="text-sm text-slate-600">
                High-performance evaluation routines handling submission data using FastAPI models and localized relational mapping.
              </p>
            </div>

            <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 flex items-center justify-center bg-violet-600 text-white rounded-xl font-bold mb-4">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">SignalR Streams</h3>
              <p className="text-sm text-slate-600">
                Persistent full-duplex WebSocket connections broadcasting judge scores and push notifications in under 10ms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} HackSphere Platform. Built with Next.js, FastAPI, Node.js, and .NET Core.
          </p>
        </div>
      </footer>
    </div>
  );
}