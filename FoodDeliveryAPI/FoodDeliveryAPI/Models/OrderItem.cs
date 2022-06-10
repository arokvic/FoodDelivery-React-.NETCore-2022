using System;
namespace FoodDeliveryAPI.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public Product Product { get; set; }
        public int Amount { get; set; }

        public OrderItem()
        {
        }
    }
}
