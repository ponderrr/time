import { Card, Group, Text, Badge, Stack, Button } from '@mantine/core';
import { TagGetDto } from '../../constants/types';

type ActivityTagCardProps = {
  tag: TagGetDto;
  onEdit: (id: number) => void;
};

const ActivityTagCard = ({ tag, onEdit }: ActivityTagCardProps) => {
  if (!tag) {
    return null;
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full max-w-[380px]">
      <Stack gap="xs">
        <Text fw={500} size="lg">{tag.name || 'Unnamed Tag'}</Text>

        <Text size="sm" c="dimmed">Used in Activities:</Text>
        <div className="flex flex-wrap gap-2">
          {tag.activities && tag.activities.length > 0 ? (
            tag.activities.map(activity => (
              <Badge 
                key={activity.id}
                color="brand"
                variant="light"
                className="text-sm"
              >
                {activity.name}
              </Badge>
            ))
          ) : (
            <Text size="sm" c="dimmed" fs="italic">Not used in any activities</Text>
          )}
        </div>

        <Button
          variant="light"
          color="brand"
          fullWidth
          mt="auto"
          onClick={() => onEdit(tag.id)}
        >
          Edit Tag
        </Button>
      </Stack>
    </Card>
  );
};

export default ActivityTagCard;