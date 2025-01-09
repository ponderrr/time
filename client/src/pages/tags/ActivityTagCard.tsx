import { Card, Group, Text, Button, Badge } from '@mantine/core';
import { ActivityTagGetDto } from '../../constants/types';

type ActivityTagCardProps = {
  activityTag: ActivityTagGetDto;
  onEdit: (id: number) => void;
};

const ActivityTagCard = ({ activityTag, onEdit }: ActivityTagCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Text fw={500}>Tag #{activityTag.id}</Text>
        <Badge color="blue" variant="light">
          Activity #{activityTag.activityId}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed" mb="md">
        Tag ID: {activityTag.tagId}
      </Text>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => onEdit(activityTag.id)}
      >
        Edit Activity Tag
      </Button>
    </Card>
  );
};

export default ActivityTagCard;