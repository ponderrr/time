using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningStarter.Entities;

public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int LocationId { get; set; }
    public decimal Price { get; set; }
    public int ExpectedQuantity { get; set; }
    public int MinQuantity { get; set; }
    public required string Description { get; set; }
    
    public required Location Location { get; set; }
}

public class ProductSummaryDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int LocationId { get; set; }
    public decimal Price { get; set; }
}

public class ProductGetDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int LocationId { get; set; }
    public decimal Price { get; set; }
    public int ExpectedQuantity { get; set; }
    public int MinQuantity { get; set; }
    public required string Description { get; set; }
    public required List<ReviewGetDto> Reviews { get; set; } = new();
    public required Location Location { get; set; }
    public required string LocationName { get; set; }
}

public class ProductCreateDto
{
    public required string Name { get; set; }
    public int LocationId { get; set; }
    public decimal Price { get; set; }
    public int ExpectedQuantity { get; set; }
    public int MinQuantity { get; set; }
    public required string Description { get; set; }
}

public class ProductUpdateDto
{
    public required string Name { get; set; }
    public int LocationId { get; set; }
    public decimal Price { get; set; }
    public int ExpectedQuantity { get; set; }
    public int MinQuantity { get; set; }
    public required string Description { get; set; }
}

public class ProductEntityTypeConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Product");
        
        builder.Property(p => p.Price)
            .HasPrecision(10, 2); // 8 digits before decimal, 2 after
    }
}