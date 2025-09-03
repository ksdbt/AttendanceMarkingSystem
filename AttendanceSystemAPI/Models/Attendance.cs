using System;

namespace AttendanceSystemAPI.Models
{
    public class Attendance
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Type { get; set; } = string.Empty; // "IN" or "OUT"
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        public User User { get; set; }
    }
}

