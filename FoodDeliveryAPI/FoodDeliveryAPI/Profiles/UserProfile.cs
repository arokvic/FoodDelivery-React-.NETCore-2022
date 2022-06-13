using System;
using AutoMapper;
using FoodDeliveryAPI.DTOs;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<LoginDto, User>().ReverseMap();

            CreateMap<RegisterDto, User>().ReverseMap();

            CreateMap<UserProfileDto, User>().ReverseMap();
        }
    }
}
