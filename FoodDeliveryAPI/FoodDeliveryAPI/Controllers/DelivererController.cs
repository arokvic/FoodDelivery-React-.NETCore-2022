using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using FoodDeliveryAPI.DTOs.Order;
using FoodDeliveryAPI.Models;
using FoodDeliveryAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryAPI.Controllers
{
    [Route("api/Deliverer")]
    [ApiController]
    public class DelivererController : ControllerBase
    {
        
        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;
        private readonly DeliveryContext _context;

        public DelivererController(IOrderRepository orderRepository, IUserRepository userRepository, DeliveryContext deliveryContext)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
            _context = deliveryContext;
        }

        [HttpGet("GetPendingOrders")]
        public IActionResult GetPendingOrders()
        {
            return Ok(_orderRepository.GetPendingOrders());
        }

        [HttpPost("AcceptOrder/{id}")]
        public IActionResult AcceptOrder(string id)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;


            User user = _userRepository.GetByUsername(username);

            Order o = user.DelivererOrders.Find(i => i.OrderState == "IN_PROGRESS");
            if(o != null)
            {
                return BadRequest("Already in progress");
            }
          
            
            Order order = _orderRepository.GetById(Int32.Parse(id));


            Random rnd = new Random();
            string dt = DateTime.Now.ToString("H:mm");
            string[] dtArr = dt.Split(":");
            int deliveryTime = rnd.Next(2, 4);
            int dtMinNum = Int32.Parse(dtArr[1]) + deliveryTime;
            if(dtMinNum < 10)
            {
                order.DeliveryTime = dtArr[0] + ":"+"0"+dtMinNum;
            }
            else if(dtMinNum >= 60)
            {
                order.DeliveryTime = (Int32.Parse(dtArr[0]) + 1).ToString() + ":03";
            }
            else
            {
                order.DeliveryTime = dtArr[0] + ":" + dtMinNum;
            }
           
            order.OrderState = "IN_PROGRESS";

            
            user.DelivererOrders.Add(order);

            _userRepository.UpdateUser(user);



            //_orderRepository.ChangeOrderState(orderStateDto.State, orderStateDto.Id);
            return Ok(order.DeliveryTime);
        }

        [HttpPost("FinishOrder/{id}")]
        public IActionResult FinishOrder(string id)
        {
            Order order = _orderRepository.GetById(Int32.Parse(id));
            order.OrderState = "FINISHED";
            _orderRepository.UpdateOrder(order);
            return Ok();
        }

        [HttpGet("GetFinishedOrders")]
        public IActionResult GetFinishedOrders()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;


            User user = _userRepository.GetByUsername(username);

            return Ok(user.DelivererOrders.Where(i => i.OrderState == OrderState.FINISHED.ToString()));

        }

        [HttpGet("GetOrderById/{id}")]
        public IActionResult GetOrderById(string id)
        {
            return Ok(_orderRepository.GetById(Int32.Parse(id)));
        }


        [HttpGet("GetInProgressOrder")]
        public IActionResult GetInProgressOrder()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;


            User user = _userRepository.GetByUsername(username);

            Order o = user.DelivererOrders.Where(i => i.OrderState == OrderState.IN_PROGRESS.ToString()).FirstOrDefault();

            return Ok(o);

        }

        //private void ChangeOrderState(string id, int sleepTime)
        //{
        //    //Thread.Sleep(sleepTime);
        //    //using(DeliveryContext _context)
        //    //{
        //    //    _context.Orders.Where(i => i.Id.ToString() == id).FirstOrDefault();
        //    //    _context.SaveChanges();
        //    //}
        //    Order order = _orderRepository.GetById(Int32.Parse(id));
        //    order.OrderState = "FINISHED";
        //    _orderRepository.UpdateOrder(order);
        //    //Order order = _orderRepository.GetById(Int32.Parse((string)id));

        //    //_orderRepository.UpdateOrder(order);

        //}




    }
}
