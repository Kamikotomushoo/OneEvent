using System;
using System.Collections.Generic;
using System.Text;
using EventHub.Core.DTOs;
using EventHub.Core.Entities;


namespace EventHub.Core.Abstractions.Services
{
    public interface IEventsService
    {
        List<HeadersOfEventsDTO> GetAllHeaders();
        DetailsOfEventsDTO GetDetailsById(int Id);
        FullEventsDTO AddEvent(FullEventsDTO eventDTO);
        bool DeleteById(int id);
      //  bool Update(FullEventsDTO eventDTO);
    }
}
