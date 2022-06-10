using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodDeliveryAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryAPI.Controllers
{
    [Route("api/Register")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly DeliveryContext _context;

        public RegisterController(DeliveryContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Consumes("application/json")]
        [Produces("application/json")]
        public async Task<ActionResult> RegisterUser([FromBody] User user)
        {
           if(UserExists(user.Username))
           {
                //return new JsonResult(new { message = "Vec postoji" })
                //{
                //    StatusCode = StatusCodes.Status400BadRequest
                //};
                //return NotFound()
                return BadRequest(new { mess = "vec postoji" });
                //return StatusCode(400, "vec postoji");
                
                    
           }

           
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { mess = "napravljen" });

            //return CreatedAtAction("GetUser", new { id = user.Username }, user);
        }


        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Username == id);
        }


        //// GET: api/Register
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/Register/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/Register
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/Register/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/Register/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
