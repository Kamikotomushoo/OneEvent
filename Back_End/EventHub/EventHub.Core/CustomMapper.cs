using System;
using System.Collections.Generic;
using System.Text;
using EventHub.Core.DTOs;
using EventHub.Core.Entities;
using AutoMapper;

namespace EventHub.Core
{
    public class CustomMapper: Profile
    {
        public CustomMapper()
        {
            CreateMap<Events, HeadersOfEventsDTO>().ReverseMap();
            CreateMap<Events, DetailsOfEventsDTO>().ReverseMap();
            CreateMap<Events, FullEventsDTO>().ReverseMap();

        }
    }
}
