using System;
using System.Collections.Generic;
using System.Linq;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
	public class ProductRepository : IProductRepository
	{


        private readonly DeliveryContext _context;

        public ProductRepository(DeliveryContext context)
        {
            _context = context;
        }

        public void AddProduct(Product product)
        {
            _context.Add(product);
            _context.SaveChanges();
        }

        public void DeleteProduct(string id)
        {
            var prod = _context.Products.Where(i => i.Id.ToString() == id).FirstOrDefault();
            _context.Products.Remove(prod);
            _context.SaveChanges();
        }

        public void EditProduct(Product product)
        {
            _context.Update(product);
            _context.SaveChanges();
        }

        public Product GetById(string id)
        {
            return _context.Products.Where(i => i.Id.ToString() == id).FirstOrDefault();
        }

        public List<Product> GetProducts()
        {
            return _context.Products.ToList();
        }
    }
}

