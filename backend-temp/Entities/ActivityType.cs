using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities;

public class ActivityType
{
    public int Id { get; set; }
    public required string Name { get; set; }
}

public class ActivityTypeGetDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
}

public class ActivityTypeCreateDto
{
    public required string Name { get; set; }
}

public class ActivityTypeUpdateDto
{
    public required string Name { get; set; }
}

public class ActivityTypeEntityTypeConfiguration : IEntityTypeConfiguration<ActivityType>
{
    public void Configure(EntityTypeBuilder<ActivityType> builder)
    {
        builder.ToTable("ActivityType");
    }
}