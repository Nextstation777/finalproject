using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace React.Models
{
    public class OrderUpdateDto
    {
        [Key]
        public string Status { get; set; }
    }
}
