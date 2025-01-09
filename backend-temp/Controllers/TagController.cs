using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using LearningStarter.Common;
using System.Collections.Generic;

namespace LearningStarter.Controllers;

[ApiController]
[Route("api/tag")]
public class TagController : ControllerBase
{
    private readonly DataContext _dataContext;

    public TagController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = new Response();
        
        var data = _dataContext
            .Set<Tag>()
            .Select(tag => new TagGetDto
            {
                Id = tag.Id,
                Name = tag.Name
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
            .Set<Tag>()
            .Select(tag => new TagGetDto
            {
                Id = tag.Id,
                Name = tag.Name
            })
            .FirstOrDefault(tag => tag.Id == id);
        
        if (data == null)
        {
            response.AddError("id", "Tag not found.");
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
            .Set<Tag>()
            .Select(tag => new OptionItemDto
            {
                Label = tag.Name,
                Value = tag.Id.ToString()
            })
            .ToList();
    
        response.Data = data;
        return Ok(response);
    }
    
    [HttpPost]
    public IActionResult Create([FromBody] TagCreateDto createDto)
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

        var tagToCreate = new Tag
        {
            Name = createDto.Name,
            ActivityTags = new List<ActivityTag>()  // Initialize required property
        };
        
        _dataContext.Set<Tag>().Add(tagToCreate);
        _dataContext.SaveChanges();

        var tagToReturn = new TagGetDto
        {
            Id = tagToCreate.Id,
            Name = tagToCreate.Name
        };
        
        response.Data = tagToReturn;
        return Created("", response);
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromBody] TagUpdateDto updateDto, int id)
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

        var tagToUpdate = _dataContext.Set<Tag>()
            .Include(t => t.ActivityTags)  // Include related entity
            .FirstOrDefault(tag => tag.Id == id);
        
        if (tagToUpdate == null)
        {
            response.AddError("id", "Tag not found.");
            return NotFound(response);
        }

        tagToUpdate.Name = updateDto.Name;

        _dataContext.SaveChanges();

        var tagToReturn = new TagGetDto
        {
            Id = tagToUpdate.Id,
            Name = tagToUpdate.Name
        };
        
        response.Data = tagToReturn;
        return Ok(response);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();
        
        var tagToDelete = _dataContext.Set<Tag>()
            .Include(t => t.ActivityTags)  // Include related entity
            .FirstOrDefault(tag => tag.Id == id);

        if (tagToDelete == null)
        {
            response.AddError("id", "Tag not found.");
            return NotFound(response);
        }

        _dataContext.Set<Tag>().Remove(tagToDelete);
        _dataContext.SaveChanges();

        response.Data = true;
        return Ok(response);
    }
}