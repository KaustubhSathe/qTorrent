using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using qTorrent.Models;
using qTorrent.Services;

namespace qTorrent.Controllers
{
    public class HomeController : Controller
    {
        private readonly TorrentService _torrentService;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger,TorrentService torrentService)
        {
            _logger = logger;
            _torrentService = torrentService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Search(string searchString)
        {
            return View(_torrentService.Search(searchString));
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
