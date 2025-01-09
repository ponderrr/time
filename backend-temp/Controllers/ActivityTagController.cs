using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using LearningStarter.Common;

namespace LearningStarter.Controllers;

[ApiController]
[Route("api/activitytag")]
public class ActivityTagController : ControllerBase
{
    private readonly DataContext _dataContext;

    public ActivityTagController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = new Response();
        
        var data = _dataContext
            .Set<ActivityTag>()
            .Include(at => at.Activity)
            .Include(at => at.Tag)
            .Select(activityTag => new ActivityTagGetDto
            {
                Id = activityTag.Id,
                ActivityId = activityTag.ActivityId,
                TagId = activityTag.TagId,
            })
            .ToList();
        
        response.Data = data;
        return Ok(response);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var response = new Response();
        
        if (id <= 0)
        {
            response.AddError("id", "Id must be greater than zero.");
            return BadRequest(response);
        }
        
        var data = _dataContext
            .Set<ActivityTag>()
            .Include(at => at.Activity)
            .Include(at => at.Tag)
            .Select(activityTag => new ActivityTagGetDto
            {
                Id = activityTag.Id,
                ActivityId = activityTag.ActivityId,
                TagId = activityTag.TagId,
            })
            .FirstOrDefault(activityTag => activityTag.Id == id);
        
        if (data == null)
        {
            response.AddError("id", "Activity tag not found.");
            return NotFound(response);
        }
        
        response.Data = data;
        return Ok(response);
    }

    [HttpPost]
    public IActionResult Create([FromBody] ActivityTagCreateDto createDto)
    {
        var response = new Response();

        if (createDto.ActivityId <= 0)
        {
            response.AddError(nameof(createDto.ActivityId), "ActivityId must be a valid value.");
        }

        if (createDto.TagId <= 0)
        {
            response.AddError(nameof(createDto.TagId), "TagId must be a valid value.");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        // Get the Activity and Tag entities
        var activity = _dataContext.Set<Activity>().Find(createDto.ActivityId);
        var tag = _dataContext.Set<Tag>().Find(createDto.TagId);

        if (activity == null)
        {
            response.AddError("ActivityId", "Activity not found");
            return BadRequest(response);
        }

        if (tag == null)
        {
            response.AddError("TagId", "Tag not found");
            return BadRequest(response);
        }

        var activityTagToCreate = new ActivityTag
        {
            ActivityId = createDto.ActivityId,
            TagId = createDto.TagId,
            Activity = activity,  // Set required navigation property
            Tag = tag           // Set required navigation property
        };
        
        _dataContext.Set<ActivityTag>().Add(activityTagToCreate);
        _dataContext.SaveChanges();

        var activityTagToReturn = new ActivityTagGetDto
        {
            Id = activityTagToCreate.Id,
            ActivityId = activityTagToCreate.ActivityId,
            TagId = activityTagToCreate.TagId,
        };
        
        response.Data = activityTagToReturn;
        
        return Created("", response);
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromBody] ActivityTagUpdateDto updateDto, int id)
    {
        var response = new Response();
        
        if (updateDto.ActivityId <= 0)
        {
            response.AddError(nameof(updateDto.ActivityId), "ActivityId must be a valid value.");
        }

        if (updateDto.TagId <= 0)
        {
            response.AddError(nameof(updateDto.TagId), "TagId must be a valid value.");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        var activityTagToUpdate = _dataContext.Set<ActivityTag>()
            .Include(at => at.Activity)
            .Include(at => at.Tag)
            .FirstOrDefault(activityTag => activityTag.Id == id);
        
        if (activityTagToUpdate == null)
        {
            response.AddError("id", "Activity tag not found.");
            return NotFound(response);
        }

        // Get the new Activity and Tag entities if they've changed
        var activity = activityTagToUpdate.ActivityId != updateDto.ActivityId 
            ? _dataContext.Set<Activity>().Find(updateDto.ActivityId)
            : activityTagToUpdate.Activity;
            
        var tag = activityTagToUpdate.TagId != updateDto.TagId 
            ? _dataContext.Set<Tag>().Find(updateDto.TagId)
            : activityTagToUpdate.Tag;

        if (activity == null)
        {
            response.AddError("ActivityId", "Activity not found");
            return BadRequest(response);
        }

        if (tag == null)
        {
            response.AddError("TagId", "Tag not found");
            return BadRequest(response);
        }

        activityTagToUpdate.ActivityId = updateDto.ActivityId;
        activityTagToUpdate.TagId = updateDto.TagId;
        activityTagToUpdate.Activity = activity;
        activityTagToUpdate.Tag = tag;

        _dataContext.SaveChanges();

        var activityTagToReturn = new ActivityTagGetDto
        {
            Id = activityTagToUpdate.Id,
            ActivityId = activityTagToUpdate.ActivityId,
            TagId = activityTagToUpdate.TagId,
        };
        
        response.Data = activityTagToReturn;
        
        return Ok(response);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();
        
        var activityTagToDelete = _dataContext.Set<ActivityTag>()
            .FirstOrDefault(activityTag => activityTag.Id == id);

        if (activityTagToDelete == null)
        {
            response.AddError("id", "Activity tag not found.");
            return NotFound(response);
        }

        _dataContext.Set<ActivityTag>().Remove(activityTagToDelete);
        _dataContext.SaveChanges();

        response.Data = true;
        return Ok(response);
    }
}