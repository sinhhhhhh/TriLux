using Microsoft.AspNetCore.Mvc;
using App.Models;

namespace App.Controllers;

public class ServiceController : Controller
{
    private readonly AppDbContext _context;

    public ServiceController(AppDbContext context)
    {
        _context = context;
    }
    public IActionResult Landscaping()
    {
        return View();
    }
    public IActionResult Staging()
    {
        return View();
    }
    public IActionResult Cleaning()
    {
        return View();
    }
    public IActionResult PropertyMaintenance()
    {
        return View();
    }
    public IActionResult HomeRenovation()
    {
        return View();
    }
    [HttpGet("service/{category}/{id}")]
    public IActionResult SingleBlog(string category, int id)
    {
        var blog = _context.Blogs.FirstOrDefault(b => b.Id == id && b.Category == category);
        if (blog == null) return NotFound();

        return View("SingleBlog", blog);
    }
}