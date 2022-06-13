using System;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
	public class CartRepository : ICartRepository
	{
        private readonly DeliveryContext _context;

        public CartRepository(DeliveryContext context)
        {
            _context = context;
        }

        public void Add(Cart cart)
        {
             _context.Add(cart);
            _context.SaveChanges();
        }
    }
}

