"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import { teamApi } from "../../../lib/api";

interface Team {
  _id: string;
  name: string;
  memberCount: number;
  role: string;
}

export default function TeamsPage() {
  const { user } = useAuth();
  
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const [teamName, setTeamName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMyTeams = async () => {
      try {
        const res = await teamApi.get(`/user/${user?.id}`); 
        const fetchedTeams = res.data.data || res.data;
        setTeams(fetchedTeams);
        if (fetchedTeams.length === 0) {
          setShowCreateForm(true);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load your teams.");
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchMyTeams();
    }
  }, [user]);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = { 
        name: teamName, 
        leaderId: user?.id, 
        eventId: "EVT-2026-MAIN" 
      };
      
      const res = await teamApi.post("/", payload);
      
      toast.success(`Team '${teamName}' created successfully!`);
      setTeamName("");
      setTeams((prevTeams) => [...prevTeams, res.data.data || res.data]);
      setShowCreateForm(false);
      setIsSubmitting(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create team. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">My Teams</h1>
        <p className="mt-2 text-lg text-slate-600">
          Manage your hackathon groups and collaborations.
        </p>
      </div>

      {teams.length > 0 && !showCreateForm && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <div key={team._id} className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -z-10"></div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{team.name}</h3>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {team.role || "Member"}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span>{team.memberCount || 1} Members</span>
                  </div>
                  <div className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">
                    ID: {team._id.substring(0, 8)}...
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-6">
            <button 
              onClick={() => setShowCreateForm(true)}
              className="text-sm font-semibold text-blue-600 hover:text-blue-500 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Create another team
            </button>
          </div>
        </div>
      )}

      {showCreateForm && (
        <div className="bg-white shadow-lg shadow-slate-200/50 sm:rounded-2xl border border-slate-100 p-8 max-w-xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Create a New Team</h3>
            <p className="mt-2 text-sm text-slate-500">Gather your friends and start building something amazing.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleCreateTeam}>
            <div>
              <label htmlFor="teamName" className="block text-sm font-semibold text-slate-700">Team Name</label>
              <input
                type="text"
                id="teamName"
                required
                className="mt-2 block w-full rounded-xl border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="e.g. Code Ninjas"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              {teams.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="w-full flex justify-center items-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-500 disabled:bg-blue-300 transition-all"
              >
                {isSubmitting ? "Creating..." : "Create Team"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}