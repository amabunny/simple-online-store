using System.Linq.Expressions;
using AutoMapper;
using SimpleOnlineStoreApi.DAL;
using SimpleOnlineStoreApi.Entities.DTO;
using SimpleOnlineStoreApi.Entities.Models;
using SimpleOnlineStoreApi.Utility.Types;

namespace SimpleOnlineStoreApi.Services;

public class ProductsService(ApplicationDbContext dbContext, IMapper mapper)
{
    public IEnumerable<Product> GetAll(decimal? priceFrom, decimal? priceTo, Order? order,
        string? orderBy = "Id")
    {
        var query = dbContext.Products.AsQueryable();

        if (priceFrom != null) query = query.Where(p => p.Price >= priceFrom);
        if (priceTo != null) query = query.Where(p => p.Price <= priceTo);

        query = ApplyOrdering(query, orderBy, order);

        return query.AsEnumerable().ToList();
    }

    private static IQueryable<Product> ApplyOrdering(IQueryable<Product> query, string? orderBy,
        Order? order = Order.Asc)
    {
        Expression<Func<Product, object>> key = orderBy?.ToLower() switch
        {
            "id" => p => p.Id,
            "name" => p => p.Name,
            "price" => p => p.Price,
            _ => p => p.Id
        };

        return order == Order.Desc ? query.OrderByDescending(key) : query.OrderBy(key);
    }

    public Product Create(CreateProductDto createProductDto)
    {
        var product = mapper.Map<Product>(createProductDto);
        dbContext.Products.Add(product);
        dbContext.SaveChanges();

        return product;
    }
}
