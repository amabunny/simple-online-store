using SimpleOnlineStoreApi.Services;

namespace SimpleOnlineStoreApi.Extensions;

public static class ServiceExtensions
{
    public static void ConfigureCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy",
                builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
        });
    }

    public static void RegisterServices(this IServiceCollection services)
    {
        services.AddScoped<ProductsService>();
    }
}
