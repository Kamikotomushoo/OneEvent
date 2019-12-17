using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EventHub.Core.Abstractions.Repositories;

namespace EventHub.DAL.Repositories
{
    public abstract class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        protected readonly EventHubContext _context;
        public BaseRepository(EventHubContext context)
        {
            _context = context;
        }
        public TEntity Add(TEntity entity)
        {
            try
            {
                _context.Set<TEntity>().Add(entity);
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
                var ent = _context.Set<TEntity>().Find(id);
                _context.Set<TEntity>().Remove(ent);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public IQueryable<TEntity> GetAll()
        {
            try
            {
                var res = _context.Set<TEntity>();
                return res;
            }
            catch
            {
                return null;
            }
        }

        public TEntity GetById(int id)
        {
            try
            {
                var ent = _context.Set<TEntity>().Find(id);
                return ent;
            }
            catch
            {
                return null;
            }
        }

        //public bool Update(TEntity entity)
        //{
        //    try
        //    {
        //        _context.Set<TEntity>().Update(entity);
        //        return true;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}
    }
}
