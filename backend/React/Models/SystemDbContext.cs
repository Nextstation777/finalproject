using Microsoft.EntityFrameworkCore;

namespace React.Models
{
    public class SystemDbContext : DbContext
    {
        public SystemDbContext(DbContextOptions<SystemDbContext> options) : base(options)
        {
        }

        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Stock> Stocks { get; set; }

        

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=DESKTOP-H5KEM5M; Initial Catalog=lbs; User ID=sa; password=123; TrustServerCertificate= True");
        }
    }
}
