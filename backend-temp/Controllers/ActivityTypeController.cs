using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using LearningStarter.Common;

namespace LearningStarter.Controllers;

[ApiController]
[Route("api/activitytype")]
public class ActivityTypeController : ControllerBase
{
    private readonly DataContext _dataContext;

    public ActivityTypeController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = new Response();
        
        var data = _dataContext
            .Set<ActivityType>()
            .Select(activityType => new ActivityTypeGetDto
            {
                Id = activityType.Id,
                Name = activityType.Name,
            })
            .ToList();
        
        response.Data = data;
        return Ok(response); // returns HTTP 200
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var response = new Response();
        
        var data = _dataContext
            .Set<ActivityType>()
            .Select(activityType => new ActivityTypeGetDto
            {
                Id = activityType.Id,
                Name = activityType.Name,
            })
            .FirstOrDefault(activityType => activityType.Id == id);
        
        if (data == null)
        {
            response.AddError("id", "Activity type not found.");
            return NotFound(response);
        }
        
        response.Data = data;
        return Ok(response); // returns HTTP 200
    }

    [HttpGet("options")]
    public IActionResult GetOptions()
    {
        var response = new Response();
    
        var data = _dataContext
            .Set<ActivityType>()
            .Select(type => new OptionItemDto
            {
                Label = type.Name,
                Value = type.Id.ToString()
            })
            .ToList();
    
        response.Data = data;
        return Ok(response);
    }

    
    [HttpPost]
    public IActionResult Create([FromBody] ActivityTypeCreateDto createDto)
    {
        var response = new Response();

        if (string.IsNullOrEmpty(createDto.Name))
        {
            response.AddError(nameof(createDto.Name), "Name must not be empty");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        var activityTypeToCreate = new ActivityType
        {
            Name = createDto.Name,
        };
        
        _dataContext.Set<ActivityType>().Add(activityTypeToCreate);
        _dataContext.SaveChanges();

        var activityTypeToReturn = new ActivityTypeGetDto
        {
            Id = activityTypeToCreate.Id,
            Name = activityTypeToCreate.Name,
        };
        
        response.Data = activityTypeToReturn;
        
        return Created("", response);
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromBody] ActivityTypeUpdateDto updateDto, int id)
    {
        var response = new Response();
        
        if (string.IsNullOrEmpty(updateDto.Name))
        {
            response.AddError(nameof(updateDto.Name), "Name must not be empty");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        var activityTypeToUpdate = _dataContext.Set<ActivityType>()
            .FirstOrDefault(activityType => activityType.Id == id);
        
        if (activityTypeToUpdate == null)
        {
            response.AddError("id", "Activity type not found.");
            return NotFound(response);
        }

        activityTypeToUpdate.Name = updateDto.Name;

        _dataContext.SaveChanges();

        var activityTypeToReturn = new ActivityTypeGetDto
        {
            Id = activityTypeToUpdate.Id,
            Name = activityTypeToUpdate.Name,
        };
        
        response.Data = activityTypeToReturn;
        
        return Ok(response);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();
        
        var activityTypeToDelete = _dataContext.Set<ActivityType>()
            .FirstOrDefault(activityType => activityType.Id == id);

        if (activityTypeToDelete == null)
        {
            response.AddError("id", "Activity type not found.");
            return NotFound(response);
        }

        _dataContext.Set<ActivityType>().Remove(activityTypeToDelete);
        _dataContext.SaveChanges();

        response.Data = true;
        return Ok(response);
    }
}