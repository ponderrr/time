using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearningStarter.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserSeeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password", "Username" },
                values: new object[] { new DateTime(2025, 1, 10, 1, 59, 24, 89, DateTimeKind.Utc).AddTicks(7939), "$2a$11$gDIIGXm5ouD2IIkLnq2bBuIDG5uwVrc2kaJqBpSwiL5/gbbttq1uC", "andrew.ponder" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password", "Username" },
                values: new object[] { new DateTime(2025, 1, 9, 20, 23, 12, 763, DateTimeKind.Utc).AddTicks(2664), "$2a$11$BrTPHEYvFDZ3nklWYJOfte.f2qCk1nsj9pmnvciJN/tQFrsdcCMES", "mrfro" });
        }
    }
}
