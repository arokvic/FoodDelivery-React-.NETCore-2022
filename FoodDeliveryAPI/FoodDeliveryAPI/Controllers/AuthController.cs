using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FoodDeliveryAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace FoodDeliveryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DeliveryContext _context;

        public AuthController(DeliveryContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Route("Register")]
        //[Consumes("application/json")]
        //[Produces("application/json")]
        public async Task<ActionResult> RegisterUser([FromBody] User user)
        {
            if (UserExists(user.Username))
            {

                return BadRequest(new { mess = "vec postoji" });
            }

            user.Verified = "PENDING";
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { mess = "napravljen" });

        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            User userTemp = _context.Users.Where(b => b.Username == userLogin.Username && b.Password == userLogin.Password).FirstOrDefault();
            if(userTemp == null)
            {
                return NotFound("User not found");
            }

            var token = GenerateToken(userTemp);
            return Ok(token);
        }


        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Username == id);
        }

        private string GenerateToken(User user)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secretKeysdfsdfsdf"));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Role, user.Role),
                        new Claim(ClaimTypes.Name, user.Username)
                    };

            var token = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: signingCredentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
