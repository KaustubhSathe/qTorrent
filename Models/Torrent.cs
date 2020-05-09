using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace qTorrent.Models
{
    /*
     Required Fields of torrent : 
         1. Id : url of the torrent , string 
         2. Name : name of the torrent, string
         3. Link : url of the torrent, string
         4. size : size of the torrent in MBs, int
         5. upload date : int miliseconds int64
         6. Seeders : int
         7. Leechers : int
         8. Source : string,download site name
         */
    public class Torrent
    {   
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string Id { get; set; }
       
        [BsonRepresentation(BsonType.String)]
        public string Name { get; set; }

        [BsonRepresentation(BsonType.String)]
        public string Link { get; set; }

        [BsonRepresentation(BsonType.Int32)]
        public int Size { get; set; }

        [BsonRepresentation(BsonType.Int64)]
        public Int64 UploadDate { get; set; }

        [BsonRepresentation(BsonType.Int32)]
        public int Seeders { get; set;}

        [BsonRepresentation(BsonType.Int32)]
        public int Leechers { get; set; }

        [BsonRepresentation(BsonType.String)]
        public string Source { get; set;}

    }
}
