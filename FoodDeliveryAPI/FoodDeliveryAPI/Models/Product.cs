using System;
using System.Collections.Generic;

namespace FoodDeliveryAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public string Name { get; set; }
        public List<Ingredient> Ingredients { get; set; }

        public Product()
        {
        }
    }
}
