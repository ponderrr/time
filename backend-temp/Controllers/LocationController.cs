using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using LearningStarter.Common;

namespace LearningStarter.Controllers;

[ApiController]
[Route("api/location")]
public class LocationController : ControllerBase
{
    private readonly DataContext _dataContext;

    public LocationController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = new Response();
        
        var data = _dataContext
            .Set<Location>()
            .Select(location => new LocationGetDto
            {
                Id = location.Id,
                Name = location.Name,
                City = location.City,
                State = location.State,
                Country = location.Country,
                Description = location.Description
            })
            .ToList();
        
        response.Data = data;
        return Ok(response);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var response = new Response();
        
        var data = _dataContext
            .Set<Location>()
            .Select(location => new LocationGetDto
            {
                Id = location.Id,
                Name = location.Name,
                City = location.City,
                State = location.State,
                Country = location.Country,
                Description = location.Description
            })
            .FirstOrDefault(location => location.Id == id);

        if (data == null)
        {
            response.AddError("id", "Location not found.");
            return NotFound(response);
        }
        
        response.Data = data;
        return Ok(response);
    }
        
    [HttpGet("options")]
    public IActionResult GetOptions()
    {
        var response = new Response();
    
        var data = _dataContext
            .Set<Location>()
            .Select(location => new OptionItemDto
            {
                Label = $"{location.Name} ({location.City}, {location.State})",
                Value = location.Id.ToString()
            })
            .ToList();
    
        response.Data = data;
        return Ok(response);
    }
        
    [HttpPost]
    public IActionResult Create([FromBody] LocationCreateDto createDto)
    {
        var response = new Response();

        if (string.IsNullOrEmpty(createDto.Name))
        {
            response.AddError(nameof(createDto.Name), "Name must not be empty");
        }
        if (string.IsNullOrEmpty(createDto.City))
        {
            response.AddError(nameof(createDto.City), "City must not be empty");
        }
        if (string.IsNullOrEmpty(createDto.State))
        {
            response.AddError(nameof(createDto.State), "State must not be empty");
        }
        if (string.IsNullOrEmpty(createDto.Country))
        {
            response.AddError(nameof(createDto.Country), "Country must not be empty");
        }
        if (string.IsNullOrEmpty(createDto.Description))
        {
            response.AddError(nameof(createDto.Description), "Description must not be empty");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        var locationToCreate = new Location
        {
            Name = createDto.Name,
            City = createDto.City,
            State = createDto.State,
            Country = createDto.Country,
            Description = createDto.Description
        };
            
        _dataContext.Set<Location>().Add(locationToCreate);
        _dataContext.SaveChanges();

        var locationToReturn = new LocationGetDto
        {
            Id = locationToCreate.Id,
            Name = locationToCreate.Name,
            City = locationToCreate.City,
            State = locationToCreate.State,
            Country = locationToCreate.Country,
            Description = locationToCreate.Description
        };
            
        response.Data = locationToReturn;
        return Created("", response);
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromBody] LocationUpdateDto updateDto, int id)
    {
        var response = new Response();
            
        if (string.IsNullOrEmpty(updateDto.Name))
        {
            response.AddError(nameof(updateDto.Name), "Name must not be empty");
        }
        if (string.IsNullOrEmpty(updateDto.City))
        {
            response.AddError(nameof(updateDto.City), "City must not be empty");
        }
        if (string.IsNullOrEmpty(updateDto.State))
        {
            response.AddError(nameof(updateDto.State), "State must not be empty");
        }
        if (string.IsNullOrEmpty(updateDto.Country))
        {
            response.AddError(nameof(updateDto.Country), "Country must not be empty");
        }
        if (string.IsNullOrEmpty(updateDto.Description))
        {
            response.AddError(nameof(updateDto.Description), "Description must not be empty");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        var locationToUpdate = _dataContext.Set<Location>()
            .FirstOrDefault(location => location.Id == id);
            
        if (locationToUpdate == null)
        {
            response.AddError("id", "Location not found.");
            return NotFound(response);
        }

        locationToUpdate.Name = updateDto.Name;
        locationToUpdate.City = updateDto.City;
        locationToUpdate.State = updateDto.State;
        locationToUpdate.Country = updateDto.Country;
        locationToUpdate.Description = updateDto.Description;

        _dataContext.SaveChanges();

        var locationToReturn = new LocationGetDto
        {
            Id = locationToUpdate.Id,
            Name = locationToUpdate.Name,
            City = locationToUpdate.City,
            State = locationToUpdate.State,
            Country = locationToUpdate.Country,
            Description = locationToUpdate.Description
        };
            
        response.Data = locationToReturn;
        return Ok(response);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();
            
        var locationToDelete = _dataContext.Set<Location>()
            .FirstOrDefault(location => location.Id == id);

        if (locationToDelete == null)
        {
            response.AddError("id", "Location not found.");
            return NotFound(response);
        }

        _dataContext.Set<Location>().Remove(locationToDelete);
        _dataContext.SaveChanges();

        response.Data = true;
        return Ok(response);
    }
}
