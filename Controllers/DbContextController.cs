using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using App.Models;
using Microsoft.EntityFrameworkCore;
namespace App.Controllers;
[Route("/database-manage/[action]")]
public class DbContextController : Controller
{
    private readonly AppDbContext _context;

    public DbContextController(AppDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {

        return View();
    }
    [HttpGet]
    public IActionResult DeleteDb()
    {

        return View();
    }
    [TempData]
    public string? StatusMessage { get; set; }
    [HttpPost]
    public async Task<IActionResult> DeleteDbAsync()
    {

        var success = await _context.Database.EnsureDeletedAsync();
        StatusMessage = success ? "Xóa Db thành công" : "Xóa Db thất bại";
        return RedirectToAction(nameof(Index));
    }
    public async Task<IActionResult> Migrate()
    {
        await _context.Database.MigrateAsync();
        StatusMessage = "Cập nhật Db thành công";
        return RedirectToAction(nameof(Index));
    }
}