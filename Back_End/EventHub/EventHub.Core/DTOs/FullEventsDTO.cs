using System;
using System.Collections.Generic;
using System.Text;

namespace EventHub.Core.DTOs
{
    public class FullEventsDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
