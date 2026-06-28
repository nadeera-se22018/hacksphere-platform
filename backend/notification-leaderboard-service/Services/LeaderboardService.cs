using StackExchange.Redis;

namespace notification_leaderboard_service.Services;

public class LeaderboardService : ILeaderboardService
{
    private readonly IDatabase _redisDb;
    private const string LeaderboardKey = "hackathon_leaderboard";
    private const string TeamNamesKey = "hackathon_team_names"; 

    public LeaderboardService(IConnectionMultiplexer redis)
    {
        _redisDb = redis.GetDatabase();
    }

    public async Task UpdateTeamScoreAsync(string teamId, string teamName, double score)
    {
        await _redisDb.SortedSetAddAsync(LeaderboardKey, teamId, score);

        await _redisDb.HashSetAsync(TeamNamesKey, teamId, teamName);
    }

    public async Task<IEnumerable<object>> GetTopTeamsAsync(int count = 10)
    {
        var entries = await _redisDb.SortedSetRangeByRankWithScoresAsync(LeaderboardKey, 0, count - 1, Order.Descending);

        var result = new List<object>();

        foreach (var entry in entries)
        {
            var teamName = await _redisDb.HashGetAsync(TeamNamesKey, entry.Element);
            result.Add(new
            {
                TeamId = entry.Element.ToString(),
                TeamName = teamName.ToString(),
                Score = entry.Score
            });
        }

        return result;
    }
}