using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities
{
    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public bool IsAdmin { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
    }

    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("User");

        var username = Environment.GetEnvironmentVariable("ADMIN_USERNAME") 
            ?? throw new InvalidOperationException("ADMIN_USERNAME not set in environment variables");
        
        var password = Environment.GetEnvironmentVariable("ADMIN_PASSWORD") 
            ?? throw new InvalidOperationException("ADMIN_PASSWORD not set in environment variables");

        builder.HasData(new User
        {
            Id = 1,
            Username = username,
            Password = BCrypt.Net.BCrypt.HashPassword(password),
            IsAdmin = true,
            CreatedAt = DateTime.UtcNow
        });
    }
}
}