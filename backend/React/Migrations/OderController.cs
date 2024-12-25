using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React.Models;
using System;
using System.Linq;
using System.Net;

namespace React.Migrations
{
    [Route("")]
    [ApiController]
    public class OderController : Controller
    {
        private readonly SystemDbContext _dbContext;

        public OderController(SystemDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("Oders")]
        public async Task<IEnumerable<Order>> Oders()
        {
            var orders = await _dbContext.Orders
                                         .Include(o => o.Products) // รวมข้อมูลสินค้า
                                         .ToListAsync();

            return orders;
        }

        [HttpGet]
        [Route("OrdersByCode")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByCode([FromQuery] string code)
        {
            if (string.IsNullOrEmpty(code))
            {
                return BadRequest("Code is required.");
            }

            var orders = await _dbContext.Orders
                                         .Include(o => o.Products) // รวมข้อมูลสินค้า
                                         .Where(o => o.Code == code)
                                         .ToListAsync();

            if (orders == null || !orders.Any())
            {
                return NotFound();
            }

            return Ok(orders);
        }

        [HttpPost]
        [Route("Oder")]
        public async Task<IActionResult> Oder(Order orderData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var random = new Random();
            var code = new string(Enumerable.Range(0, 5).Select(_ => (char)('0' + random.Next(10))).ToArray());
            var order = new Order
            {
                Cep = orderData.Cep,
                Street = orderData.Street,
                District = orderData.District,
                City = orderData.City,
                Uf = orderData.Uf,
                formattedCartTotal = orderData.formattedCartTotal,
                Products = new List<Product>(),
                Code = code,
                Status = "1"
            };

            // เพิ่มข้อมูลสินค้าลงในรายการสั่งซื้อ
            foreach (var productData in orderData.Products)
            {
                order.Products.Add(new Product
                {
                    Id = productData.Id,
                    Quantity = productData.Quantity
                });
            }

            _dbContext.Orders.Add(order);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("Products")]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            // ดึงข้อมูลสินค้าทั้งหมดจากฐานข้อมูล
            var products = await _dbContext.Product.ToListAsync();

            return products;
        }
        
        [HttpPatch]
        [Route("UpdateOrder/{id}")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] OrderUpdateDto orderUpdateDto)
        {
            if (orderUpdateDto == null)
            {
                return BadRequest();
            }

            var order = await _dbContext.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            order.Status = orderUpdateDto.Status;

            await _dbContext.SaveChangesAsync();

            return Ok();
        }




    }
}
