using StackExchange.Redis;
using notification_leaderboard_service.Services;
using notification_leaderboard_service.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientCorsPolicy", policy => policy
        .WithOrigins("http://localhost:3000") 
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()); 
});

var redisConnectionString = builder.Configuration.GetConnectionString("RedisConnection")!;
builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnectionString));

builder.Services.AddScoped<ILeaderboardService, LeaderboardService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("ClientCorsPolicy");

app.UseHttpsRedirection();

app.MapControllers();

app.MapHub<LeaderboardHub>("/leaderboardHub");

app.MapHub<NotificationHub>("/notificationHub");

app.Run();