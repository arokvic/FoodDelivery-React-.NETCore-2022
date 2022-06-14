using System;
using System.Collections.Generic;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
	public interface ICartRepository
	{
		List<CartItem> GetCartItems(string cartId);

		void DeleteCartItem(int cartItemId);

		
	}
}

