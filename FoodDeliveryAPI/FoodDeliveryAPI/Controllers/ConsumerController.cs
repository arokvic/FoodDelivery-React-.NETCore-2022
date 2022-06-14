using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FoodDeliveryAPI.DTOs.Cart;
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

        private readonly ICartRepository _cartRepository;

        private readonly IUserRepository _userRepository;

        private readonly IOrderRepository _orderRepository;

        private readonly IMapper _mapper;

        public ConsumerController(DeliveryContext context, IProductRepository productRepository, ICartRepository cartRepository, IUserRepository userRepository,IMapper mapper, IOrderRepository orderRepository)
        {
            _context = context;
            _productRepository = productRepository;
            _cartRepository = cartRepository;
            _userRepository = userRepository;
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        [HttpGet("GetProducts")]
        public IActionResult GetProducts()
        {
            return Ok(_productRepository.GetProducts());
        }

        [HttpPost("AddCartitem")]
        public IActionResult AddCartItem([FromBody] CartItemDto cartItemDto)
        {
            var productTemp = _productRepository.GetById(cartItemDto.ProductId);
            CartItem carItem = new CartItem();
            carItem.Product = productTemp;
            //carItem.Amount = cartItemDto.Amount;

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

            User user = _userRepository.GetByUsername(username);

            var cartItemTemp = user.UserCart.CartItems.FirstOrDefault(i => i.Product?.Id.ToString() == cartItemDto.ProductId);
            if (cartItemTemp == null)
            {
                carItem.Amount = 1;
                user.UserCart.CartItems.Add(carItem);
            }
            else
            {
                user.UserCart.CartItems.FirstOrDefault(i => i.Id == cartItemTemp.Id).Amount += 1;
            }


            _userRepository.UpdateUser(user);

            return Ok("Dodat item u cart");
        }

        [HttpGet("GetCartItems")]
        public IActionResult GetCartItems()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

            User user = _userRepository.GetByUsername(username);

            return Ok(_cartRepository.GetCartItems(user.UserCart.Id.ToString()));
        }

        [HttpPost("DeleteCartItem")]
        public IActionResult DeleteCartItem([FromBody] DeleteCartItemDto deleteCartItemDto)
        {  
           _cartRepository.DeleteCartItem(deleteCartItemDto.CartItemId);

            return Ok("obrisan");
        }

        [HttpPost("PlaceOrder")]
        public IActionResult PlaceOrder([FromBody] PlaceOrderDto placeOrderDto)
        {
            Order newOrder = _mapper.Map<Order>(placeOrderDto);


            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userClaims = identity.Claims;
            string username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

            User user = _userRepository.GetByUsername(username);

            if(newOrder.Products == null)
            {
                newOrder.Products = new List<OrderItem>();
            }

            if(user.Orders == null)
            {
                user.Orders = new List<Order>();
            }

            List<SaveOrderItemDto> temp = _mapper.Map<List<SaveOrderItemDto>>(user.UserCart.CartItems);

            newOrder.Products.AddRange(_mapper.Map<List<OrderItem>>(temp));

            double sum = 0;
            foreach(var item in newOrder.Products)
            {
                sum += item.Amount * item.Product.Price;
            }

            newOrder.TotalPrice = sum;
            newOrder.OrderState = "PENDING";

            _orderRepository.MakeOrder(newOrder);

            user.Orders.Add(newOrder);

            user.UserCart.CartItems.Clear();

            _userRepository.UpdateUser(user);

            return Ok("order placed");
        }
       
    }
}
