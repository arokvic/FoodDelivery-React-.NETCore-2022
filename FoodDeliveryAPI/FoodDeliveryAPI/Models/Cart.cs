using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace FoodDeliveryAPI.Models
{
	public class Cart
	{
		public int Id { get; set; }
		private List<CartItem> cartItems;
		public int TotalPrice { get; set; }
		public ILazyLoader LazyLoader { get; set; }

		public List<CartItem> CartItems { get => LazyLoader.Load(this, ref cartItems); set => cartItems = value; }

		public Cart()
		{
		}
	}
}

