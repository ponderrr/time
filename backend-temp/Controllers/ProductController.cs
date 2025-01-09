using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using LearningStarter.Common;

namespace LearningStarter.Controllers;

[ApiController]
[Route("api/product")]
public class ProductController : ControllerBase
{
    private readonly DataContext _dataContext;

    public ProductController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = new Response();
    
        var data = _dataContext
            .Set<Product>()
            .Include(p => p.Location)
            .Select(product => new ProductGetDto
            {
                Id = product.Id,
                Name = product.Name,
                LocationId = product.LocationId,
                LocationName = product.Location.Name,
                Price = product.Price,
                ExpectedQuantity = product.ExpectedQuantity,
                MinQuantity = product.MinQuantity,
                Description = product.Description,
                Location = product.Location,
                Reviews = new List<ReviewGetDto>()  // Initialize empty reviews list
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
            .Set<Product>()
            .Include(p => p.Location)
            .Select(product => new ProductGetDto
            {
                Id = product.Id,
                Name = product.Name,
                LocationId = product.LocationId,
                LocationName = product.Location.Name,
                Price = product.Price,
                ExpectedQuantity = product.ExpectedQuantity,
                MinQuantity = product.MinQuantity,
                Description = product.Description,
                Location = product.Location,
                Reviews = new List<ReviewGetDto>()  // Initialize empty reviews list
            })
            .FirstOrDefault(product => product.Id == id);
        
        if (data == null)
        {
            response.AddError("id", "Product not found.");
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
            .Set<Product>()
            .Select(product => new OptionItemDto
            {
                Label = $"{product.Name} (${product.Price:F2})",
                Value = product.Id.ToString()
            })
            .ToList();
    
        response.Data = data;
        return Ok(response);
    }
    
    [HttpPost]
    public IActionResult Create([FromBody] ProductCreateDto createDto)
    {
        var response = new Response();

        if (string.IsNullOrEmpty(createDto.Name))
        {
            response.AddError(nameof(createDto.Name), "Name must not be empty");
        }

        if (createDto.Price <= 0)
        {
            response.AddError(nameof(createDto.Price), "Price must be greater than zero");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        // Get Location before creating product
        var location = _dataContext.Set<Location>().Find(createDto.LocationId);
        if (location == null)
        {
            response.AddError(nameof(createDto.LocationId), "Location not found");
            return BadRequest(response);
        }

        var productToCreate = new Product
        {
            Name = createDto.Name,
            LocationId = createDto.LocationId,
            Price = createDto.Price,
            ExpectedQuantity = createDto.ExpectedQuantity,
            MinQuantity = createDto.MinQuantity,
            Description = createDto.Description,
            Location = location  // Set the required Location
        };
        
        _dataContext.Set<Product>().Add(productToCreate);
        _dataContext.SaveChanges();

        var productToReturn = new ProductGetDto
        {
            Id = productToCreate.Id,
            Name = productToCreate.Name,
            LocationId = productToCreate.LocationId,
            LocationName = location.Name,
            Price = productToCreate.Price,
            ExpectedQuantity = productToCreate.ExpectedQuantity,
            MinQuantity = productToCreate.MinQuantity,
            Description = productToCreate.Description,
            Location = location,
            Reviews = new List<ReviewGetDto>()  // Initialize empty reviews list
        };
        
        response.Data = productToReturn;
        return Created("", response);
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromBody] ProductUpdateDto updateDto, int id)
    {
        var response = new Response();
        
        if (string.IsNullOrEmpty(updateDto.Name))
        {
            response.AddError(nameof(updateDto.Name), "Name must not be empty");
        }

        if (updateDto.Price <= 0)
        {
            response.AddError(nameof(updateDto.Price), "Price must be greater than zero");
        }

        if (response.HasErrors)
        {
            return BadRequest(response);
        }

        var productToUpdate = _dataContext.Set<Product>()
            .Include(p => p.Location)
            .FirstOrDefault(product => product.Id == id);
        
        if (productToUpdate == null)
        {
            response.AddError("id", "Product not found.");
            return NotFound(response);
        }

        // Get new Location if it changed
        var location = productToUpdate.LocationId != updateDto.LocationId
            ? _dataContext.Set<Location>().Find(updateDto.LocationId)
            : productToUpdate.Location;

        if (location == null)
        {
            response.AddError(nameof(updateDto.LocationId), "Location not found");
            return BadRequest(response);
        }

        productToUpdate.Name = updateDto.Name;
        productToUpdate.LocationId = updateDto.LocationId;
        productToUpdate.Price = updateDto.Price;
        productToUpdate.ExpectedQuantity = updateDto.ExpectedQuantity;
        productToUpdate.MinQuantity = updateDto.MinQuantity;
        productToUpdate.Description = updateDto.Description;
        productToUpdate.Location = location;

        _dataContext.SaveChanges();

        var productToReturn = new ProductGetDto
        {
            Id = productToUpdate.Id,
            Name = productToUpdate.Name,
            LocationId = productToUpdate.LocationId,
            LocationName = location.Name,
            Price = productToUpdate.Price,
            ExpectedQuantity = productToUpdate.ExpectedQuantity,
            MinQuantity = productToUpdate.MinQuantity,
            Description = productToUpdate.Description,
            Location = location,
            Reviews = new List<ReviewGetDto>()  // Initialize empty reviews list
        };
        
        response.Data = productToReturn;
        return Ok(response);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var response = new Response();
        
        var productToDelete = _dataContext.Set<Product>()
            .FirstOrDefault(product => product.Id == id);

        if (productToDelete == null)
        {
            response.AddError("id", "Product not found.");
            return NotFound(response);
        }

        _dataContext.Set<Product>().Remove(productToDelete);
        _dataContext.SaveChanges();

        response.Data = true;
        return Ok(response);
    }
}