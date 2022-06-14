using System;
using AutoMapper;
using FoodDeliveryAPI.DTOs.Order;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Profiles
{
	public class OrderProfile : Profile
	{
		public OrderProfile()
		{
			CreateMap<PlaceOrderDto, Order>().ReverseMap();

			CreateMap<CartItem, SaveOrderItemDto>().ReverseMap();

			CreateMap<SaveOrderItemDto, OrderItem>().ReverseMap();
		}
	}
}

