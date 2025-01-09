using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities;

public class ActivityTag
{
    public int Id { get; set; }
    public int ActivityId { get; set; }
    public int TagId { get; set; }

    public required Activity Activity { get; set; }
    public required Tag Tag { get; set; }
}

public class ActivityTagGetDto
{
    public int Id { get; set; }
    public required int ActivityId { get; set; }
    public required int TagId { get; set; }
}

public class ActivityTagCreateDto
{
    public required int ActivityId { get; set; }
    public required int TagId { get; set; }
}

public class ActivityTagUpdateDto
{
    public required int ActivityId { get; set; }
    public required int TagId { get; set; }
}

public class ActivityTagEntityTypeConfiguration : IEntityTypeConfiguration<ActivityTag>
{
    public void Configure(EntityTypeBuilder<ActivityTag> builder)
    {
        builder.ToTable("ActivityTag");
    }
}