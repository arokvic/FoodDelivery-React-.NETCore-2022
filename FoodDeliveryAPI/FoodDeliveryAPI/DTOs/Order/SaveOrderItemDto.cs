using System;
namespace FoodDeliveryAPI.DTOs.Order
{
	public class SaveOrderItemDto
	{
		public Models.Product product;
		public int Amount { get; set; }

		public SaveOrderItemDto()
		{
		}
	}
}

