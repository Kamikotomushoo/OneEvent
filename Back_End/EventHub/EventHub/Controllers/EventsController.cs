using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventHub.Core.Abstractions.Services;
using EventHub.Core.DTOs;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventHub.Controllers
{
    [EnableCors("AllowMyOrigin")]
    [Route("[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventsService _service;
        public EventsController(IEventsService service)
        {
            _service = service;
        }

        [HttpGet("headers")]
        public ActionResult<HeadersOfEventsDTO> GetAllHeaders()
        {
            try
            {
                var result = _service.GetAllHeaders();

                return Ok(result);
            }
            catch
            {
                return new NotFoundResult();
            }
        }


        [HttpGet("details/{id}")]
        public ActionResult<DetailsOfEventsDTO> GetAllDetails([FromRoute]int id)
        {
            var result = _service.GetDetailsById(id);
            if (result != null)
                return Ok(result);
            return new NotFoundResult();
            
        }

        //[HttpPut]
        //public ActionResult<UserDTO> Update(UserDTO user)
        //{
        //    try
        //    {
        //        _service.Update(user);
        //        return Ok(user);
        //    }
        //    catch
        //    {
        //        return new NotFoundResult();
        //    }
        //}

        [HttpPost]
        public ActionResult<FullEventsDTO> Insert([FromBody]FullEventsDTO eventDTO)
        {

            try
            {
                var result = _service.AddEvent(eventDTO);
                return Ok(result);
            }
            catch
            {
                return new BadRequestResult();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var res = _service.DeleteById(id);
                if (res)
                    return new NoContentResult();
                throw new Exception();
            }
            catch(Exception)
            {
                return new NotFoundResult();
            }
        }
    }
}