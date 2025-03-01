using System;
using System.ComponentModel.DataAnnotations;

namespace App.Models;

public class Blog
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Content { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string? Category { get; set; }
    public string? Avatar { get; set; }
}
