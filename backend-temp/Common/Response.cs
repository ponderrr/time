using System.Collections.Generic;

namespace LearningStarter.Common
{

    public class Response
{
    public object? Data { get; set; }
    private readonly List<Error> _errors = new();
    public IEnumerable<Error> Errors => _errors;

    public bool HasErrors => _errors.Count > 0;

    public void AddError(string property, string message)
    {
        _errors.Add(new Error { Property = property, Message = message });
    }
}
    public class Response<T>
    {
        public T? Data { get; set; } 
        private readonly List<Error> _errors = new();
        public IEnumerable<Error> Errors => _errors;

        public bool HasErrors => _errors.Count > 0;

        public void AddError(string property, string message)
        {
            _errors.Add(new Error { Property = property, Message = message });
        }
    }

    public class Error
    {
        public required string Property { get; set; }
        public required string Message { get; set; }
    }
}
