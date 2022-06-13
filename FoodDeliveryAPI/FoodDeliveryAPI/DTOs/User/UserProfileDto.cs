using System;
namespace FoodDeliveryAPI.DTOs
{
	public class UserProfileDto
	{

        public string Username { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Date { get; set; }
        public string Verified { get; set; }

        public UserProfileDto()
		{
		}
	}
}

