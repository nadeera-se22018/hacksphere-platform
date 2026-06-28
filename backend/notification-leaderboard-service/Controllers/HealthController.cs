using Microsoft.AspNetCore.Mvc;

namespace notification_leaderboard_service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "Notification & Leaderboard Service is up and running!" });
    }
}