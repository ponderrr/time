using System.Security.Cryptography;
using System.Text;

namespace LearningStarter.Services
{
    public interface ICsrfService
    {
        string GenerateToken();
        bool ValidateToken(string token, string sessionId);
    }

    public class CsrfService : ICsrfService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CsrfService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GenerateToken()
        {
            var sessionId = _httpContextAccessor.HttpContext?.Session?.Id ?? "default";
            var randomBytes = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);
            
            var randomString = Convert.ToBase64String(randomBytes);
            var combined = $"{sessionId}:{randomString}";
            
            using var sha256 = SHA256.Create();
            var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(combined));
            return Convert.ToBase64String(hash);
        }

        public bool ValidateToken(string token, string sessionId)
        {
            if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(sessionId))
                return false;

            // In a real implementation, you would store and validate the token
            // For now, we'll just check if it's a valid base64 string
            try
            {
                Convert.FromBase64String(token);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
