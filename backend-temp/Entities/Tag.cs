using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities;

public class Tag
{
    public int Id { get; set; }
    public required string Name { get; set; }
    
    public required List<ActivityTag> ActivityTags { get; set; } = new();
}

public class TagGetDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
}

public class TagCreateDto
{
    public required string Name { get; set; }
}

public class TagUpdateDto
{
    public required string Name { get; set; }
}

public class TagEntityTypeConfiguration : IEntityTypeConfiguration<Tag>
{
    public void Configure(EntityTypeBuilder<Tag> builder)
    {
        builder.ToTable("Tag");
    }
}