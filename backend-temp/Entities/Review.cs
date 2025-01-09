using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities;

public class Review
{
    public int Id { get; set; }
    public int LocationId { get; set; }
    public decimal Rating { get; set; }
    public required string Comment { get; set; }
}

public class ReviewGetDto
{
    public int Id { get; set; }
    public int LocationId { get; set; }
    public decimal Rating { get; set; }
    public required string Comment { get; set; }
}

public class ReviewCreateDto
{
    public int LocationId { get; set; }
    public decimal Rating { get; set; }
    public required string Comment { get; set; }
}

public class ReviewUpdateDto
{
    public int LocationId { get; set; }
    public decimal Rating { get; set; }
    public required string Comment { get; set; }
}

public class ReviewEntityTypeConfiguration : IEntityTypeConfiguration<Review>
{
    public void Configure(EntityTypeBuilder<Review> builder)
    {
        builder.ToTable("Review");
        
        builder.Property(r => r.Rating)
            .HasPrecision(3, 1); // For ratings like 4.5
    }
}