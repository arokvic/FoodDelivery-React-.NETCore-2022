using System;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace FoodDeliveryAPI.Models
{
	public class CartItem
	{
		public int Id { get; set; }
		private Product product;
		public int Amount { get; set; }

		public ILazyLoader LazyLoader { get; set; }

		public Product Product { get => LazyLoader.Load(this, ref product); set => product = value; }

		public CartItem()
		{
		}
	}
}

