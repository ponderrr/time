using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using LearningStarter.Common;

namespace LearningStarter.Controllers;

[ApiController]
[Route("api/review")]
public class ReviewController : ControllerBase
{
    private readonly DataContext _dataContext;

    public ReviewController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = new Response();
        
        var data = _dataContext
            .Set<Review>()
            .Select(review => new ReviewGetDto
            {
                Id = review.Id,
                LocationId = review.LocationId,
                Rating = review.Rating,
                Comment = review.Comment,
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
            .Set<Review>()
            .Select(review => new ReviewGetDto
            {
                Id = review.Id,
                LocationId = review.LocationId,
                Rating = review.Rating,
                Comment = review.Comment,
            })
            .FirstOrDefault(review => review.Id == id);
        
        if (data == null)
        {
            response.AddError("id", "Review not found.");
            return NotFound(response);
        }
        
        response.Data = data;
        return Ok(response); // returns HTTP 200
    }

    [HttpPost]
    public IActionResult Create([FromBody] ReviewCreateDto createDto)
    {
        var response = new Response();

        if (createDto.Rating < 0 || createDto.Rating > 5)
        {
            response.AddError(nameof(createDto.Rating), "Rating must be between 0 and 5");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        var reviewToCreate = new Review
        {
            LocationId = createDto.LocationId,
            Rating = createDto.Rating,
            Comment = createDto.Comment,
        };
        
        _dataContext.Set<Review>().Add(reviewToCreate);
        _dataContext.SaveChanges();

        var reviewToReturn = new ReviewGetDto
        {
            Id = reviewToCreate.Id,
            LocationId = reviewToCreate.LocationId,
            Rating = reviewToCreate.Rating,
            Comment = reviewToCreate.Comment,
        };
        
        response.Data = reviewToReturn;
        
        return Created("", response);
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromBody] ReviewUpdateDto updateDto, int id)
    {
        var response = new Response();
        
        if (updateDto.Rating < 0 || updateDto.Rating > 100)
        {
            response.AddError(nameof(updateDto.Rating), "Rating must be between 0 and 5");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        var reviewToUpdate = _dataContext.Set<Review>()
            .FirstOrDefault(review => review.Id == id);
        
        if (reviewToUpdate == null)
        {
            response.AddError("id", "Review not found.");
            return NotFound(response);
        }

        reviewToUpdate.LocationId = updateDto.LocationId;
        reviewToUpdate.Rating = updateDto.Rating;
        reviewToUpdate.Comment = updateDto.Comment;

        _dataContext.SaveChanges();

        var reviewToReturn = new ReviewGetDto
        {
            Id = reviewToUpdate.Id,
            LocationId = reviewToUpdate.LocationId,
            Rating = reviewToUpdate.Rating,
            Comment = reviewToUpdate.Comment,
        };
        
        response.Data = reviewToReturn;
        
        return Ok(response);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();
        
        var reviewToDelete = _dataContext.Set<Review>()
            .FirstOrDefault(review => review.Id == id);

        if (reviewToDelete == null)
        {
            response.AddError("id", "Review not found.");
            return NotFound(response);
        }

        _dataContext.Set<Review>().Remove(reviewToDelete);
        _dataContext.SaveChanges();

        response.Data = true;
        return Ok(response);
    }
}