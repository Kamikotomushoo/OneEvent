using AutoMapper;
using EventHub.Core.Abstractions.Services;
using EventHub.Core.Validators;
using EventHub.DAL;
using EventHub.Services;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace EventHub
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowMyOrigin",

                builder => builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());

            });

            var connection = Configuration.GetConnectionString("DatabaseConnection");
            services.AddDbContext<EventHubContext>(context => context.UseSqlServer(connection));

            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new EventHub.Core.CustomMapper());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
            services.AddScoped<IEventsService, EventsService>();


            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });

            services
                .AddMvc(option =>
                {
                    option.EnableEndpointRouting = false;
                })
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<FullEventsDTOValidator>());

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseCors("AllowMyOrigin");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
