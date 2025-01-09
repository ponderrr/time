using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities;

public class UserActivity
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ActivityId { get; set; }
    public DateTimeOffset DateBooked { get; set; }
}

public class UserActivityGetDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ActivityId { get; set; }
    public DateTimeOffset DateBooked { get; set; }
}

public class UserActivityCreateDto
{
    public int UserId { get; set; }
    public int ActivityId { get; set; }
    public DateTimeOffset DateBooked { get; set; }
}

public class UserActivityUpdateDto
{
    public int UserId { get; set; }
    public int ActivityId { get; set; }
    public DateTimeOffset DateBooked { get; set; }
}

public class UserActivityEntityTypeConfiguration : IEntityTypeConfiguration<UserActivity>
{
    public void Configure(EntityTypeBuilder<UserActivity> builder)
    {
        builder.ToTable("UserActivity");
    }
}