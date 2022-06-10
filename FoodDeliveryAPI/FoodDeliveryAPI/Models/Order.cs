using System;
using System.Collections.Generic;

namespace FoodDeliveryAPI.Models
{
    public class Order
    {

        public int Id { get; set; }
        public List<OrderItem> products { get; set; }
        public string OrderAddress { get; set; }
        public string Comment { get; set; }
        public double TotalPrice { get; set; }
        public bool Pending { get; set; }
        public int DeliveryTime { get; set; }




        public Order()
        {
        }
    }
}
