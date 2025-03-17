using System.ComponentModel.DataAnnotations;

namespace SimpleOnlineStoreApi.Entities.Models;

public class Product
{
    public int Id { get; set; }

    [MaxLength(100)] public required string Brand { get; set; }

    [MaxLength(200)] public required string Name { get; set; }

    public decimal Price { get; set; }

    public bool IsNew { get; set; }

    [MaxLength(5000)] public required string Description { get; set; }
}
