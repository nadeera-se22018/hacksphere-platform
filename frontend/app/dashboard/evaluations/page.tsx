"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Submission {
  teamId: string;
  teamName: string;
  githubLink: string;
  liveLink: string;
  submissionTime: string;
}

export default function EvaluationsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [scores, setScores] = useState<{ [key: string]: string }>({});
  const [submittingStatus, setSubmittingStatus] = useState<{ [key: string]: 'idle' | 'loading' | 'success' }>({});

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setTimeout(() => {
          setSubmissions([
            { teamId: "team_001", teamName: "Alpha Coders", githubLink: "https://github.com/alphacoders", liveLink: "https://alpha.vercel.app", submissionTime: "2 hours ago" },
            { teamId: "team_002", teamName: "Byte Wizards", githubLink: "https://github.com/bytewizards", liveLink: "", submissionTime: "5 hours ago" },
            { teamId: "team_003", teamName: "Code Ninjas", githubLink: "https://github.com/codeninjas", liveLink: "https://codeninjas.io", submissionTime: "1 day ago" },
          ]);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Failed to fetch submissions");
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleScoreChange = (teamId: string, value: string) => {
    setScores((prev) => ({ ...prev, [teamId]: value }));
  };

  const handleScoreSubmit = async (teamId: string, teamName: string) => {
    const scoreValue = parseFloat(scores[teamId]);
    
    if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 100) {
      toast.error("Please enter a valid score between 0 and 100.");
      return;
    }

    setSubmittingStatus((prev) => ({ ...prev, [teamId]: 'loading' }));

    try {
      const response = await fetch("https://hacksphere-notification-service-b4fmhydnaahcd4gw.southeastasia-01.azurewebsites.net/api/Leaderboard/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamId: teamId,
          teamName: teamName,
          score: scoreValue
        }),
      });

      if (response.ok) {
        setSubmittingStatus((prev) => ({ ...prev, [teamId]: 'success' }));
        toast.success("Score submitted successfully! Live leaderboard updated.");
      } else {
        throw new Error("Failed to submit score");
      }
    } catch (error) {
      console.error(error);
      setSubmittingStatus((prev) => ({ ...prev, [teamId]: 'idle' }));
      toast.error("Failed to update leaderboard. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Judge Evaluations</h1>
        <p className="mt-2 text-lg text-slate-600">
          Review project submissions and update the live leaderboard.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Fetching latest submissions...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No submissions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Team Name</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Project Links</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Score (0-100)</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {submissions.map((sub) => {
                  const status = submittingStatus[sub.teamId] || 'idle';
                  
                  return (
                    <tr key={sub.teamId} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900">{sub.teamName}</div>
                        <div className="text-xs text-slate-500 font-mono mt-1">ID: {sub.teamId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-3">
                          {sub.githubLink && (
                            <a href={sub.githubLink} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors" title="GitHub">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                            </a>
                          )}
                          {sub.liveLink && (
                            <a href={sub.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors" title="Live Site">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {sub.submissionTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={scores[sub.teamId] || ""}
                          onChange={(e) => handleScoreChange(sub.teamId, e.target.value)}
                          disabled={status === 'success'}
                          className="block w-24 rounded-lg border-0 py-2 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:bg-slate-100 disabled:text-slate-500 font-semibold"
                          placeholder="0-100"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleScoreSubmit(sub.teamId, sub.teamName)}
                          disabled={status !== 'idle' || !scores[sub.teamId]}
                          className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-all
                            ${status === 'success' 
                              ? 'bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' 
                              : 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed'
                            }`}
                        >
                          {status === 'loading' ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </>
                          ) : status === 'success' ? (
                            <>
                              <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                              Updated
                            </>
                          ) : (
                            'Submit Score'
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}