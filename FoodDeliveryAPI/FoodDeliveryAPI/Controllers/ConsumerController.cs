using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;

using FoodDeliveryAPI.DTOs.Order;
using FoodDeliveryAPI.Models;
using FoodDeliveryAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryAPI.Controllers
{
    [Route("api/Consumer")]
    [ApiController]
    public class ConsumerController : ControllerBase
    {
        private readonly DeliveryContext _context;

        private readonly IProductRepository _productRepository;

       
        private readonly IUserRepository _userRepository;

        private readonly IOrderRepository _orderRepository;

        private readonly IMapper _mapper;

        public ConsumerController(DeliveryContext context, IProductRepository productRepository,  IUserRepository userRepository,IMapper mapper, IOrderRepository orderRepository)
        {
            _context = context;
            _productRepository = productRepository;
            _userRepository = userRepository;
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        [HttpGet("GetProducts")]
        public IActionResult GetProducts()
        {
            return Ok(_productRepository.GetProducts());
        }

      
        [HttpPost("PlaceOrder")]
        public IActionResult PlaceOrder([FromBody] NewOrderDto newOrderDto)
        {

            List<Product> orderProducts = _mapper.Map<List<Product>>(newOrderDto.Products);
            Order newOrder = new Order();
            newOrder.Products = new List<OrderItem>();
            foreach (var item in newOrderDto.Products)
            {             
                OrderItem orderItem = new OrderItem();
                orderItem.Product = _mapper.Map<Product>(item);
                orderItem.Amount = item.Amount;
                newOrder.Products.Add(orderItem);
            }

            newOrder.TotalPrice = newOrderDto.TotalPrice + 5;
            newOrder.OrderState = "PENDING";
            newOrder.OrderAddress = newOrderDto.OrderAddress;
            newOrder.Comment = newOrderDto.Comment;

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

            User user = _userRepository.GetByUsername(username);

            if(user.ConsumerOrders == null)
            {
                user.ConsumerOrders = new List<Order>();
            }

            user.ConsumerOrders.Add(newOrder);

            _userRepository.UpdateUser(user);

            return Ok("order placed");
        }


        [HttpGet("GetCompletedOrdersByUser")]
        public IActionResult GetCompletedOrdersByUser()
        {

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;


            return Ok(_orderRepository.GetCompletedOrdersByUser(username));
        }

        [HttpGet("GetOrdersInProgress")]
        public IActionResult GetOrersInProgress()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

            User user = _userRepository.GetByUsername(username);

            return Ok(user.ConsumerOrders.Where(i => i.OrderState == OrderState.IN_PROGRESS.ToString()));
        }

        [HttpGet("GetOrderById/{id}")]
        public IActionResult GetOrderById(string id)
        {                
            return Ok(_orderRepository.GetById(Int32.Parse(id)));
        }


    }
}
