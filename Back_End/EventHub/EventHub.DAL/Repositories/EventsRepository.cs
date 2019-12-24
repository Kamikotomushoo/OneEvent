using EventHub.Core.Abstractions.Repositories;
using EventHub.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EventHub.DAL.Repositories
{
    public class EventsRepository: IEventsRepository
    {
        protected readonly EventHubContext _context;
        public EventsRepository(EventHubContext context)
        {
            _context = context;
        }
        public Events Add(Events entity)
        {
            try
            {
                _context.Set<Events>().Add(entity);
                return entity;
            }
            catch
            {
                return null;
            }

        }

        public bool DeleteById(int id)
        {
            try
            {
                var ent = _context.Set<Events>().Find(id);
                _context.Set<Events>().Remove(ent);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public IQueryable<Events> GetAll()
        {
            try
            {
                var res = _context.Set<Events>();
                return res;
            }
            catch
            {
                return null;
            }
        }

        public Events GetById(int id)
        {
            try
            {
                var ent = _context.Set<Events>().Find(id);
                return ent;
            }
            catch
            {
                return null;
            }
        }

        //public bool Update(Events entity)
        //{
        //    try
        //    {
        //        _context.Set<Events>().Update(entity);
        //        return true;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}
    }
}
