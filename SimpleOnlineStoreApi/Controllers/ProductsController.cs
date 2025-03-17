using Microsoft.AspNetCore.Mvc;
using SimpleOnlineStoreApi.Entities.DTO;
using SimpleOnlineStoreApi.Entities.Models;
using SimpleOnlineStoreApi.Services;
using SimpleOnlineStoreApi.Utility.Types;

namespace SimpleOnlineStoreApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductsController(ProductsService productsService) : ControllerBase
{
    [HttpGet]
    public ActionResult<Product[]> GetAll([FromQuery] decimal? priceFrom,
        [FromQuery] decimal? priceTo,
        [FromQuery] bool? isNew,
        [FromQuery] string? name,
        [FromQuery] string? brand,
        [FromQuery] string? orderBy, Order? order)
    {
        var products =
            productsService.GetAll(priceFrom, priceTo, brand, name, isNew, order, orderBy);

        return Ok(products);
    }

    [HttpPost("Create")]
    public ActionResult<Product> Create([FromBody] CreateProductDto productDto)
    {
        var product = productsService.Create(productDto);

        return Ok(product);
    }

    [HttpGet("{id:int}")]
    public ActionResult<Product> GetById(int id)
    {
        var product = productsService.GetById(id);
        if (product == null) return NotFound();

        return Ok(product);
    }

    [HttpPut("{id:int}")]
    public ActionResult<Product> Update(int id, [FromBody] UpdateProductDto productDto)
    {
        var updatedProduct = productsService.Update(id, productDto);
        if (updatedProduct == null) return NotFound();

        return Ok(updatedProduct);
    }
}
