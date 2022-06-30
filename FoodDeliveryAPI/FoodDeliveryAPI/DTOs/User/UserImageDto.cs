using System;
using Microsoft.AspNetCore.Http;

namespace FoodDeliveryAPI.DTOs.User
{
	public class UserImageDto
	{
		public IFormFile UserImage { get; set; }
		public string Username { get; set; }

		public UserImageDto()
		{
		}
	}
}

