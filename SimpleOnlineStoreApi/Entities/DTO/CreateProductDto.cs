namespace SimpleOnlineStoreApi.Entities.DTO;

public record CreateProductDto(
    string Brand,
    string Name,
    decimal Price,
    bool IsNew,
    string Description);
