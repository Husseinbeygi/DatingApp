using DatingSite.API.Models;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace DatingSite.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        public DbSet<Value> Value { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}