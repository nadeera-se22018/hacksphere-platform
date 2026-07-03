using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using notification_leaderboard_service.Services;
using notification_leaderboard_service.Hubs;

namespace notification_leaderboard_service.Controllers;

[ApiController]
[Route("api/[controller]")] 
public class LeaderboardController : ControllerBase
{
    private readonly ILeaderboardService _leaderboardService;
    private readonly IHubContext<LeaderboardHub> _hubContext;

    public LeaderboardController(ILeaderboardService leaderboardService, IHubContext<LeaderboardHub> hubContext)
    {
        _leaderboardService = leaderboardService;
        _hubContext = hubContext;
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateScore([FromBody] UpdateScoreDto request)
    {
        try
        {
            await _leaderboardService.UpdateTeamScoreAsync(request.TeamId, request.TeamName, request.Score);
            var topTeams = await _leaderboardService.GetTopTeamsAsync(10);
            await _hubContext.Clients.All.SendAsync("ReceiveLeaderboardUpdate", topTeams);
            return Ok(new { success = true, message = "Team score updated successfully in Redis!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { success = false, message = ex.Message });
        }
    }

    [HttpGet("top")]
    public async Task<IActionResult> GetTopTeams([FromQuery] int count = 10)
    {
        try
        {
            var topTeams = await _leaderboardService.GetTopTeamsAsync(count);
            return Ok(new { success = true, data = topTeams });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { success = false, message = ex.Message });
        }
    }
}

public class UpdateScoreDto
{
    public string TeamId { get; set; } = string.Empty;
    public string TeamName { get; set; } = string.Empty;
    public double Score { get; set; }
}