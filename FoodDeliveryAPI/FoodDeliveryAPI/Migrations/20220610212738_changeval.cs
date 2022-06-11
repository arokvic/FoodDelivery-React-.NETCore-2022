using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodDeliveryAPI.Migrations
{
    public partial class changeval : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userType",
                table: "Users",
                newName: "UserType");

            migrationBuilder.AlterColumn<string>(
                name: "UserType",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_Username",
                table: "Orders",
                column: "Username");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_Username",
                table: "Orders",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_Username",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_Username",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "UserType",
                table: "Users",
                newName: "userType");

            migrationBuilder.AlterColumn<int>(
                name: "userType",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
