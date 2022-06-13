using System;
using System.Collections.Generic;

namespace FoodDeliveryAPI.Models
{
    public enum OrderState
    {
        PENDING,
        IN_PROGRESS,
        FINISHED,
        IN_MAKING
    }


    public class Order
    {

        public int Id { get; set; }
        public List<OrderItem> products { get; set; }
        public string OrderAddress { get; set; }
        public string Comment { get; set; }
        public double TotalPrice { get; set; }
        public string Pending { get; set; }
        public int DeliveryTime { get; set; }




        public Order()
        {
        }
    }
}
