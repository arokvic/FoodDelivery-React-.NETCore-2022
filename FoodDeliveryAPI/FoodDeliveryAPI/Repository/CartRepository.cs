using System;
using System.Collections.Generic;
using System.Linq;
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

        public void DeleteCartItem( int cartItemId)
        {
            var cartItem = _context.CartItems.Where(i => i.Id == cartItemId).FirstOrDefault();
            _context.CartItems.Remove(cartItem);
            _context.SaveChanges();
        }

       

        public List<CartItem> GetCartItems(string cartId)
        {
            return _context.Cart.Where(i => i.Id.ToString() == cartId).FirstOrDefault().CartItems.ToList();
        }

       

    }
}

