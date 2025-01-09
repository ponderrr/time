using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace LearningStarter.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedSeedingAndRequiredFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "User",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastLoginAt",
                table: "User",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RefreshToken",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RefreshTokenExpiryTime",
                table: "User",
                type: "datetime2",
                nullable: true);

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

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "LastLoginAt", "Password", "RefreshToken", "RefreshTokenExpiryTime" },
                values: new object[] { new DateTime(2025, 1, 7, 22, 14, 47, 362, DateTimeKind.Utc).AddTicks(4346), null, "$2a$11$aNA1yjHiRR6w6zMG/TTCcuiIWRWTaTmAZxN9LZZZ7DZkvPPC9gXgu", null, null });

            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "Id", "ActivityId", "Description", "ExpectedQuantity", "LocationId", "MinQuantity", "Name", "Price" },
                values: new object[,]
                {
                    { 1, null, "Standard game ticket", 100, 1, 10, "Game Ticket", 85.00m },
                    { 2, null, "Hot dog, chips, and drink", 200, 1, 20, "Stadium Food Combo", 15.00m },
                    { 3, null, "Team apparel and souvenirs", 50, 1, 5, "Team Merchandise", 45.00m },
                    { 4, null, "Multi-course dining experience", 50, 2, 5, "August Food Menu", 95.00m },
                    { 5, null, "Curated wine selection", 30, 2, 3, "Wine Pairing", 65.00m },
                    { 6, null, "General admission ticket", 200, 3, 20, "Museum Admission", 29.00m },
                    { 7, null, "4D movie experience", 100, 3, 10, "Beyond All Boundaries 4D", 15.00m },
                    { 8, null, "Expert-led museum tour", 50, 3, 5, "Guided Tour", 25.00m },
                    { 9, null, "Standard concert admission", 150, 4, 15, "Concert Ticket", 75.00m },
                    { 10, null, "Concert merchandise", 75, 4, 7, "Event T-Shirt", 35.00m },
                    { 11, null, "Concert refreshments", 100, 4, 10, "Beverage Package", 25.00m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ActivityType",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ActivityType",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ActivityType",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ActivityType",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Tag",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Tag",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Tag",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Tag",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Tag",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Tag",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Tag",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Tag",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Tag",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Tag",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Location",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Location",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Location",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Location",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "User");

            migrationBuilder.DropColumn(
                name: "LastLoginAt",
                table: "User");

            migrationBuilder.DropColumn(
                name: "RefreshToken",
                table: "User");

            migrationBuilder.DropColumn(
                name: "RefreshTokenExpiryTime",
                table: "User");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "admin123");
        }
    }
}
