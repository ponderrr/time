using Microsoft.EntityFrameworkCore;
using LearningStarter.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LearningStarter.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Apply configurations
        modelBuilder.ApplyConfiguration(new ActivityEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ActivityTagEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ActivityTypeEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new LocationEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ReviewEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new TagEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new UserActivityEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());

        // Seed development data if in development environment
        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
        {
            SeedDevelopmentData(modelBuilder);
        }
    }

    public void EnsureSeedData()
    {
        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
        {
            Database.EnsureCreated();
        }
    }

    private void SeedDevelopmentData(ModelBuilder modelBuilder)
    {
        // First seed locations since they're referenced by products
        var locations = new[]
        {
            new Location 
            { 
                Id = 1,
                Name = "Caesars Superdome",
                City = "New Orleans",
                State = "Louisiana",
                Country = "USA",
                Description = "Home of the New Orleans Saints"
            },
            new Location 
            { 
                Id = 2,
                Name = "Restaurant August",
                City = "New Orleans",
                State = "Louisiana",
                Country = "USA",
                Description = "Fine dining restaurant in the heart of New Orleans"
            },
            new Location 
            { 
                Id = 3,
                Name = "National WWII Museum",
                City = "New Orleans",
                State = "Louisiana",
                Country = "USA",
                Description = "America's official World War II Museum"
            },
            new Location 
            { 
                Id = 4,
                Name = "Ball Arena",
                City = "Denver",
                State = "Colorado",
                Country = "USA",
                Description = "Multi-purpose arena in Denver"
            }
        };
        modelBuilder.Entity<Location>().HasData(locations);

        // Seed Activity Types
        var activityTypes = new[]
        {
            new ActivityType { Id = 1, Name = "Sports Event" },
            new ActivityType { Id = 2, Name = "Fine Dining" },
            new ActivityType { Id = 3, Name = "Museum" },
            new ActivityType { Id = 4, Name = "Concert" }
        };
        modelBuilder.Entity<ActivityType>().HasData(activityTypes);

        // Seed Tags with empty ActivityTags collection
        var tags = new[]
        {
            new { Id = 1, Name = "Sports", ActivityTags = new List<ActivityTag>() },
            new { Id = 2, Name = "NFL", ActivityTags = new List<ActivityTag>() },
            new { Id = 3, Name = "Football", ActivityTags = new List<ActivityTag>() },
            new { Id = 4, Name = "FoodAndDrink", ActivityTags = new List<ActivityTag>() },
            new { Id = 5, Name = "Upscale", ActivityTags = new List<ActivityTag>() },
            new { Id = 6, Name = "History", ActivityTags = new List<ActivityTag>() },
            new { Id = 7, Name = "Educational", ActivityTags = new List<ActivityTag>() },
            new { Id = 8, Name = "Military", ActivityTags = new List<ActivityTag>() },
            new { Id = 9, Name = "Music", ActivityTags = new List<ActivityTag>() },
            new { Id = 10, Name = "LiveEntertainment", ActivityTags = new List<ActivityTag>() }
        };
        modelBuilder.Entity<Tag>().HasData(
            tags.Select(t => new Tag { Id = t.Id, Name = t.Name, ActivityTags = new List<ActivityTag>() })
        );

        // Seed Products with Location references
        modelBuilder.Entity<Product>().HasData(
            new { 
                Id = 1, 
                Name = "Game Ticket", 
                LocationId = 1, 
                Price = 85.00M, 
                ExpectedQuantity = 100, 
                MinQuantity = 10, 
                Description = "Standard game ticket",
            },
            new { 
                Id = 2, 
                Name = "Stadium Food Combo", 
                LocationId = 1, 
                Price = 15.00M, 
                ExpectedQuantity = 200, 
                MinQuantity = 20, 
                Description = "Hot dog, chips, and drink",
            },
            new { 
                Id = 3, 
                Name = "Team Merchandise", 
                LocationId = 1, 
                Price = 45.00M, 
                ExpectedQuantity = 50, 
                MinQuantity = 5, 
                Description = "Team apparel and souvenirs",
            },
            new { 
                Id = 4, 
                Name = "August Food Menu", 
                LocationId = 2, 
                Price = 95.00M, 
                ExpectedQuantity = 50, 
                MinQuantity = 5, 
                Description = "Multi-course dining experience",
            },
            new { 
                Id = 5, 
                Name = "Wine Pairing", 
                LocationId = 2, 
                Price = 65.00M, 
                ExpectedQuantity = 30, 
                MinQuantity = 3, 
                Description = "Curated wine selection",
            },
            new { 
                Id = 6, 
                Name = "Museum Admission", 
                LocationId = 3, 
                Price = 29.00M, 
                ExpectedQuantity = 200, 
                MinQuantity = 20, 
                Description = "General admission ticket",
            },
            new { 
                Id = 7, 
                Name = "Beyond All Boundaries 4D", 
                LocationId = 3, 
                Price = 15.00M, 
                ExpectedQuantity = 100, 
                MinQuantity = 10, 
                Description = "4D movie experience",
            },
            new { 
                Id = 8, 
                Name = "Guided Tour", 
                LocationId = 3, 
                Price = 25.00M, 
                ExpectedQuantity = 50, 
                MinQuantity = 5, 
                Description = "Expert-led museum tour",
            },
            new { 
                Id = 9, 
                Name = "Concert Ticket", 
                LocationId = 4, 
                Price = 75.00M, 
                ExpectedQuantity = 150, 
                MinQuantity = 15, 
                Description = "Standard concert admission",
            },
            new { 
                Id = 10, 
                Name = "Event T-Shirt", 
                LocationId = 4, 
                Price = 35.00M, 
                ExpectedQuantity = 75, 
                MinQuantity = 7, 
                Description = "Concert merchandise",
            },
            new { 
                Id = 11, 
                Name = "Beverage Package", 
                LocationId = 4, 
                Price = 25.00M, 
                ExpectedQuantity = 100, 
                MinQuantity = 10, 
                Description = "Concert refreshments",
            }
        );
    }

    // DbSet properties
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityTag> ActivityTags { get; set; }
    public required DbSet<ActivityType> ActivityTypes { get; set; }
    public required DbSet<Location> Locations { get; set; }
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Review> Reviews { get; set; }

    public required DbSet<RevokedToken> RevokedTokens { get; set; }

    public required DbSet<Tag> Tags { get; set; }
    public required DbSet<UserActivity> UserActivities { get; set; }
    public required DbSet<User> Users { get; set; }
}