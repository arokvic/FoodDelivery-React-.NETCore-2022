using System;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
	public interface IOrderRepository
	{
		void Add(Order order);
	}
}

