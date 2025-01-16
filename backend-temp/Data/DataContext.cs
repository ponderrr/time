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

        // Configure the many-to-many relationship between Activity and Product
            modelBuilder.Entity<Activity>()
        .HasMany(a => a.Products)
        .WithMany(p => p.Activities)
        .UsingEntity<Dictionary<string, object>>(
            "ActivityProduct",
            j => j
                .HasOne<Product>()
                .WithMany()
                .HasForeignKey("ProductsId")
                .OnDelete(DeleteBehavior.NoAction), // Changed from Cascade
            j => j
                .HasOne<Activity>()
                .WithMany()
                .HasForeignKey("ActivitiesId")
                .OnDelete(DeleteBehavior.NoAction), // Changed from Cascade
            j =>
            {
                j.HasKey("ActivitiesId", "ProductsId");
                j.ToTable("ActivityProduct");
            }
        );

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

        // Seed Tags
        var tags = new[]
        {
            new { Id = 1, Name = "Sports" },
            new { Id = 2, Name = "NFL" },
            new { Id = 3, Name = "Football" },
            new { Id = 4, Name = "FoodAndDrink" },
            new { Id = 5, Name = "Upscale" },
            new { Id = 6, Name = "History" },
            new { Id = 7, Name = "Educational" },
            new { Id = 8, Name = "Military" },
            new { Id = 9, Name = "Music" },
            new { Id = 10, Name = "LiveEntertainment" }
        };
        modelBuilder.Entity<Tag>().HasData(tags);

        // Seed Products
        var products = new[]
        {
            new { 
                Id = 1, 
                Name = "Game Ticket", 
                LocationId = 1, 
                Price = 85.00M, 
                ExpectedQuantity = 100, 
                MinQuantity = 10, 
                Description = "Standard game ticket"
            },
            new { 
                Id = 2, 
                Name = "Stadium Food Combo", 
                LocationId = 1, 
                Price = 15.00M, 
                ExpectedQuantity = 200, 
                MinQuantity = 20, 
                Description = "Hot dog, chips, and drink"
            },
            new { 
                Id = 3, 
                Name = "Team Merchandise", 
                LocationId = 1, 
                Price = 45.00M, 
                ExpectedQuantity = 50, 
                MinQuantity = 5, 
                Description = "Team apparel and souvenirs"
            },
            new { 
                Id = 4, 
                Name = "August Food Menu", 
                LocationId = 2, 
                Price = 95.00M, 
                ExpectedQuantity = 50, 
                MinQuantity = 5, 
                Description = "Multi-course dining experience"
            },
            new { 
                Id = 5, 
                Name = "Wine Pairing", 
                LocationId = 2, 
                Price = 65.00M, 
                ExpectedQuantity = 30, 
                MinQuantity = 3, 
                Description = "Curated wine selection"
            },
            new { 
                Id = 6, 
                Name = "Museum Admission", 
                LocationId = 3, 
                Price = 29.00M, 
                ExpectedQuantity = 200, 
                MinQuantity = 20, 
                Description = "General admission ticket"
            },
            new { 
                Id = 7, 
                Name = "Beyond All Boundaries 4D", 
                LocationId = 3, 
                Price = 15.00M, 
                ExpectedQuantity = 100, 
                MinQuantity = 10, 
                Description = "4D movie experience"
            },
            new { 
                Id = 8, 
                Name = "Guided Tour", 
                LocationId = 3, 
                Price = 25.00M, 
                ExpectedQuantity = 50, 
                MinQuantity = 5, 
                Description = "Expert-led museum tour"
            },
            new { 
                Id = 9, 
                Name = "Concert Ticket", 
                LocationId = 4, 
                Price = 75.00M, 
                ExpectedQuantity = 150, 
                MinQuantity = 15, 
                Description = "Standard concert admission"
            },
            new { 
                Id = 10, 
                Name = "Event T-Shirt", 
                LocationId = 4, 
                Price = 35.00M, 
                ExpectedQuantity = 75, 
                MinQuantity = 7, 
                Description = "Concert merchandise"
            },
            new { 
                Id = 11, 
                Name = "Beverage Package", 
                LocationId = 4, 
                Price = 25.00M, 
                ExpectedQuantity = 100, 
                MinQuantity = 10, 
                Description = "Concert refreshments"
            }
        };
        modelBuilder.Entity<Product>().HasData(products);

        // Seed Activities
        var activities = new[]
        {
            new 
            {
                Id = 1,
                Name = "New Orleans Saints Game",
                LocationId = 1,        
                ActivityTypeId = 1,    
                StartTime = DateTimeOffset.Parse("2024-01-20T13:00:00+00:00"),
                EndTime = DateTimeOffset.Parse("2024-01-20T16:00:00+00:00"),
                ImageUrl = "https://thespun.com/.image/t_share/MTgzMTI4NjUzOTY5NjMwNjI3/divisional-round---philadelphia-eagles-v-new-orleans-saints.jpg"
            },
            new 
            {
                Id = 2,
                Name = "Dinner at Restaurant August",
                LocationId = 2,   
                ActivityTypeId = 2,    
                StartTime = DateTimeOffset.Parse("2024-01-14T18:00:00+00:00"),
                EndTime = DateTimeOffset.Parse("2024-01-14T20:00:00+00:00"),
                ImageUrl = "https://resizer.otstatic.com/v2/photos/wide-huge/3/68484709.jpg"
            },
            new 
            {
                Id = 3,
                Name = "World War 2 Museum Experience",
                LocationId = 3,      
                ActivityTypeId = 3,    
                StartTime = DateTimeOffset.Parse("2024-01-16T09:00:00+00:00"),
                EndTime = DateTimeOffset.Parse("2024-01-16T17:00:00+00:00"),
                ImageUrl = "https://assets.simpleviewinc.com/simpleview/image/upload/crm/neworleans/_MG_7836_4B6A886E-0980-8656-351CA87266FB87CF-4b6a7340f4514e5_4b6af750-d8e2-07f7-b6336105578f2003.jpg"
            },
            new 
            {
                Id = 4,
                Name = "Zach Bryan Concert",
                LocationId = 4,      
                ActivityTypeId = 4,    
                StartTime = DateTimeOffset.Parse("2024-01-27T19:00:00+00:00"),
                EndTime = DateTimeOffset.Parse("2024-01-27T23:00:00+00:00"),
                ImageUrl = "https://cloudfront-us-east-1.images.arcpublishing.com/pmn/L73ENXS74ZD2DMIWGEOYUGC3WM.jpg"
            }
        };
        modelBuilder.Entity<Activity>().HasData(activities);

        // Seed Activity-Product relationships
        modelBuilder.Entity("ActivityProduct").HasData(
            new { ActivitiesId = 1, ProductsId = 1 },  // Game Ticket for Saints Game
            new { ActivitiesId = 1, ProductsId = 2 },  // Stadium Food Combo for Saints Game
            new { ActivitiesId = 1, ProductsId = 3 },  // Team Merchandise for Saints Game
            
            new { ActivitiesId = 2, ProductsId = 4 },  // August Food Menu for Restaurant
            new { ActivitiesId = 2, ProductsId = 5 },  // Wine Pairing for Restaurant
            
            new { ActivitiesId = 3, ProductsId = 6 },  // Museum Admission
            new { ActivitiesId = 3, ProductsId = 7 },  // Beyond All Boundaries 4D
            new { ActivitiesId = 3, ProductsId = 8 },  // Guided Tour
            
            new { ActivitiesId = 4, ProductsId = 9 },  // Concert Ticket
            new { ActivitiesId = 4, ProductsId = 10 }, // Event T-Shirt
            new { ActivitiesId = 4, ProductsId = 11 }  // Beverage Package
        );

        // Seed Activity Tags
        modelBuilder.Entity<ActivityTag>().HasData(
            new { Id = 1, ActivityId = 1, TagId = 1 },  // Sports
            new { Id = 2, ActivityId = 1, TagId = 2 },  // NFL
            new { Id = 3, ActivityId = 1, TagId = 3 },  // Football
            new { Id = 4, ActivityId = 2, TagId = 4 },  // FoodAndDrink
            new { Id = 5, ActivityId = 2, TagId = 5 },  // Upscale
            new { Id = 6, ActivityId = 3, TagId = 6 },  // History
            new { Id = 7, ActivityId = 3, TagId = 7 },  // Educational
            new { Id = 8, ActivityId = 3, TagId = 8 },  // Military
            new { Id = 9, ActivityId = 4, TagId = 9 },  // Music
            new { Id = 10, ActivityId = 4, TagId = 10 } // LiveEntertainment
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