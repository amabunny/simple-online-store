using System.Linq.Expressions;
using AutoMapper;
using SimpleOnlineStoreApi.DAL;
using SimpleOnlineStoreApi.Entities.DTO;
using SimpleOnlineStoreApi.Entities.Models;
using SimpleOnlineStoreApi.Utility.Types;

namespace SimpleOnlineStoreApi.Services;

public class ProductsService(ApplicationDbContext dbContext, IMapper mapper)
{
    public IEnumerable<Product> GetAll(decimal? priceFrom, decimal? priceTo, string? brand,
        string? name, bool? isNew,
        Order? order,
        string? orderBy = "Id")
    {
        var query = dbContext.Products.AsQueryable();

        if (priceFrom != null) query = query.Where(p => p.Price >= priceFrom);
        if (priceTo != null) query = query.Where(p => p.Price <= priceTo);
        if (isNew != null) query = query.Where(p => p.IsNew);
        if (brand != null) query = query.Where(p => p.Brand.ToLower().Contains(brand.ToLower()));
        if (name != null) query = query.Where(p => p.Name.ToLower().Contains(name.ToLower()));

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
            "brand" => p => p.Brand,
            "isnew" => p => p.IsNew,
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

    public Product? Update(int id, UpdateProductDto updateProductDto)
    {
        var product = dbContext.Products.FirstOrDefault(p => p.Id == id);
        if (product == null) return null;

        mapper.Map(updateProductDto, product);
        dbContext.SaveChanges();

        return product;
    }

    public Product? GetById(int id)
    {
        return dbContext.Products.Find(id);
    }
}
