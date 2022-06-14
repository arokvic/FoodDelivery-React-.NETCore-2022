using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodDeliveryAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodDeliveryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DelivererController : ControllerBase
    {
        private readonly DeliveryContext _context;

        private readonly IOrderRepository _orderRepository;

        public DelivererController(DeliveryContext deliveryContext, IOrderRepository orderRepository)
        {
            _context = deliveryContext;
            _orderRepository = orderRepository;
        }
    }
}
