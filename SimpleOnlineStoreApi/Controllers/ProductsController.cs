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
        [FromQuery] string? orderBy, Order? order)
    {
        var products = productsService.GetAll(priceFrom, priceTo, order, orderBy);

        return Ok(products);
    }

    [HttpPost("Create")]
    public ActionResult<Product> Create([FromBody] CreateProductDto productDto)
    {
        var product = productsService.Create(productDto);

        return Ok(product);
    }
}
