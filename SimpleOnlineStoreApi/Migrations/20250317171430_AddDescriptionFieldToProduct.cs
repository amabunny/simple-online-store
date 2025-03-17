using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimpleOnlineStoreApi.Migrations
{
    /// <inheritdoc />
    public partial class AddDescriptionFieldToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Products",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Description",
                value: "iPhone 11 Pro — это премиальный смартфон от Apple, представленный в 2019 году. Он оснащён 5,8-дюймовым Super Retina XDR дисплеем, который обеспечивает яркие цвета, глубокий чёрный цвет и высокую детализацию.\n\n🔥 Основные характеристики:\nПроцессор: Apple A13 Bionic — быстрый и энергоэффективный чип\nДисплей: 5,8\" OLED Super Retina XDR (разрешение 2436×1125)\nКамеры:\n📸 Тройная основная камера (12 МП):\nШирокоугольная (f/1.8)\nСверхширокоугольная (f/2.4, угол обзора 120°)\nТелеобъектив (f/2.0, 2× оптический зум)\n📸 Фронтальная камера 12 МП с поддержкой Night Mode и 4K-видео\nАвтономность: До 4 часов дольше, чем iPhone XS\nМатериалы: Корпус из стекла и хирургической нержавеющей стали\nЗащита: Водонепроницаемость IP68 (до 4 метров на 30 минут)\nОперационная система: iOS (с возможностью обновления до последних версий)\nДоступен в цветах: Midnight Green, Space Gray, Silver, Gold.\n\niPhone 11 Pro остаётся мощным и актуальным смартфоном даже спустя годы благодаря производительности и качеству камер. 🚀");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Products");
        }
    }
}
