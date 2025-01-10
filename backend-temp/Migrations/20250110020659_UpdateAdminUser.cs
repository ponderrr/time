using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearningStarter.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAdminUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 1, 10, 2, 6, 59, 422, DateTimeKind.Utc).AddTicks(3793), "$2a$11$kxAQMtgz1kWmPCrIiHhws.RE9Df/UE58xl4/fzA1GZOntgQUS4SKe" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 1, 10, 1, 59, 24, 89, DateTimeKind.Utc).AddTicks(7939), "$2a$11$gDIIGXm5ouD2IIkLnq2bBuIDG5uwVrc2kaJqBpSwiL5/gbbttq1uC" });
        }
    }
}
