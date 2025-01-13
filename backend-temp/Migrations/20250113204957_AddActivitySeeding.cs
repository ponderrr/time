using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace LearningStarter.Migrations
{
    /// <inheritdoc />
    public partial class AddActivitySeeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 1, 13, 20, 49, 57, 526, DateTimeKind.Utc).AddTicks(5757), "$2a$11$Jd9eO9WpzgjKCyg.6NCBNO.J/XsrnMDrqOwtQ2XMaqk2Nf1bzILyy" });

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ActivityTag",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ActivityTag",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ActivityTag",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ActivityTag",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "ActivityTag",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "ActivityTag",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "ActivityTag",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "ActivityTag",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "ActivityTag",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "ActivityTag",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Activity",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Activity",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Activity",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Activity",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 1, 10, 2, 6, 59, 422, DateTimeKind.Utc).AddTicks(3793), "$2a$11$kxAQMtgz1kWmPCrIiHhws.RE9Df/UE58xl4/fzA1GZOntgQUS4SKe" });
        }
    }
}
