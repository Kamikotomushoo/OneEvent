using EventHub.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventHub.DAL
{
    public class EventHubContext : DbContext
    {
        public DbSet<Events> Events { get; set; }

        public EventHubContext(DbContextOptions op) : base(op)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Events>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.StartTime).IsRequired();

            });
        }
    }
}
