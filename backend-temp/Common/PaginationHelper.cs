using System.Linq.Expressions;

namespace LearningStarter.Common;

public class PaginationHelper
{
    public static PagedResult<T> GetPagedResult<T>(
        IQueryable<T> query,
        int page = 1,
        int pageSize = 10,
        string? searchTerm = null,
        Expression<Func<T, bool>>? searchPredicate = null)
    {
        // Apply search filter if provided
        if (!string.IsNullOrEmpty(searchTerm) && searchPredicate != null)
        {
            query = query.Where(searchPredicate);
        }

        var totalCount = query.Count();
        var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
        
        // Ensure page is within valid range
        page = Math.Max(1, Math.Min(page, totalPages));
        
        var skip = (page - 1) * pageSize;
        var items = query.Skip(skip).Take(pageSize).ToList();

        return new PagedResult<T>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize,
            TotalPages = totalPages,
            HasNextPage = page < totalPages,
            HasPreviousPage = page > 1
        };
    }
}

public class PagedResult<T>
{
    public List<T> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public bool HasNextPage { get; set; }
    public bool HasPreviousPage { get; set; }
}
