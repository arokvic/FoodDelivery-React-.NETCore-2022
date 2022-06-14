using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Infrastructure;

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
        private List<OrderItem> products;
        public string OrderAddress { get; set; }
        public string Comment { get; set; }
        public double TotalPrice { get; set; }
        public string OrderState { get; set; }
        public int DeliveryTime { get; set; }
        public ILazyLoader LazyLoader { get; set; }

        public List<OrderItem> Products { get => LazyLoader.Load(this, ref products); set => products = value; }


        public Order()
        {
        }
    }
}
