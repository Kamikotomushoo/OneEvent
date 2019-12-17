using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EventHub.Core.Abstractions.Repositories
{
    public interface IBaseRepository<TEntity> where TEntity: class
    {
        TEntity GetById(int id);
        IQueryable<TEntity> GetAll();
        TEntity Add(TEntity entity);
        bool DeleteById(int id);
      //  bool Update(TEntity entity);

    }
}
