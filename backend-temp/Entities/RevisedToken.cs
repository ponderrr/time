namespace LearningStarter.Entities
{
    public class RevokedToken
    {
        public int Id { get; set; } // Primary key
        public string Token { get; set; } = string.Empty; // Revoked JWT
        public DateTime RevokedAt { get; set; } // Timestamp of revocation
    }
}
