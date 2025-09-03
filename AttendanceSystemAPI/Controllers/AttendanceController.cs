using AttendanceSystemAPI.Data;
using AttendanceSystemAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AttendanceSystemAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AttendanceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AttendanceController(ApplicationDbContext context)
        {
            _context = context;
        }

        public record MarkAttendanceDto(string Type);

        [HttpPost("mark")]
        public async Task<IActionResult> MarkAttendance(MarkAttendanceDto dto)
        {
            if (dto.Type != "IN" && dto.Type != "OUT")
                return BadRequest("Type must be 'IN' or 'OUT'");

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var attendance = new Attendance
            {
                UserId = userId,
                Type = dto.Type,
                Timestamp = DateTime.UtcNow
            };

            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Attendance marked: {dto.Type}", timestamp = attendance.Timestamp });
        }

        [HttpGet("mine")]
        public async Task<IActionResult> GetMyAttendance([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var query = _context.Attendances.Where(a => a.UserId == userId).AsQueryable();
            if (from.HasValue) query = query.Where(a => a.Timestamp >= from.Value);
            if (to.HasValue) query = query.Where(a => a.Timestamp <= to.Value);

            var records = await query.OrderByDescending(a => a.Timestamp)
                .Select(a => new { a.Type, a.Timestamp })
                .ToListAsync();

            return Ok(records);
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllAttendance([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var query = _context.Attendances.Include(a => a.User).AsQueryable();
            if (from.HasValue) query = query.Where(a => a.Timestamp >= from.Value);
            if (to.HasValue) query = query.Where(a => a.Timestamp <= to.Value);

            var records = await query.OrderByDescending(a => a.Timestamp)
                .Select(a => new { a.Type, a.Timestamp, FullName = a.User.FullName, Email = a.User.Email })
                .ToListAsync();

            return Ok(records);
        }
    }
}

