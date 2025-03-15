using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SimpleOnlineStoreApi.Entities.Models;

namespace SimpleOnlineStoreApi.DAL.Configuration;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasData(new Product
        {
            Brand = "Apple", Name = "iPhone 11 Pro", Id = 1, Price = 29990
        });
    }
}
