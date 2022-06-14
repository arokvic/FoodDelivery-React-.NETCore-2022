using System;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
	public class OrderRepository : IOrderRepository
	{
        private readonly DeliveryContext _context;

        public OrderRepository(DeliveryContext context)
        {
            _context = context;
        }

      

        public void MakeOrder(Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
        }

        
    }
}

