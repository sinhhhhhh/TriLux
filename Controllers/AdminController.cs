using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace App.Controllers;
[Authorize]
public class AdminController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
    public IActionResult Create()
    {
        return View();
    }
}