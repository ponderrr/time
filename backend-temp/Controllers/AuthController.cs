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
    
    // Generate refresh token
    var refreshToken = _securityService.GenerateRefreshToken();
    
    // Store refresh token in httpOnly cookie
    var cookieOptions = new CookieOptions
    {
        HttpOnly = true,
        Secure = true, // Use HTTPS in production
        SameSite = SameSiteMode.Strict,
        Expires = DateTimeOffset.UtcNow.AddDays(7) // 7 days for refresh token
    };
    
    HttpContext.Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
    
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

        [HttpPost("refresh")]
        public IActionResult RefreshToken()
        {
            var response = new Response<LoginResponseDto>();
            
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                response.AddError("refresh", "Refresh token not found");
                return Unauthorized(response);
            }

            // In a real implementation, you would validate the refresh token
            // and get the user from the database
            // For now, we'll just generate a new token for the current user
            
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            // You would decode the token and get user info here
            
            // Generate new token
            var newToken = GenerateJwtToken(new User { Id = 1, Username = "admin", IsAdmin = true });
            
            response.Data = new LoginResponseDto
            {
                UserId = 1,
                Username = "admin",
                Token = newToken,
                IsAdmin = true
            };

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

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterDto registerDto)
    {
        var response = new Response<LoginResponseDto>();

        // Validate password
        if (!_securityService.IsPasswordValid(registerDto.Password))
        {
            response.AddError("password", "Password must be at least 8 characters long and contain uppercase, lowercase, digit, and special character");
            return BadRequest(response);
        }

        // Check if username already exists
        if (_dataContext.Users.Any(u => u.Username == registerDto.Username))
        {
            response.AddError("username", "Username already exists");
            return BadRequest(response);
        }

        // Create new user
        var hashedPassword = _securityService.HashPassword(registerDto.Password);
        var newUser = new User
        {
            Username = registerDto.Username,
            PasswordHash = hashedPassword,
            IsAdmin = false
        };

        _dataContext.Users.Add(newUser);
        _dataContext.SaveChanges();

        // Generate token and return login response
        var token = GenerateJwtToken(newUser);
        var loginResponse = new LoginResponseDto
        {
            UserId = newUser.Id,
            Username = newUser.Username,
            Token = token,
            IsAdmin = newUser.IsAdmin
        };

        response.Data = loginResponse;
        return Created("", response);
    }

    public class LoginResponseDto
    {
        public int UserId { get; set; }
        public required string Username { get; set; }
        public required string Token { get; set; }
        public bool IsAdmin { get; set; }
    }

    public class RegisterDto
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}