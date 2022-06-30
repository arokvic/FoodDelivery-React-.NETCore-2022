using System;
namespace FoodDeliveryAPI.DTOs.Order
{
	public class OrderItemDto
	{
		public int Id { get; set; }
		public double Price { get; set; }
		public string Name { get; set; }
		public string Ingredients { get; set; }
		public int Amount { get; set; }
		

		public OrderItemDto()
		{
		}
	}
}

