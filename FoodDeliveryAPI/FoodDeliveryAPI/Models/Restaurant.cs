using System;
using System.Collections.Generic;

namespace FoodDeliveryAPI.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Product> RestaurantProducts { get; set; }
        public string Address { get; set; }

        public Restaurant()
        {
        }
    }
}
