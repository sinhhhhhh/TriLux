using App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Authentication.Cookies;

var certPath = "/app/ssl/https.crt";
var keyPath = "/app/ssl/https.key";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(8080); // HTTP
    if (File.Exists(certPath) && File.Exists(keyPath))
    {
        options.ListenAnyIP(8443, listenOptions =>
        {
            listenOptions.UseHttps(certPath, keyPath);
        });
    }
    else
    {
        Console.WriteLine("⚠️ Không tìm thấy chứng chỉ SSL! Ứng dụng chỉ chạy HTTP.");
    }
});

builder.Services.AddDbContext<AppDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login"; // Chuyển hướng đến trang đăng nhập
        options.AccessDeniedPath = "/Account/AccessDenied"; // Nếu không có quyền truy cập
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
//config npm
var nodeModulesPath = Path.Combine(Directory.GetCurrentDirectory(), "ReactApp/node_modules");
if (Directory.Exists(nodeModulesPath))
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(nodeModulesPath),
        RequestPath = new PathString("/vendor")
    });
}
//

app.UseRouting();

app.UseCors("AllowReactApp");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
