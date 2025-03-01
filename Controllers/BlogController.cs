using Microsoft.AspNetCore.Mvc;
using App.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace App.Controllers;


[Route("api/[controller]")]
[ApiController]
public class BlogController : ControllerBase
{
    private readonly AppDbContext _context;

    public BlogController(AppDbContext context)
    {
        _context = context;
    }

    // [HttpGet]
    // public async Task<ActionResult<IEnumerable<Blog>>> GetBlogs()
    // {
    //     return await _context.Blogs.ToListAsync();
    // }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetBlogById(int id)
    {
        var blog = await _context.Blogs.FindAsync(id);
        if (blog == null)
        {
            return NotFound(new { message = "Không tìm thấy bài viết" });
        }
        return Ok(blog);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBlog(int id, [FromBody] Blog blog)
    {
        if (id != blog.Id) return BadRequest();
        _context.Blogs.Update(blog);
        await _context.SaveChangesAsync();
        return Ok(blog);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBlog(int id)
    {
        var blog = await _context.Blogs.FindAsync(id);
        if (blog == null) return NotFound();
        _context.Blogs.Remove(blog);
        await _context.SaveChangesAsync();
        return Ok();
    }
    [HttpPost]
    public async Task<ActionResult<Blog>> CreateBlog(Blog blog)
    {
        if (blog == null || string.IsNullOrEmpty(blog.Content))
        {
            return BadRequest("Required");
        }

        _context.Blogs.Add(blog);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBlogs), new { id = blog.Id }, blog);
    }
    [HttpPost("upload-avatar")]
    public async Task<IActionResult> UploadAvatar(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("Vui lòng chọn ảnh.");
        }

        // Thư mục lưu ảnh
        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/avatars");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        // Định dạng tên file để tránh trùng
        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadsFolder, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // Trả về URL của ảnh
        var fileUrl = $"/avatars/{fileName}";
        return Ok(new { url = fileUrl });
    }
    [HttpGet]
    public IActionResult GetBlogs([FromQuery] string? category)
    {
        var blogs = _context.Blogs.AsQueryable();

        if (!string.IsNullOrEmpty(category))
        {
            blogs = blogs.Where(b => b.Category == category);
        }

        return Ok(blogs.ToList());
    }

}