using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using App.Models;
using System.Threading.Tasks;
using System.Data.Entity;

namespace App.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;

    }
    public IActionResult Index()
    {

        return View();
    }
    public IActionResult About()
    {
        return View();
    }

    public IActionResult News()
    {
        return View();
    }
    public IActionResult Contact()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
