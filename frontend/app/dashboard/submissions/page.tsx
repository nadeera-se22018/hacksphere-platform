"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import { teamApi, submissionApi } from "../../../lib/api";

interface Team {
  _id: string;
  name: string;
}

export default function SubmissionsPage() {
  const { user } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(true);

  const [selectedTeamId, setSelectedTeamId] = useState(""); 
  const [githubLink, setGithubLink] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CONSTANT_EVENT_ID = "EVT-2026-MAIN";

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await teamApi.get(`/user/${user?.id}`);
        const fetchedTeams = res.data.data || res.data;
        
        setTeams(fetchedTeams);
        if (fetchedTeams.length > 0) {
          setSelectedTeamId(fetchedTeams[0]._id);
        }
        setLoadingTeams(false);
      } catch (error) {
        toast.error("Failed to load teams.");
        setLoadingTeams(false);
      }
    };

    if (user?.id) {
      fetchTeams();
    }
  }, [user]);

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeamId) {
      toast.error("Please select a team first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        team_id: selectedTeamId,
        event_id: CONSTANT_EVENT_ID,
        github_link: githubLink,
        live_url: liveUrl
      };

      await submissionApi.post("/api/submissions", payload);
      
      toast.success("Project submitted successfully for evaluation! 🚀");
      setGithubLink("");
      setLiveUrl("");
      setIsSubmitting(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit project.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Project Submission</h1>
        <p className="mt-2 text-lg text-slate-600">
          Ready to showcase your work? Submit your repository and deployment URLs here.
        </p>
      </div>

      <div className="bg-white shadow-xl shadow-slate-200/40 sm:rounded-3xl border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-blue-50 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-indigo-50 blur-2xl"></div>

        <div className="px-6 py-8 sm:p-10 relative z-10">
          <form className="space-y-8" onSubmit={handleSubmitProject}>
            
            <div>
              <label htmlFor="teamSelect" className="block text-sm font-bold text-slate-700 mb-2">
                Select Team
              </label>
              {loadingTeams ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-10 bg-slate-200 rounded-xl"></div>
                  </div>
                </div>
              ) : teams.length === 0 ? (
                <div className="rounded-xl bg-amber-50 p-4 border border-amber-200">
                  <p className="text-sm text-amber-700">You need to create or join a team before submitting a project.</p>
                </div>
              ) : (
                <div className="relative">
                  <select
                    id="teamSelect"
                    value={selectedTeamId}
                    onChange={(e) => setSelectedTeamId(e.target.value)}
                    className="block w-full appearance-none rounded-xl border-0 py-3 pl-4 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm font-medium bg-slate-50"
                  >
                    {teams.map((team) => (
                      <option key={team._id} value={team._id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="githubLink" className="block text-sm font-bold text-slate-700 mb-2">
                GitHub Repository URL <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </div>
                <input
                  type="url"
                  id="githubLink"
                  required
                  className="block w-full rounded-xl border-0 py-3 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="https://github.com/username/repo"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="liveUrl" className="block text-sm font-bold text-slate-700 mb-2">
                Live Deployment URL <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                </div>
                <input
                  type="url"
                  id="liveUrl"
                  className="block w-full rounded-xl border-0 py-3 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="https://my-project.vercel.app"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || teams.length === 0}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Launch Project"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}