using AutoMapper;
using SimpleOnlineStoreApi.Entities.DTO;
using SimpleOnlineStoreApi.Entities.Models;

namespace SimpleOnlineStoreApi.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateProductDto, Product>();
        CreateMap<UpdateProductDto, Product>().ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
    }
}
