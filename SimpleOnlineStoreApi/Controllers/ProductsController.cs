using Microsoft.AspNetCore.Mvc;

namespace SimpleOnlineStoreApi.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    [HttpGet(Name = "GetWeatherForecast")]
    public ActionResult<string> Get()
    {
        return Ok("Hello, World!");
    }
}
