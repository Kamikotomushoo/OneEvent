using EventHub.Core.Abstractions.Repositories;
using EventHub.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventHub.DAL.Repositories
{
    public class EventsRepository: BaseRepository<Events>, IEventsRepository
    {
        public EventsRepository(EventHubContext context): base(context) {}
    }
}
