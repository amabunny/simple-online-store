namespace SimpleOnlineStoreApi.Entities.DTO;

public record UpdateProductDto(
    string? Brand,
    string? Name,
    decimal? Price,
    string? Description,
    bool? IsNew);
