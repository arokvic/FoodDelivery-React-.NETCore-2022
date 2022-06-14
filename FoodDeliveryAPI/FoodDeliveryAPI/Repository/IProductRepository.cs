using System;
using System.Collections.Generic;
using FoodDeliveryAPI.Models;

namespace FoodDeliveryAPI.Repository
{
	public interface IProductRepository
	{
		void AddProduct(Product product);

		void DeleteProduct(string id);

		void EditProduct(Product product);

		public List<Product> GetProducts();

		Product GetById(string id);

	}
}

