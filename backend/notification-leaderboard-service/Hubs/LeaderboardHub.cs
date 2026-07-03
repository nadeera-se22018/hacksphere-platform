using Microsoft.AspNetCore.SignalR;

namespace notification_leaderboard_service.Hubs;

public class LeaderboardHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        Console.WriteLine($"Frontend Client Connected to SignalR Hub: {Context.ConnectionId}");
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine($"Frontend Client Disconnected: {Context.ConnectionId}");
        await base.OnDisconnectedAsync(exception);
    }
}