"use client";

import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { notificationApi } from "../../../lib/api";

interface LeaderboardEntry {
  teamId: string;
  teamName: string;
  score: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  useEffect(() => {
    const fetchInitialLeaderboard = async () => {
      try {
        const response = await notificationApi.get("/top?count=10");
        if (response.data.success) {
          setLeaderboard(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch initial leaderboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialLeaderboard();
  }, []);

  useEffect(() => {
    const hubUrl = process.env.NEXT_PUBLIC_SIGNALR_LEADERBOARD_HUB;
    if (!hubUrl) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        setConnectionStatus("Connected (Live)");
        
        connection.on("ReceiveLeaderboardUpdate", (updatedLeaderboard: LeaderboardEntry[]) => {
          setLeaderboard(updatedLeaderboard);
        });
      })
      .catch((err) => {
        console.error("SignalR Connection Error: ", err);
        setConnectionStatus("Disconnected");
      });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Leaderboard</h1>
          <p className="mt-2 text-gray-600">
            Real-time rankings based on judge evaluations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            {connectionStatus.includes("Live") && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${connectionStatus.includes("Live") ? "bg-green-500" : "bg-red-500"}`}></span>
          </span>
          <span className="text-sm font-medium text-gray-500">{connectionStatus}</span>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading rankings...</div>
        ) : leaderboard.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No scores available yet.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Name
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboard.map((team, index) => (
                <tr key={team.teamId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`flex items-center justify-center h-8 w-8 rounded-full font-bold text-sm ${
                        index === 0 ? "bg-yellow-100 text-yellow-600" :
                        index === 1 ? "bg-gray-100 text-gray-600" :
                        index === 2 ? "bg-orange-100 text-orange-600" :
                        "bg-blue-50 text-blue-600"
                      }`}>
                        #{index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{team.teamName}</div>
                    <div className="text-xs text-gray-500">ID: {team.teamId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-xl font-bold text-gray-900">{team.score.toFixed(1)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}