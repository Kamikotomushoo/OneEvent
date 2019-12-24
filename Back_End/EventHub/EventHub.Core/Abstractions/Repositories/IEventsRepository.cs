using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EventHub.Core.Entities;

namespace EventHub.Core.Abstractions.Repositories
{
    public interface IEventsRepository
    {
        Events GetById(int id);
        IQueryable<Events> GetAll();
        Events Add(Events entity);
        bool DeleteById(int id);
    }
}
