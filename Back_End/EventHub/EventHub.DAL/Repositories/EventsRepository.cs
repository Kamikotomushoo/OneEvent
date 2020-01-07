using EventHub.Core.Abstractions.Repositories;
using EventHub.Core.Entities;
using System.Linq;

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
                _context.Set<Events>().Add(entity);
                return entity;
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

    }
}
