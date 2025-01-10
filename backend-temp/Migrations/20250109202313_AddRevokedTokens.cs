using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearningStarter.Migrations
{
    /// <inheritdoc />
    public partial class AddRevokedTokens : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password", "Username" },
                values: new object[] { new DateTime(2025, 1, 9, 20, 23, 12, 763, DateTimeKind.Utc).AddTicks(2664), "$2a$11$BrTPHEYvFDZ3nklWYJOfte.f2qCk1nsj9pmnvciJN/tQFrsdcCMES", "mrfro" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RevokedTokens");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password", "Username" },
                values: new object[] { new DateTime(2025, 1, 9, 0, 15, 3, 307, DateTimeKind.Utc).AddTicks(8974), "$2a$11$LCZafSKdZtS4GwEWSeIRnuq7.zRYrSvwcnhUerLmkqhc7yT8UQRJ2", "admin" });
        }
    }
}
