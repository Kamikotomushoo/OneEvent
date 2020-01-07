using System.Collections.Generic;
using EventHub.Core.DTOs;


namespace EventHub.Core.Abstractions.Services
{
    public interface IEventsService
    {
        List<HeadersOfEventsDTO> GetAllHeaders();
        DetailsOfEventsDTO GetDetailsById(int Id);
        FullEventsDTO AddEvent(FullEventsDTO eventDTO);
        bool DeleteById(int id);
    }
}
