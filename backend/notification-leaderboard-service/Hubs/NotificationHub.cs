using Microsoft.AspNetCore.SignalR;

namespace notification_leaderboard_service.Hubs;

public class NotificationHub : Hub
{
    public async Task JoinTeamGroup(string teamId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, teamId);
        Console.WriteLine($"Client {Context.ConnectionId} joined Team Group: {teamId}");
    }

    public async Task LeaveTeamGroup(string teamId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, teamId);
        Console.WriteLine($"Client {Context.ConnectionId} left Team Group: {teamId}");
    }
}