using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Newtonsoft.Json.Converters;

namespace FoodDeliveryAPI.Models
{
    //public enum UserType
    //{
    //    ADMIN,
    //    CONSUMER,
    //    DELIVERER
    //}

    public class User
    {

        [Key]
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Date { get; set; }
        //[JsonConverter(typeof(StringEnumConverter))]
        public string UserType { get; set; }
        public byte[] Picture { get; set; }
        public List<Order> Orders { get; set; }

        public User()
        {
        }
    }
}
