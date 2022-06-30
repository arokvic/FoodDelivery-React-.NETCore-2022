using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Newtonsoft.Json.Converters;

namespace FoodDeliveryAPI.Models
{
    public enum UserState
    {
        CONFIRMED,
        DECLINED,
        PENDING
    }

    public enum UserType
    {
        ADMIN,
        CONSUMER,
        DELIVERER
    };

    public class User
    {

        [Key]
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Date { get; set; }
        public string Role { get; set; }
        public string Picture { get; set; }
        private List<Order> consumerOrders;
        private List<Order> delivererOrders;
        public string Verified { get; set; }
        public ILazyLoader LazyLoader{get;set;}

        public List<Order> ConsumerOrders { get => LazyLoader.Load(this,ref consumerOrders); set => consumerOrders = value; }

        public List<Order> DelivererOrders { get => LazyLoader.Load(this, ref delivererOrders); set => delivererOrders = value; }

        public User()
        {
        }
    }
}
