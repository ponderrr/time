using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using LearningStarter.Common;

namespace LearningStarter.Controllers;

[ApiController]
[Route("api/useractivity")]
public class UserActivityController : ControllerBase
{
    private readonly DataContext _dataContext;

    public UserActivityController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = new Response();
        
        var data = _dataContext
            .Set<UserActivity>()
            .Select(userActivity => new UserActivityGetDto
            {
                Id = userActivity.Id,
                UserId = userActivity.UserId,
                ActivityId = userActivity.ActivityId,
                DateBooked = userActivity.DateBooked,
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
            .Set<UserActivity>()
            .Select(userActivity => new UserActivityGetDto
            {
                Id = userActivity.Id,
                UserId = userActivity.UserId,
                ActivityId = userActivity.ActivityId,
                DateBooked = userActivity.DateBooked,
            })
            .FirstOrDefault(userActivity => userActivity.Id == id);
        
        if (data == null)
        {
            response.AddError("id", "User activity not found.");
            return NotFound(response);
        }
        
        response.Data = data;
        return Ok(response); // returns HTTP 200
    }

    [HttpPost]
    public IActionResult Create([FromBody] UserActivityCreateDto createDto)
    {
        var response = new Response();

        // // Verify that the user exists
        // var user = _dataContext.Users.FirstOrDefault(u => u.Id == createDto.UserId);
        // if (user == null)
        // {
        //     response.AddError(nameof(createDto.UserId), "User not found.");
        // }

        if (createDto.DateBooked == default)
        {
            response.AddError(nameof(createDto.DateBooked), "DateBooked must be a valid date.");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        var userActivityToCreate = new UserActivity
        {
            UserId = createDto.UserId,
            ActivityId = createDto.ActivityId,
            DateBooked = createDto.DateBooked,
        };
        
        _dataContext.Set<UserActivity>().Add(userActivityToCreate);
        _dataContext.SaveChanges();

        var userActivityToReturn = new UserActivityGetDto
        {
            Id = userActivityToCreate.Id,
            UserId = userActivityToCreate.UserId,
            ActivityId = userActivityToCreate.ActivityId,
            DateBooked = userActivityToCreate.DateBooked,
        };
        
        response.Data = userActivityToReturn;
        
        return Created("", response);
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromBody] UserActivityUpdateDto updateDto, int id)
    {
        var response = new Response();
        
        // // Verify that the user exists
        // var user = _dataContext.Users.FirstOrDefault(u => u.Id == updateDto.UserId);
        // if (user == null)
        // {
        //     response.AddError(nameof(updateDto.UserId), "User not found.");
        // }

        if (updateDto.DateBooked == default)
        {
            response.AddError(nameof(updateDto.DateBooked), "DateBooked must be a valid date.");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        var userActivityToUpdate = _dataContext.Set<UserActivity>()
            .FirstOrDefault(userActivity => userActivity.Id == id);
        
        if (userActivityToUpdate == null)
        {
            response.AddError("id", "User activity not found.");
            return NotFound(response);
        }

        userActivityToUpdate.UserId = updateDto.UserId;
        userActivityToUpdate.ActivityId = updateDto.ActivityId;
        userActivityToUpdate.DateBooked = updateDto.DateBooked;

        _dataContext.SaveChanges();

        var userActivityToReturn = new UserActivityGetDto
        {
            Id = userActivityToUpdate.Id,
            UserId = userActivityToUpdate.UserId,
            ActivityId = userActivityToUpdate.ActivityId,
            DateBooked = userActivityToUpdate.DateBooked,
        };
        
        response.Data = userActivityToReturn;
        
        return Ok(response);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();
        
        var userActivityToDelete = _dataContext.Set<UserActivity>()
            .FirstOrDefault(userActivity => userActivity.Id == id);

        if (userActivityToDelete == null)
        {
            response.AddError("id", "User activity not found.");
            return NotFound(response);
        }

        _dataContext.Set<UserActivity>().Remove(userActivityToDelete);
        _dataContext.SaveChanges();

        response.Data = true;
        return Ok(response);
    }
}