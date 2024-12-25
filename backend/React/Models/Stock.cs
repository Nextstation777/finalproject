using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace React.Models
{
    public class Stock 
    {
        [Key]
        public int StockId { get; set; } 

        public int Id { get; set; }

        public int Amount { get; set; }
    
    }
}
