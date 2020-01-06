using System;
using System.Collections.Generic;
using System.Text;


namespace EventHub.Core.DTOs
{
    public class HeadersOfEventsDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

    }
}
