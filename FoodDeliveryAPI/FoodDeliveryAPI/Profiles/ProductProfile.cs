using System;
using AutoMapper;
using FoodDeliveryAPI.DTOs.Product;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Profiles
{
	public class ProductProfile : Profile
	{
		public ProductProfile()
		{
			CreateMap<ProductDto, Product>().ReverseMap();
		}
	}
}

