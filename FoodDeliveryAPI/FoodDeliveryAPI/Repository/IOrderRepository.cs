using System;
using System.Collections.Generic;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
	public interface IOrderRepository
	{


		void MakeOrder(Order order);

		List<Order> GetPendingOrders();

	}
}

