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

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/auth")]
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
            var response = new Response();

            var user = _dataContext.Users
                .FirstOrDefault(u => u.Username == loginDto.Username);

            if (user == null || !_securityService.VerifyPassword(loginDto.Password, user.Password))
            {
                response.AddError("auth", "Invalid credentials");
                return BadRequest(response);
            }

            var token = GenerateJwtToken(user);
            var refreshToken = _securityService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            user.LastLoginAt = DateTime.UtcNow;

            _dataContext.SaveChanges();

            response.Data = new LoginResponseDto
            {
                UserId = user.Id,
                Username = user.Username,
                Token = token,
                RefreshToken = refreshToken,
                IsAdmin = user.IsAdmin
            };
            return Ok(response);
        }

        private string GenerateJwtToken(User user)
        {
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ?? 
                throw new InvalidOperationException("JWT Key is not configured"));
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "User")
                }),
                Expires = DateTime.UtcNow.AddMinutes(
                    double.Parse(_configuration["Jwt:ExpirationInMinutes"] ?? "60")),
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
        public required string RefreshToken { get; set; }
        public bool IsAdmin { get; set; }
    }
}