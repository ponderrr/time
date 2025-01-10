using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using LearningStarter.Services;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.EntityFrameworkCore;
using LearningStarter.Common;
using Microsoft.AspNetCore.RateLimiting;
using Serilog;

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/auth")]
    [EnableRateLimiting("LoginPolicy")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly ISecurityService _securityService;
        private readonly IConfiguration _configuration;

        public AuthController(
            DataContext dataContext,
            ISecurityService securityService,
            IConfiguration configuration)
        {
            _dataContext = dataContext;
            _securityService = securityService;
            _configuration = configuration;
        }

        [HttpPost("login")]
public IActionResult Login([FromBody] LoginDto loginDto)
{
    Log.Information($"Login attempt for username: {loginDto.Username}");
    
    var response = new Response<LoginResponseDto>();  // Keep the generic Response

    var user = _dataContext.Users
        .FirstOrDefault(u => u.Username == loginDto.Username);

    if (user == null)
    {
        Log.Warning($"User not found: {loginDto.Username}");
        response.AddError("auth", "Invalid credentials");
        return BadRequest(response);
    }

    if (!_securityService.VerifyPassword(loginDto.Password, user.Password))
    {
        Log.Warning($"Invalid password for user: {loginDto.Username}");
        response.AddError("auth", "Invalid credentials");
        return BadRequest(response);
    }

    var token = GenerateJwtToken(user);
    
    // Update last login time - this is useful for tracking
    user.LastLoginAt = DateTime.UtcNow;
    _dataContext.SaveChanges();

    response.Data = new LoginResponseDto
    {
        UserId = user.Id,
        Username = user.Username,
        Token = token,
        IsAdmin = user.IsAdmin
    };

    Log.Information($"Successful login for user: {loginDto.Username}");
    return Ok(response);
}

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            _dataContext.RevokedTokens.Add(new RevokedToken
            {
                Token = token,
                RevokedAt = DateTime.UtcNow
            });
            _dataContext.SaveChanges();

            HttpContext.Response.Cookies.Delete("refreshToken");

            Log.Information("User logged out successfully.");
            return Ok(new { Message = "Logged out successfully." });
        }

        private string GenerateJwtToken(User user)
        {
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ??
                throw new InvalidOperationException("JWT Key is not configured"));

            double.TryParse(_configuration["Jwt:ExpirationInMinutes"], out var expirationMinutes);
            expirationMinutes = expirationMinutes > 0 ? expirationMinutes : 60;

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "User")
                }),
                Expires = DateTime.UtcNow.AddMinutes(expirationMinutes),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

    public class LoginDto
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }

    public class LoginResponseDto
    {
        public int UserId { get; set; }
        public required string Username { get; set; }
        public required string Token { get; set; }
        public bool IsAdmin { get; set; }
    }
}