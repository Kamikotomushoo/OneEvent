using System;
using System.Collections.Generic;
using System.Text;

namespace EventHub.Core.Entities
{
    public interface IEntity<T>
    {
        public T Id { get; set; }
    }
}
