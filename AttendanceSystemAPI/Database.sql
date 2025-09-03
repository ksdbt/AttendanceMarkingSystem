-- SQL Server schema for Attendance System

IF OBJECT_ID('dbo.Attendance', 'U') IS NOT NULL DROP TABLE dbo.Attendance;
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL DROP TABLE dbo.Users;
GO

CREATE TABLE dbo.Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(200) NOT NULL,
    Role NVARCHAR(20) NOT NULL DEFAULT 'Employee',
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE dbo.Attendance (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    [Type] NVARCHAR(10) NOT NULL, -- 'IN' or 'OUT'
    [Timestamp] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Attendance_Users_UserId FOREIGN KEY (UserId)
        REFERENCES dbo.Users (Id) ON DELETE CASCADE
);
GO

-- Seed an admin user placeholder (set hash later via app)
-- INSERT INTO dbo.Users (FullName, Email, PasswordHash, Role)
-- VALUES ('Admin', 'admin@example.com', '<BCryptHash>', 'Admin');

