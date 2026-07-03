using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using notification_leaderboard_service.Hubs;

namespace notification_leaderboard_service.Controllers;

[ApiController]
[Route("api/[controller]")] 
public class NotificationController : ControllerBase
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public NotificationController(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendNotification([FromBody] NotificationRequestDto request)
    {
        try
        {
            await _hubContext.Clients.Group(request.TeamId).SendAsync("ReceiveNotification", new 
            {
                Title = request.Title,
                Message = request.Message,
                Timestamp = DateTime.UtcNow
            });

            return Ok(new { success = true, message = $"Notification sent to team {request.TeamId} successfully!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { success = false, message = ex.Message });
        }
    }
}

public class NotificationRequestDto
{
    public string TeamId { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}