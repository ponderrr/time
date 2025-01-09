﻿// <auto-generated />
using System;
using LearningStarter.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LearningStarter.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20250107221447_UpdatedSeedingAndRequiredFields")]
    partial class UpdatedSeedingAndRequiredFields
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("LearningStarter.Entities.Activity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ActivityTypeId")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("EndTime")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LocationId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTimeOffset>("StartTime")
                        .HasColumnType("datetimeoffset");

                    b.HasKey("Id");

                    b.HasIndex("ActivityTypeId");

                    b.HasIndex("LocationId");

                    b.ToTable("Activity", (string)null);
                });

            modelBuilder.Entity("LearningStarter.Entities.ActivityTag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ActivityId")
                        .HasColumnType("int");

                    b.Property<int>("TagId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ActivityId");

                    b.HasIndex("TagId");

                    b.ToTable("ActivityTag", (string)null);
                });

            modelBuilder.Entity("LearningStarter.Entities.ActivityType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ActivityType", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Sports Event"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Fine Dining"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Museum"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Concert"
                        });
                });

            modelBuilder.Entity("LearningStarter.Entities.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Location", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            City = "New Orleans",
                            Country = "USA",
                            Description = "Home of the New Orleans Saints",
                            Name = "Caesars Superdome",
                            State = "Louisiana"
                        },
                        new
                        {
                            Id = 2,
                            City = "New Orleans",
                            Country = "USA",
                            Description = "Fine dining restaurant in the heart of New Orleans",
                            Name = "Restaurant August",
                            State = "Louisiana"
                        },
                        new
                        {
                            Id = 3,
                            City = "New Orleans",
                            Country = "USA",
                            Description = "America's official World War II Museum",
                            Name = "National WWII Museum",
                            State = "Louisiana"
                        },
                        new
                        {
                            Id = 4,
                            City = "Denver",
                            Country = "USA",
                            Description = "Multi-purpose arena in Denver",
                            Name = "Ball Arena",
                            State = "Colorado"
                        });
                });

            modelBuilder.Entity("LearningStarter.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("ActivityId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ExpectedQuantity")
                        .HasColumnType("int");

                    b.Property<int>("LocationId")
                        .HasColumnType("int");

                    b.Property<int>("MinQuantity")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasPrecision(10, 2)
                        .HasColumnType("decimal(10,2)");

                    b.HasKey("Id");

                    b.HasIndex("ActivityId");

                    b.HasIndex("LocationId");

                    b.ToTable("Product", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Standard game ticket",
                            ExpectedQuantity = 100,
                            LocationId = 1,
                            MinQuantity = 10,
                            Name = "Game Ticket",
                            Price = 85.00m
                        },
                        new
                        {
                            Id = 2,
                            Description = "Hot dog, chips, and drink",
                            ExpectedQuantity = 200,
                            LocationId = 1,
                            MinQuantity = 20,
                            Name = "Stadium Food Combo",
                            Price = 15.00m
                        },
                        new
                        {
                            Id = 3,
                            Description = "Team apparel and souvenirs",
                            ExpectedQuantity = 50,
                            LocationId = 1,
                            MinQuantity = 5,
                            Name = "Team Merchandise",
                            Price = 45.00m
                        },
                        new
                        {
                            Id = 4,
                            Description = "Multi-course dining experience",
                            ExpectedQuantity = 50,
                            LocationId = 2,
                            MinQuantity = 5,
                            Name = "August Food Menu",
                            Price = 95.00m
                        },
                        new
                        {
                            Id = 5,
                            Description = "Curated wine selection",
                            ExpectedQuantity = 30,
                            LocationId = 2,
                            MinQuantity = 3,
                            Name = "Wine Pairing",
                            Price = 65.00m
                        },
                        new
                        {
                            Id = 6,
                            Description = "General admission ticket",
                            ExpectedQuantity = 200,
                            LocationId = 3,
                            MinQuantity = 20,
                            Name = "Museum Admission",
                            Price = 29.00m
                        },
                        new
                        {
                            Id = 7,
                            Description = "4D movie experience",
                            ExpectedQuantity = 100,
                            LocationId = 3,
                            MinQuantity = 10,
                            Name = "Beyond All Boundaries 4D",
                            Price = 15.00m
                        },
                        new
                        {
                            Id = 8,
                            Description = "Expert-led museum tour",
                            ExpectedQuantity = 50,
                            LocationId = 3,
                            MinQuantity = 5,
                            Name = "Guided Tour",
                            Price = 25.00m
                        },
                        new
                        {
                            Id = 9,
                            Description = "Standard concert admission",
                            ExpectedQuantity = 150,
                            LocationId = 4,
                            MinQuantity = 15,
                            Name = "Concert Ticket",
                            Price = 75.00m
                        },
                        new
                        {
                            Id = 10,
                            Description = "Concert merchandise",
                            ExpectedQuantity = 75,
                            LocationId = 4,
                            MinQuantity = 7,
                            Name = "Event T-Shirt",
                            Price = 35.00m
                        },
                        new
                        {
                            Id = 11,
                            Description = "Concert refreshments",
                            ExpectedQuantity = 100,
                            LocationId = 4,
                            MinQuantity = 10,
                            Name = "Beverage Package",
                            Price = 25.00m
                        });
                });

            modelBuilder.Entity("LearningStarter.Entities.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LocationId")
                        .HasColumnType("int");

                    b.Property<decimal>("Rating")
                        .HasPrecision(3, 1)
                        .HasColumnType("decimal(3,1)");

                    b.HasKey("Id");

                    b.ToTable("Review", (string)null);
                });

            modelBuilder.Entity("LearningStarter.Entities.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tag", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Sports"
                        },
                        new
                        {
                            Id = 2,
                            Name = "NFL"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Football"
                        },
                        new
                        {
                            Id = 4,
                            Name = "FoodAndDrink"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Upscale"
                        },
                        new
                        {
                            Id = 6,
                            Name = "History"
                        },
                        new
                        {
                            Id = 7,
                            Name = "Educational"
                        },
                        new
                        {
                            Id = 8,
                            Name = "Military"
                        },
                        new
                        {
                            Id = 9,
                            Name = "Music"
                        },
                        new
                        {
                            Id = 10,
                            Name = "LiveEntertainment"
                        });
                });

            modelBuilder.Entity("LearningStarter.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("LastLoginAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("RefreshTokenExpiryTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("User", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2025, 1, 7, 22, 14, 47, 362, DateTimeKind.Utc).AddTicks(4346),
                            IsAdmin = true,
                            Password = "$2a$11$aNA1yjHiRR6w6zMG/TTCcuiIWRWTaTmAZxN9LZZZ7DZkvPPC9gXgu",
                            Username = "admin"
                        });
                });

            modelBuilder.Entity("LearningStarter.Entities.UserActivity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ActivityId")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("DateBooked")
                        .HasColumnType("datetimeoffset");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("UserActivity", (string)null);
                });

            modelBuilder.Entity("LearningStarter.Entities.Activity", b =>
                {
                    b.HasOne("LearningStarter.Entities.ActivityType", "ActivityType")
                        .WithMany()
                        .HasForeignKey("ActivityTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LearningStarter.Entities.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ActivityType");

                    b.Navigation("Location");
                });

            modelBuilder.Entity("LearningStarter.Entities.ActivityTag", b =>
                {
                    b.HasOne("LearningStarter.Entities.Activity", "Activity")
                        .WithMany("ActivityTags")
                        .HasForeignKey("ActivityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LearningStarter.Entities.Tag", "Tag")
                        .WithMany("ActivityTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Activity");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("LearningStarter.Entities.Product", b =>
                {
                    b.HasOne("LearningStarter.Entities.Activity", null)
                        .WithMany("Products")
                        .HasForeignKey("ActivityId");

                    b.HasOne("LearningStarter.Entities.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");
                });

            modelBuilder.Entity("LearningStarter.Entities.Activity", b =>
                {
                    b.Navigation("ActivityTags");

                    b.Navigation("Products");
                });

            modelBuilder.Entity("LearningStarter.Entities.Tag", b =>
                {
                    b.Navigation("ActivityTags");
                });
#pragma warning restore 612, 618
        }
    }
}
