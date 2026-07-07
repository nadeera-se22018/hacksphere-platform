"use client";

import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function NotificationListener() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const hubUrl = process.env.NEXT_PUBLIC_SIGNALR_NOTIFICATION_HUB;
    if (!hubUrl) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("Connected to Notification Hub");
        
        connection.invoke("JoinTeamGroup", "team_001").catch((err) => console.error(err));
      })
      .catch((err) => console.error("Notification SignalR Connection Error: ", err));

    connection.on("ReceiveNotification", (notification: { title: string; message: string }) => {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-bold text-gray-900">{notification.title}</p>
                <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ), { duration: 5000 }); 
    });

    return () => {
      connection.stop();
    };
  }, [user]);

  return null; 
}