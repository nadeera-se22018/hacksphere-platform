"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { teamApi } from "../../../lib/api";

export default function TeamsPage() {
  const { user } = useAuth();
  
  const [teamName, setTeamName] = useState("");
  const [eventId, setEventId] = useState("6a38d128cad36f2d08bb6e9a"); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await teamApi.post("/", {
        name: teamName,
        eventId: eventId,
        leaderId: user?.id, 
      });

      if (response.data.success) {
        setSuccessMessage(`Team '${response.data.data.name}' created successfully!`);
        setTeamName(""); 
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create team. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
        <p className="mt-2 text-gray-600">
          Create a new team or manage your existing team members for the hackathon.
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            Create a New Team
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Gather your friends and start building something amazing.</p>
          </div>
          
          {successMessage && (
            <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <form className="mt-5 sm:flex sm:items-center gap-4" onSubmit={handleCreateTeam}>
            <div className="w-full sm:max-w-xs">
              <label htmlFor="teamName" className="sr-only">
                Team Name
              </label>
              <input
                type="text"
                name="teamName"
                id="teamName"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:mt-0 sm:ml-3 sm:w-auto disabled:bg-blue-300"
            >
              {loading ? "Creating..." : "Create Team"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}