using System;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using LearningStarter.Common;
using System.Collections.Generic;

namespace LearningStarter.Controllers;

[ApiController]
[Route("api/activity")]
public class ActivityController : ControllerBase
{
    private readonly DataContext _dataContext;

    public ActivityController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public IActionResult GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? search = null)
    {
        var response = new Response();
    
        var query = _dataContext
            .Set<Activity>()
            .Where(a => !a.IsDeleted)
            .Include(a => a.Location)
            .Include(a => a.ActivityType)
            .Include(a => a.Products)
                .ThenInclude(p => p.Location)
            .Include(a => a.ActivityTags)
                .ThenInclude(at => at.Tag)
            .Select(activity => new ActivityGetDto
            {
                Id = activity.Id,
                Name = activity.Name,
                LocationId = activity.LocationId,
                ActivityTypeId = activity.ActivityTypeId,
                StartTime = activity.StartTime,
                EndTime = activity.EndTime,
                ImageUrl = activity.ImageUrl,
                Location = new LocationGetDto
                {
                    Id = activity.Location.Id,
                    Name = activity.Location.Name,
                    City = activity.Location.City,
                    State = activity.Location.State,
                    Country = activity.Location.Country,
                    Description = activity.Location.Description
                },
                ActivityType = new ActivityTypeGetDto
                {
                    Id = activity.ActivityType.Id,
                    Name = activity.ActivityType.Name
                },
                Products = activity.Products.Select(p => new ProductGetDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    LocationId = p.LocationId,
                    LocationName = p.Location.Name,
                    Price = p.Price,
                    ExpectedQuantity = p.ExpectedQuantity,
                    MinQuantity = p.MinQuantity,
                    Description = p.Description,
                    Location = p.Location,
                    Reviews = new List<ReviewGetDto>()
                }).ToList(),
                Tags = activity.ActivityTags.Select(at => new TagGetDto
                {
                    Id = at.Tag.Id,
                    Name = at.Tag.Name
                }).ToList()
            });

        // Apply search filter if provided
        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(a => a.Name.Contains(search) || 
                                   a.Location.Name.Contains(search) ||
                                   a.ActivityType.Name.Contains(search));
        }

        var pagedResult = PaginationHelper.GetPagedResult(query, page, pageSize);
        
        response.Data = pagedResult;
        return Ok(response);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var response = new Response();
    
        var data = _dataContext
            .Set<Activity>()
            .Include(a => a.Location)
            .Include(a => a.ActivityType)
            .Include(a => a.Products)
                .ThenInclude(p => p.Location)
            .Include(a => a.ActivityTags)
                .ThenInclude(at => at.Tag)
            .Select(activity => new ActivityGetDto
            {
                Id = activity.Id,
                Name = activity.Name,
                LocationId = activity.LocationId,
                ActivityTypeId = activity.ActivityTypeId,
                StartTime = activity.StartTime,
                EndTime = activity.EndTime,
                ImageUrl = activity.ImageUrl,
                Location = new LocationGetDto
                {
                    Id = activity.Location.Id,
                    Name = activity.Location.Name,
                    City = activity.Location.City,
                    State = activity.Location.State,
                    Country = activity.Location.Country,
                    Description = activity.Location.Description
                },
                ActivityType = new ActivityTypeGetDto
                {
                    Id = activity.ActivityType.Id,
                    Name = activity.ActivityType.Name
                },
                Products = activity.Products.Select(p => new ProductGetDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    LocationId = p.LocationId,
                    LocationName = p.Location.Name,
                    Price = p.Price,
                    ExpectedQuantity = p.ExpectedQuantity,
                    MinQuantity = p.MinQuantity,
                    Description = p.Description,
                    Location = p.Location,
                    Reviews = new List<ReviewGetDto>()
                }).ToList(),
                Tags = activity.ActivityTags.Select(at => new TagGetDto
                {
                    Id = at.Tag.Id,
                    Name = at.Tag.Name
                }).ToList()
            })
            .FirstOrDefault(activity => activity.Id == id);

        if (data == null)
        {
            response.AddError("id", "Activity not found.");
            return NotFound(response);
        }
    
        response.Data = data;
        return Ok(response);
    }

    [HttpPost]
    public IActionResult Create([FromBody] ActivityCreateDto createDto)
    {
        var response = new Response();

        try
        {
            if (createDto.StartTime <= DateTimeOffset.UtcNow)
            {
                response.AddError("StartTime", "Start time must be in the future");
                return BadRequest(response);
            }

            if (createDto.EndTime <= createDto.StartTime)
            {
                response.AddError("Time", "End time must be after start time");
                return BadRequest(response);
            }

            var location = _dataContext.Set<Location>().Find(createDto.LocationId);
            var activityType = _dataContext.Set<ActivityType>().Find(createDto.ActivityTypeId);

            if (location == null)
            {
                response.AddError("LocationId", "Location not found");
                return BadRequest(response);
            }

            if (activityType == null)
            {
                response.AddError("ActivityTypeId", "Activity type not found");
                return BadRequest(response);
            }

            var activityToCreate = new Activity
            {
                Name = createDto.Name,
                LocationId = createDto.LocationId,
                ActivityTypeId = createDto.ActivityTypeId,
                StartTime = createDto.StartTime.ToUniversalTime(),
                EndTime = createDto.EndTime.ToUniversalTime(),
                ImageUrl = createDto.ImageUrl,
                Location = location,
                ActivityType = activityType,
                Products = new List<Product>(),
                ActivityTags = new List<ActivityTag>()
            };
            
            if (createDto.Products?.Any() == true)
            {
                var selectedProducts = _dataContext.Set<Product>()
                    .Include(p => p.Location)
                    .Where(p => createDto.Products.Contains(p.Id))
                    .ToList();
                activityToCreate.Products = selectedProducts;
            }

            if (createDto.Tags?.Any() == true)
            {
                var tags = _dataContext.Set<Tag>().Where(t => createDto.Tags.Contains(t.Id)).ToList();
                activityToCreate.ActivityTags = createDto.Tags.Select(tagId => 
                {
                    var tag = tags.First(t => t.Id == tagId);
                    return new ActivityTag
                    {
                        TagId = tagId,
                        Tag = tag,
                        Activity = activityToCreate
                    };
                }).ToList();
            }
            
            _dataContext.Set<Activity>().Add(activityToCreate);
            _dataContext.SaveChanges();
            
            var createdActivity = _dataContext.Set<Activity>()
                .Include(a => a.Location)
                .Include(a => a.ActivityType)
                .Include(a => a.Products)
                    .ThenInclude(p => p.Location)
                .Include(a => a.ActivityTags)
                    .ThenInclude(at => at.Tag)
                .FirstOrDefault(a => a.Id == activityToCreate.Id);

            if (createdActivity == null)
            {
                response.AddError("Activity", "Failed to create activity");
                return BadRequest(response);
            }

            var activityToReturn = new ActivityGetDto
            {
                Id = createdActivity.Id,
                Name = createdActivity.Name,
                LocationId = createdActivity.LocationId,
                ActivityTypeId = createdActivity.ActivityTypeId,
                StartTime = createdActivity.StartTime,
                EndTime = createdActivity.EndTime,
                ImageUrl = createdActivity.ImageUrl,
                Location = new LocationGetDto
                {
                    Id = createdActivity.Location.Id,
                    Name = createdActivity.Location.Name,
                    City = createdActivity.Location.City,
                    State = createdActivity.Location.State,
                    Country = createdActivity.Location.Country,
                    Description = createdActivity.Location.Description
                },
                ActivityType = new ActivityTypeGetDto
                {
                    Id = createdActivity.ActivityType.Id,
                    Name = createdActivity.ActivityType.Name
                },
                Products = createdActivity.Products.Select(p => new ProductGetDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    LocationId = p.LocationId,
                    LocationName = p.Location.Name,
                    Price = p.Price,
                    ExpectedQuantity = p.ExpectedQuantity,
                    MinQuantity = p.MinQuantity,
                    Description = p.Description,
                    Location = p.Location,
                    Reviews = new List<ReviewGetDto>()
                }).ToList(),
                Tags = createdActivity.ActivityTags.Select(at => new TagGetDto
                {
                    Id = at.Tag.Id,
                    Name = at.Tag.Name
                }).ToList()
            };
    
            response.Data = activityToReturn;
            return Created("", response);
        }
        catch (Exception)
        {
            response.AddError("DateTime", "Invalid date format");
            return BadRequest(response);
        }
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromBody] ActivityUpdateDto updateDto, int id)
    {
        var response = new Response();
        
        try
        {
            if (updateDto.StartTime <= DateTimeOffset.UtcNow)
            {
                response.AddError("StartTime", "Start time must be in the future");
                return BadRequest(response);
            }

            if (updateDto.EndTime <= updateDto.StartTime)
            {
                response.AddError("Time", "End time must be after start time");
                return BadRequest(response);
            }

            var activityToUpdate = _dataContext.Set<Activity>()
                .Include(a => a.Products)
                .Include(a => a.ActivityTags)
                    .ThenInclude(at => at.Tag)
                .FirstOrDefault(activity => activity.Id == id);
            
            if (activityToUpdate == null)
            {
                response.AddError("id", "Activity not found.");
                return NotFound(response);
            }

            var location = _dataContext.Set<Location>().Find(updateDto.LocationId);
            var activityType = _dataContext.Set<ActivityType>().Find(updateDto.ActivityTypeId);

            if (location == null)
            {
                response.AddError("LocationId", "Location not found");
                return BadRequest(response);
            }

            if (activityType == null)
            {
                response.AddError("ActivityTypeId", "Activity type not found");
                return BadRequest(response);
            }

            activityToUpdate.Name = updateDto.Name;
            activityToUpdate.LocationId = updateDto.LocationId;
            activityToUpdate.ActivityTypeId = updateDto.ActivityTypeId;
            activityToUpdate.StartTime = updateDto.StartTime.ToUniversalTime();
            activityToUpdate.EndTime = updateDto.EndTime.ToUniversalTime();
            activityToUpdate.ImageUrl = updateDto.ImageUrl;
            activityToUpdate.Location = location;
            activityToUpdate.ActivityType = activityType;
            
            if (updateDto.Products != null)
            {
                activityToUpdate.Products.Clear();
                var selectedProducts = _dataContext.Set<Product>()
                    .Include(p => p.Location)
                    .Where(p => updateDto.Products.Contains(p.Id))
                    .ToList();
                activityToUpdate.Products = selectedProducts;
            }
            
            if (updateDto.Tags != null)
            {
                _dataContext.Set<ActivityTag>()
                    .RemoveRange(activityToUpdate.ActivityTags);
                
                var tags = _dataContext.Set<Tag>().Where(t => updateDto.Tags.Contains(t.Id)).ToList();
                var activityTags = updateDto.Tags.Select(tagId =>
                {
                    var tag = tags.First(t => t.Id == tagId);
                    return new ActivityTag
                    {
                        ActivityId = id,
                        TagId = tagId,
                        Activity = activityToUpdate,
                        Tag = tag
                    };
                }).ToList();
            
                activityToUpdate.ActivityTags = activityTags;
            }

            _dataContext.SaveChanges();
            
            var updatedActivity = _dataContext.Set<Activity>()
                .Include(a => a.Location)
                .Include(a => a.ActivityType)
                .Include(a => a.Products)
                    .ThenInclude(p => p.Location)
                .Include(a => a.ActivityTags)
                    .ThenInclude(at => at.Tag)
                .FirstOrDefault(a => a.Id == id);

            if (updatedActivity == null)
            {
                response.AddError("id", "Activity not found after update");
                return NotFound(response);
            }

            var activityToReturn = new ActivityGetDto
            {
                Id = updatedActivity.Id,
                Name = updatedActivity.Name,
                LocationId = updatedActivity.LocationId,
                ActivityTypeId = updatedActivity.ActivityTypeId,
                StartTime = updatedActivity.StartTime,
                EndTime = updatedActivity.EndTime,
                ImageUrl = updatedActivity.ImageUrl,
                Location = new LocationGetDto
                {
                    Id = updatedActivity.Location.Id,
                    Name = updatedActivity.Location.Name,
                    City = updatedActivity.Location.City,
                    State = updatedActivity.Location.State,
                    Country = updatedActivity.Location.Country,
                    Description = updatedActivity.Location.Description
                },
                ActivityType = new ActivityTypeGetDto
                {
                    Id = updatedActivity.ActivityType.Id,
                    Name = updatedActivity.ActivityType.Name
                },
                Products = updatedActivity.Products.Select(p => new ProductGetDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    LocationId = p.LocationId,
                    LocationName = p.Location.Name,
                    Price = p.Price,
                    ExpectedQuantity = p.ExpectedQuantity,
                    MinQuantity = p.MinQuantity,
                    Description = p.Description,
                    Location = p.Location,
                    Reviews = new List<ReviewGetDto>()
                }).ToList(),
                Tags = updatedActivity.ActivityTags.Select(at => new TagGetDto
                {
                    Id = at.Tag.Id,
                    Name = at.Tag.Name
                }).ToList()
            };
        
            response.Data = activityToReturn;
            return Ok(response);
        }
        catch (Exception)
        {
            response.AddError("DateTime", "Invalid date format");
            return BadRequest(response);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();
        
        var activityToDelete = _dataContext.Set<Activity>()
            .FirstOrDefault(activity => activity.Id == id && !activity.IsDeleted);

        if (activityToDelete == null)
        {
            response.AddError("id", "Activity not found.");
            return NotFound(response);
        }

        // Soft delete
        activityToDelete.IsDeleted = true;
        activityToDelete.DeletedAt = DateTimeOffset.UtcNow;
        _dataContext.SaveChanges();

        response.Data = true;
        return Ok(response);
    }
}