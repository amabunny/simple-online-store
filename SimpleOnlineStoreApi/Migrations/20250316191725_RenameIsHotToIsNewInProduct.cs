using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimpleOnlineStoreApi.Migrations
{
    /// <inheritdoc />
    public partial class RenameIsHotToIsNewInProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsHot",
                table: "Products",
                newName: "IsNew");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsNew",
                table: "Products",
                newName: "IsHot");
        }
    }
}
