using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using FoodDeliveryAPI.DTOs;
using FoodDeliveryAPI.DTOs.User;
using FoodDeliveryAPI.Helpers;
using FoodDeliveryAPI.Models;
using FoodDeliveryAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace FoodDeliveryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostingEnvironment;


        public AuthController(IUserRepository userRepository, JwtService jwtService, IMapper mapper, IWebHostEnvironment hostingEnvironment)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
            _mapper = mapper;
            _hostingEnvironment = hostingEnvironment;
        }


        [HttpPost]
        [Route("Register")]
        //[Consumes("application/json")]
        //[Produces("application/json")]
        public IActionResult RegisterUser([FromBody] RegisterDto dtoUser)
        {
            //var file = HttpContext.Request.Form.Files;

            if (_userRepository.UserExists(dtoUser.Username))
            {

                return BadRequest(new { mess = "vec postoji" });
            }

            
            User newUser = _mapper.Map<User>(dtoUser);

           

            if (newUser.Role == UserType.DELIVERER.ToString())
            {
                newUser.Verified = UserState.PENDING.ToString();
            }
            else
            {
                newUser.Verified = UserState.CONFIRMED.ToString();
            }

            newUser.DelivererOrders = new List<Order>();
            newUser.ConsumerOrders = new List<Order>();

             _userRepository.AddUser(newUser);

            return Ok("napravljen");

        }

        
        [HttpPost("LoginWithFb")]
        public IActionResult LoginWithFb(FbLoginDto fbLoginDto)
        {
            User u = new User();
            u.Username = fbLoginDto.Name;
            u.Email = fbLoginDto.Email;
            u.Role = UserType.CONSUMER.ToString();
            u.Verified = UserState.CONFIRMED.ToString();
            u.DelivererOrders = new List<Order>();
            u.ConsumerOrders = new List<Order>();

            _userRepository.AddUser(u);

            var token = _jwtService.GenerateToken(u);

            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(token); 
        }


        [HttpPost]
        [Route("Login")]       
        public IActionResult Login([FromBody] LoginDto userLogin)
        {
            

            User userTemp = _userRepository.GetByUsername(userLogin.Username);
            if(userTemp == null)
            {
                return NotFound("User not found");
            }

            if(userTemp.Password != userLogin.Password)
            {
                return NotFound("Wrong password");
            }

           if(userTemp.Verified == UserState.PENDING.ToString() || userTemp.Verified == UserState.DECLINED.ToString())
            {
                return NotFound("Not verified");
            }

                var token = _jwtService.GenerateToken(userTemp);

            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true
            });
             
            return Ok(new {token=token , role=userTemp.Role}); ;
        }


        [HttpPost]
        [Route("UploadImage")]
        public IActionResult UploadImage([FromForm] UserImageDto userImageDto)
        {

            var file = Request.Form.Files[0];

            string folderName = "Images";
            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            string path = Path.Combine(folderPath, file.FileName);

            using (FileStream fs = System.IO.File.Create(path))
            {
                file.CopyTo(fs);
                
            }

            User user = _userRepository.GetByUsername(userImageDto.Username);
            user.Picture = file.FileName;
            _userRepository.UpdateUser(user);

            return Ok("User created");




        }

        [HttpGet]
        [Route("GetImg")]
        public IActionResult GetImg([FromForm] UserImageDto userImageDto)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

            User user = _userRepository.GetByUsername(username);

            string folderName = "Images";
            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            string path = Path.Combine(folderPath, user.Picture);

                     
            var image = System.IO.File.OpenRead(path);
            return File(image, "image/jpeg");
    }

        [HttpGet("GetUserProfile")]
        //[Authorize(Roles = "DELIVERER")]
        public IActionResult GetUserProfile()
        {
            
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

            User user = _userRepository.GetByUsername(username);

            return Ok(_mapper.Map<UserProfileDto>(user));
        }

        [HttpPut("UpdateUserProfile")]
        public IActionResult UpdateUserProfile([FromBody] UserProfileDto userProfileDto)
        {

            User user = _mapper.Map<User>(userProfileDto);
            _userRepository.UpdateUser(user);
    
            return Ok("updated");
        }








    }
}
