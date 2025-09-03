using AttendanceSystemAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AttendanceSystemAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
    }
}

