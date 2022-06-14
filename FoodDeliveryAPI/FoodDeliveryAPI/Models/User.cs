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
        //[DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Date { get; set; }
        public string Role { get; set; }
        public byte[] Picture { get; set; }
        public List<Order> Orders { get; set; }
        private Cart userCart;
        public string Verified { get; set; }
        public ILazyLoader LazyLoader{get;set;}

        public Cart UserCart { get => LazyLoader.Load(this, ref userCart); set => userCart = value; }

        public User()
        {
        }
    }
}
