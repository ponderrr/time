using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities;


  public class Activity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int LocationId { get; set; }
    public int ActivityTypeId { get; set; }
    public DateTimeOffset StartTime { get; set; }
    public DateTimeOffset EndTime { get; set; }
    
    public required Location Location { get; set; }
    public required ActivityType ActivityType { get; set; }
    
    public List<Product> Products { get; set; } = new();
    public List<ActivityTag> ActivityTags { get; set; } = new();
    
    public string? ImageUrl { get; set; }
}  


public class ActivityGetDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int LocationId { get; set; }
    public int ActivityTypeId { get; set; }
    public DateTimeOffset StartTime { get; set; }
    public DateTimeOffset EndTime { get; set; }
    public string? ImageUrl { get; set; }
    public required LocationGetDto Location { get; set; }
    public required ActivityTypeGetDto ActivityType { get; set; }
    public List<ProductGetDto> Products { get; set; } = new();
    public List<TagGetDto> Tags { get; set; } = new();
}

public class ActivityCreateDto
{
    public required string Name { get; set; }
    public int LocationId { get; set; }
    public int ActivityTypeId { get; set; }
    public DateTimeOffset StartTime { get; set; }
    public DateTimeOffset EndTime { get; set; }
    public string? ImageUrl { get; set; }
    public List<int> Products { get; set; } = new();
    public List<int> Tags { get; set; } = new();
}

public class ActivityUpdateDto
{
    public required string Name { get; set; }
    public int LocationId { get; set; }
    public int ActivityTypeId { get; set; }
    public DateTimeOffset StartTime { get; set; }
    public DateTimeOffset EndTime { get; set; }
    public string? ImageUrl { get; set; }
    public List<int> Products { get; set; } = new();
    public List<int> Tags { get; set; } = new();
}

public class ActivityEntityTypeConfiguration : IEntityTypeConfiguration<Activity>
{
    public void Configure(EntityTypeBuilder<Activity> builder)
    {
        builder.ToTable("Activity");
    }
}