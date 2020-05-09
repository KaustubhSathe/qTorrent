using MongoDB.Driver;
using qTorrent.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace qTorrent.Services
{
    public class TorrentService
    {
        private readonly IMongoCollection<Torrent> _torrents;

        public TorrentService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _torrents = database.GetCollection<Torrent>(settings.CollectionName);
        }

        public List<Torrent> Search(string searchString)
        {
            // return _torrents.Find(item => true).ToList();
            return _torrents.Find(item => item.Name.ToLower().Contains(searchString.ToLower())).ToList();
        }
    }
}
