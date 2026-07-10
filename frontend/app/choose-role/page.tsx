"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../lib/api";

export default function ChooseRolePage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, loading, updateSession } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && user.role !== "pending") {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const roles = [
    {
      id: "Participant",
      title: "Hacker / Participant",
      description: "Join teams, build amazing projects, and compete for the top spot.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      color: "blue"
    },
    {
      id: "Judge",
      title: "Hackathon Judge",
      description: "Evaluate submissions, provide feedback, and update live scores.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "emerald"
    },
    {
      id: "Teacher",
      title: "Teacher / Mentor",
      description: "Oversee the event, guide participants, and manage technical operations.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      color: "violet"
    }
  ];

  const handleCompleteSetup = async () => {
    if (!selectedRole) return;
    setIsSubmitting(true);

    try {
      const response = await authApi.patch("/update-role", { role: selectedRole });
      
      if (response.data.success) {
        updateSession(response.data.data, response.data.token);
        toast.success("Profile setup complete! Redirecting...");
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update role. Try again.");
      setIsSubmitting(false);
    }
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Welcome aboard, {user.username}! 🎉
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            You successfully signed in with Google. Before we drop you into the dashboard, <br className="hidden sm:block"/> please tell us what you're here to do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {roles.map((roleObj) => (
            <div
              key={roleObj.id}
              onClick={() => setSelectedRole(roleObj.id)}
              className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 border-2 flex flex-col items-center text-center group
                ${selectedRole === roleObj.id 
                  ? `border-${roleObj.color}-500 bg-${roleObj.color}-50 shadow-md transform -translate-y-1` 
                  : `border-transparent bg-white shadow-sm hover:shadow-md hover:-translate-y-1`
                }
              `}
            >
              {selectedRole === roleObj.id && (
                <div className={`absolute top-4 right-4 text-${roleObj.color}-600`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              <div className={`p-4 rounded-full mb-4 transition-colors
                ${selectedRole === roleObj.id 
                  ? `bg-${roleObj.color}-100 text-${roleObj.color}-600` 
                  : `bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600`
                }
              `}>
                {roleObj.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">{roleObj.title}</h3>
              <p className="text-sm text-slate-500 font-medium">{roleObj.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleCompleteSetup}
            disabled={!selectedRole || isSubmitting}
            className="flex items-center justify-center rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed w-full sm:w-auto min-w-[250px]"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Profile...
              </>
            ) : (
              "Complete Setup"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}