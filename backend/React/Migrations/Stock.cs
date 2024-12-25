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
    public class StockController : Controller
    {
        private readonly SystemDbContext _dbContext;

        public StockController(SystemDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("Stock")]
        public async Task<IEnumerable<Stock>> Stocks()
        {
            var stocks = await _dbContext.Stocks
                                         .ToListAsync();

            return stocks;
        }


        [HttpPost]
        [Route("Stock")]
        public async Task<IActionResult> Stock(Stock stockData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }            
            var stock = new Stock
            {
                Id = stockData.Id,
                Amount = stockData.Amount,             
            };

            _dbContext.Stocks.Add(stock);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }
        [HttpPut]
        [Route("StockEdit")]
        public async Task<IActionResult> UpdateAmount(int id, [FromBody] int newAmount)
        {
            var stock = await _dbContext.Stocks.FindAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            stock.Amount = newAmount;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_dbContext.Stocks.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

    }
}
