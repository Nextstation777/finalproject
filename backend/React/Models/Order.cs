using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace React.Models
{
    public class Order // เปลี่ยนชื่อคลาส Oder เป็น Order
    {
        [Key]
        public int OrderId { get; set; } // เปลี่ยนชื่อฟิลด์ OderId เป็น OrderId

        public string? Cep { get; set; }

        public string? Street { get; set; }

        public string? District { get; set; }

        public string? City { get; set; }

        public string? Uf { get; set; }

        public int formattedCartTotal { get; set; }

        public ICollection<Product> Products { get; set; }
        public string? Code { get; set; }
        public string? Status { get; set; }
    }
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        public int Id { get; set; }

        public int Quantity { get; set; }

        public int OrderId { get; set; }

    
    }
}
