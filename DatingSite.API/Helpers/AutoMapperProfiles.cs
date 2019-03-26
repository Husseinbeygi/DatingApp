using System.Linq;
using AutoMapper;
using DatingSite.API.DTOS;
using DatingSite.API.Models;

namespace DatingSite.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForList>()
            .ForMember(dest => dest.Photourl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);

            })
            .ForMember(dest => dest.Age, opt =>
            {
                opt.MapFrom(d => d.DateofBirth.AgeClac());
            });
            CreateMap<User, UserForDetailed>()
            .ForMember(dest => dest.photourl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);

            })
            .ForMember(dest => dest.Age, opt =>
            {
                opt.MapFrom(d => d.DateofBirth.AgeClac());
            });
            CreateMap<Photo, PhotosForDetailedDTO>();
            CreateMap<UserForUpdateDto, User>();


        }
    }
}