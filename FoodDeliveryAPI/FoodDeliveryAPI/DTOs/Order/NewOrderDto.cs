using System;
using System.Collections.Generic;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.DTOs.Order
{
	public class NewOrderDto
	{
		public List<OrderItemDto> Products { get; set; }
		public string OrderAddress { get; set; }
		public string Comment { get; set; }
		public double TotalPrice { get; set; }

		public NewOrderDto()
		{
		}
	}
}

