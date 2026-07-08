@echo off
echo ===================================================
echo Starting HackSphere Platform Microservices...
echo ===================================================

echo Starting Identity & Auth Service (Port 5001)...
start cmd /k "cd backend\identity-auth-service && npm run dev"

echo Starting Team & Event Service (Port 5002)...
start cmd /k "cd backend\team-event-service && npm run dev"

echo Starting Submission & Evaluation Service (Port 5003)...
start cmd /k "cd backend\submission-evaluation-service && api_env\Scripts\activate && uvicorn main:app --reload --port 5003"

echo Starting Notification & Leaderboard Service (Port 5091)...
start cmd /k "cd backend\notification-leaderboard-service && dotnet watch run"

echo Starting Next.js Frontend (Port 3000)...
start cmd /k "cd frontend && npm run dev"

echo All services are starting up in separate windows!