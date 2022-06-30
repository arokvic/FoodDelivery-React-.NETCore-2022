using System;
using System.Collections.Generic;
using System.Linq;
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

        public void ChangeOrderState(string state, int id)
        {
            Order order = _context.Orders.Where(i => i.Id == id).FirstOrDefault();
            order.OrderState = state;
            _context.Orders.Update(order);
            _context.SaveChanges();
        }

        public Order GetById(int id)
        {
            return _context.Orders.Where(i => i.Id == id).FirstOrDefault();
        }

        public List<Order> GetCompletedOrdersByUser(string username)
        {          
            return _context.Users.Where(i => i.Username == username).FirstOrDefault().
                ConsumerOrders.Where(i => i.OrderState == OrderState.FINISHED.ToString()).ToList();
        }

        public List<Order> GetFinishedAndInProgress()
        {
            return _context.Orders.Where(i => i.OrderState == OrderState.IN_PROGRESS.ToString() || i.OrderState == OrderState.FINISHED.ToString()).ToList();
        }

        public List<Order> GetPendingOrders()
        {
            return _context.Orders.Where(i => i.OrderState == OrderState.PENDING.ToString()).ToList();
        }


        public void MakeOrder(Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
        }

        public void UpdateOrder(Order order)
        {
            _context.Orders.Update(order);
            _context.SaveChanges();
        }

        //public List<Order> GetInProgressOrders()
        //{
        //    return _context.Orders.Where(i => i.OrderState == OrderState.IN_PROGRESS.ToString()).ToList();
        //}
    }
}

