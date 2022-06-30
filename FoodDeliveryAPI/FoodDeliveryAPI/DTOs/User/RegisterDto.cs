using System;
using Microsoft.AspNetCore.Http;

namespace FoodDeliveryAPI.DTOs
{
    public class RegisterDto
    {
      
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
        public IFormFile ProfileImage { get; set; }

        public RegisterDto()
        {
        }
    }
}
