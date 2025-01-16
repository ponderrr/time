namespace LearningStarter.Entities;

public class ActivityBriefDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    public DateTimeOffset StartTime { get; set; }
}