using AutoMapper;
using EventHub.Core.Abstractions.Repositories;
using EventHub.Core.Abstractions.Services;
using EventHub.Core.DTOs;
using EventHub.Core.Entities;
using EventHub.DAL;
using EventHub.DAL.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace EventHub.Services
{
    public class EventsService : IEventsService
    {
        private readonly EventHubContext _context;
        private readonly IMapper _mapper;
        private EventsRepository _eventsRepository;
        private IEventsRepository EventsRepository => _eventsRepository ??= new EventsRepository(_context);

        public EventsService(IMapper mapp, EventHubContext context)
        {
            _mapper = mapp;
            _context = context;
        }
        public FullEventsDTO AddEvent(FullEventsDTO eventDTO)
        {
            var myEvent = new Events();
            _mapper.Map(eventDTO, myEvent);
            var res = EventsRepository.Add(myEvent);

            _context.SaveChanges();
            return eventDTO;
        }

        public bool DeleteById(int id)
        {
            var res = EventsRepository.DeleteById(id);
            if (res)
            {
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public DetailsOfEventsDTO GetDetailsById(int Id)
        {
            var det = EventsRepository.GetById(Id);
            return det != null ? _mapper.Map(det, new DetailsOfEventsDTO()) : null;
        }

        public List<HeadersOfEventsDTO> GetAllHeaders()
        {
            var list = EventsRepository.GetAll()
               .Select(el => _mapper.Map(el, new HeadersOfEventsDTO()))
               .ToList();

            return list;
        }

    }
}
