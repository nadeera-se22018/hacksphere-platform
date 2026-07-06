"use client";

import { useState } from "react";
import { submissionApi } from "../../../lib/api";

export default function SubmissionsPage() {
  const [teamId, setTeamId] = useState(""); 
  const [eventId, setEventId] = useState(""); 
  const [githubLink, setGithubLink] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const payload = {
        team_id: teamId,
        event_id: eventId,
        github_link: githubLink,
        live_url: liveUrl
      };

      const response = await submissionApi.post("", payload);

      if (response.data) {
        setSuccessMessage("Project submitted successfully for evaluation!");
        setGithubLink("");
        setLiveUrl("");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to submit project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Project Submission</h1>
        <p className="mt-2 text-gray-600">
          Ready to showcase your work? Submit your GitHub repository and live deployment URLs here.
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-semibold leading-6 text-gray-900">
            Submission Details
          </h3>
          
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

          <form className="mt-6 space-y-6" onSubmit={handleSubmitProject}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="teamId" className="block text-sm font-medium text-gray-700">
                  Team ID (From previous step)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="teamId"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                    value={teamId}
                    onChange={(e) => setTeamId(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="eventId" className="block text-sm font-medium text-gray-700">
                  Event ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="eventId"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                    value={eventId}
                    onChange={(e) => setEventId(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700">
                GitHub Repository URL
              </label>
              <div className="mt-2">
                <input
                  type="url"
                  id="githubLink"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                  placeholder="https://github.com/username/repo"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700">
                Live Deployment URL (Optional)
              </label>
              <div className="mt-2">
                <input
                  type="url"
                  id="liveUrl"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                  placeholder="https://my-project.vercel.app"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md bg-blue-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-300"
              >
                {loading ? "Submitting..." : "Submit Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}