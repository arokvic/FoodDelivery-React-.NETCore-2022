using System;
using System.Collections.Generic;

namespace FoodDeliveryAPI.Models
{
	public class Cart
	{
		public int Id { get; set; }
		public List<CartItem> CartItems { get; set; }
		public int TotalPrice { get; set; }

		public Cart()
		{
		}
	}
}

