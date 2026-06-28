namespace notification_leaderboard_service.Services;

public interface ILeaderboardService
{
    Task UpdateTeamScoreAsync(string teamId, string teamName, double score);
    Task<IEnumerable<object>> GetTopTeamsAsync(int count = 10);
}