using FoodDeliveryAPI.Models;
using System.Collections.Generic;

namespace FoodDeliveryAPI.Repository
{
    public interface IOrderRepository
	{


		void MakeOrder(Order order);

		List<Order> GetPendingOrders();

		List<Order> GetCompletedOrdersByUser(string username);

		List<Order> GetFinishedAndInProgress();

		void ChangeOrderState(string state, int id);

		void UpdateOrder(Order order);

		Order GetById(int id);

		
	}
}

