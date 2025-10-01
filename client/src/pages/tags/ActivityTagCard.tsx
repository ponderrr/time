import { Card, Text, Badge, Stack, Button, Group } from '@mantine/core';
import { TagGetDto } from '../../constants/types';

type ActivityTagCardProps = {
  tag: TagGetDto;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const ActivityTagCard = ({ tag, onEdit, onDelete }: ActivityTagCardProps) => {
  if (!tag) return null;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full h-full">
      <Stack gap="xs">
        <Text fw={500} size="lg">{tag.name}</Text>

        <Text size="sm" c="dimmed">Used in Activities:</Text>
        <div className="flex flex-col gap-2">
          {tag.activities && tag.activities.length > 0 ? (
            tag.activities.map(activity => (
              <Card 
                key={activity.id}
                padding="xs"
                radius="md"
                withBorder
                className="bg-[#2C2E33] hover:bg-[#373A40] transition-colors duration-200"
              >
                <Stack gap={2}>
                  <Group justify="space-between" align="center">
                    <Text size="sm" fw={500} className="text-white">
                      {activity.name}
                    </Text>
                  </Group>
                  <Text size="xs" c="dimmed">
                    {`${activity.city}, ${activity.state}`}
                  </Text>
                  <Text size="xs" c="dimmed" className="italic">
                    {new Date(activity.startTime).toLocaleString()}
                  </Text>
                </Stack>
              </Card>
            ))
          ) : (
            <Text size="sm" c="dimmed" fs="italic">Not used in any activities</Text>
          )}
        </div>

        <Group gap="xs" mt="auto">
          <Button
            variant="light"
            color="brand"
            flex={1}
            onClick={() => onEdit(tag.id)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            color="red"
            flex={1}
            onClick={() => onDelete(tag.id)}
          >
            Delete
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default ActivityTagCard;