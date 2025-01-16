using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace LearningStarter.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActivityType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Location",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<decimal>(type: "decimal(3,1)", precision: 3, scale: 1, nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RevokedTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RevokedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RevokedTokens", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tag", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshTokenExpiryTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastLoginAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserActivity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ActivityId = table.Column<int>(type: "int", nullable: false),
                    DateBooked = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserActivity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Activity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    ActivityTypeId = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    EndTime = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Activity_ActivityType_ActivityTypeId",
                        column: x => x.ActivityTypeId,
                        principalTable: "ActivityType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Activity_Location_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    ExpectedQuantity = table.Column<int>(type: "int", nullable: false),
                    MinQuantity = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Product_Location_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivityTag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActivityId = table.Column<int>(type: "int", nullable: false),
                    TagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityTag", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityTag_Activity_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActivityTag_Tag_TagId",
                        column: x => x.TagId,
                        principalTable: "Tag",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivityProduct",
                columns: table => new
                {
                    ActivitiesId = table.Column<int>(type: "int", nullable: false),
                    ProductsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityProduct", x => new { x.ActivitiesId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_ActivityProduct_Activity_ActivitiesId",
                        column: x => x.ActivitiesId,
                        principalTable: "Activity",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityProduct_Product_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Product",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "ActivityType",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Sports Event" },
                    { 2, "Fine Dining" },
                    { 3, "Museum" },
                    { 4, "Concert" }
                });

            migrationBuilder.InsertData(
                table: "Location",
                columns: new[] { "Id", "City", "Country", "Description", "Name", "State" },
                values: new object[,]
                {
                    { 1, "New Orleans", "USA", "Home of the New Orleans Saints", "Caesars Superdome", "Louisiana" },
                    { 2, "New Orleans", "USA", "Fine dining restaurant in the heart of New Orleans", "Restaurant August", "Louisiana" },
                    { 3, "New Orleans", "USA", "America's official World War II Museum", "National WWII Museum", "Louisiana" },
                    { 4, "Denver", "USA", "Multi-purpose arena in Denver", "Ball Arena", "Colorado" }
                });

            migrationBuilder.InsertData(
                table: "Tag",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Sports" },
                    { 2, "NFL" },
                    { 3, "Football" },
                    { 4, "FoodAndDrink" },
                    { 5, "Upscale" },
                    { 6, "History" },
                    { 7, "Educational" },
                    { 8, "Military" },
                    { 9, "Music" },
                    { 10, "LiveEntertainment" }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "CreatedAt", "IsAdmin", "LastLoginAt", "Password", "RefreshToken", "RefreshTokenExpiryTime", "Username" },
                values: new object[] { 1, new DateTime(2025, 1, 16, 0, 41, 39, 854, DateTimeKind.Utc).AddTicks(9255), true, null, "$2a$11$NXAU8q/o0HxfWN4Z138./eTHnZqUtlf0r3x0g0F7XBVCCm/6IAfXq", null, null, "andrew.ponder" });

            migrationBuilder.InsertData(
                table: "Activity",
                columns: new[] { "Id", "ActivityTypeId", "EndTime", "ImageUrl", "LocationId", "Name", "StartTime" },
                values: new object[,]
                {
                    { 1, 1, new DateTimeOffset(new DateTime(2024, 1, 20, 16, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "https://thespun.com/.image/t_share/MTgzMTI4NjUzOTY5NjMwNjI3/divisional-round---philadelphia-eagles-v-new-orleans-saints.jpg", 1, "New Orleans Saints Game", new DateTimeOffset(new DateTime(2024, 1, 20, 13, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) },
                    { 2, 2, new DateTimeOffset(new DateTime(2024, 1, 14, 20, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "https://resizer.otstatic.com/v2/photos/wide-huge/3/68484709.jpg", 2, "Dinner at Restaurant August", new DateTimeOffset(new DateTime(2024, 1, 14, 18, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) },
                    { 3, 3, new DateTimeOffset(new DateTime(2024, 1, 16, 17, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "https://assets.simpleviewinc.com/simpleview/image/upload/crm/neworleans/_MG_7836_4B6A886E-0980-8656-351CA87266FB87CF-4b6a7340f4514e5_4b6af750-d8e2-07f7-b6336105578f2003.jpg", 3, "World War 2 Museum Experience", new DateTimeOffset(new DateTime(2024, 1, 16, 9, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) },
                    { 4, 4, new DateTimeOffset(new DateTime(2024, 1, 27, 23, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "https://cloudfront-us-east-1.images.arcpublishing.com/pmn/L73ENXS74ZD2DMIWGEOYUGC3WM.jpg", 4, "Zach Bryan Concert", new DateTimeOffset(new DateTime(2024, 1, 27, 19, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) }
                });

            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "Id", "Description", "ExpectedQuantity", "LocationId", "MinQuantity", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Standard game ticket", 100, 1, 10, "Game Ticket", 85.00m },
                    { 2, "Hot dog, chips, and drink", 200, 1, 20, "Stadium Food Combo", 15.00m },
                    { 3, "Team apparel and souvenirs", 50, 1, 5, "Team Merchandise", 45.00m },
                    { 4, "Multi-course dining experience", 50, 2, 5, "August Food Menu", 95.00m },
                    { 5, "Curated wine selection", 30, 2, 3, "Wine Pairing", 65.00m },
                    { 6, "General admission ticket", 200, 3, 20, "Museum Admission", 29.00m },
                    { 7, "4D movie experience", 100, 3, 10, "Beyond All Boundaries 4D", 15.00m },
                    { 8, "Expert-led museum tour", 50, 3, 5, "Guided Tour", 25.00m },
                    { 9, "Standard concert admission", 150, 4, 15, "Concert Ticket", 75.00m },
                    { 10, "Concert merchandise", 75, 4, 7, "Event T-Shirt", 35.00m },
                    { 11, "Concert refreshments", 100, 4, 10, "Beverage Package", 25.00m }
                });

            migrationBuilder.InsertData(
                table: "ActivityProduct",
                columns: new[] { "ActivitiesId", "ProductsId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 1, 3 },
                    { 2, 4 },
                    { 2, 5 },
                    { 3, 6 },
                    { 3, 7 },
                    { 3, 8 },
                    { 4, 9 },
                    { 4, 10 },
                    { 4, 11 }
                });

            migrationBuilder.InsertData(
                table: "ActivityTag",
                columns: new[] { "Id", "ActivityId", "TagId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 1, 2 },
                    { 3, 1, 3 },
                    { 4, 2, 4 },
                    { 5, 2, 5 },
                    { 6, 3, 6 },
                    { 7, 3, 7 },
                    { 8, 3, 8 },
                    { 9, 4, 9 },
                    { 10, 4, 10 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activity_ActivityTypeId",
                table: "Activity",
                column: "ActivityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Activity_LocationId",
                table: "Activity",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityProduct_ProductsId",
                table: "ActivityProduct",
                column: "ProductsId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTag_ActivityId",
                table: "ActivityTag",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTag_TagId",
                table: "ActivityTag",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_LocationId",
                table: "Product",
                column: "LocationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityProduct");

            migrationBuilder.DropTable(
                name: "ActivityTag");

            migrationBuilder.DropTable(
                name: "Review");

            migrationBuilder.DropTable(
                name: "RevokedTokens");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "UserActivity");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Activity");

            migrationBuilder.DropTable(
                name: "Tag");

            migrationBuilder.DropTable(
                name: "ActivityType");

            migrationBuilder.DropTable(
                name: "Location");
        }
    }
}
