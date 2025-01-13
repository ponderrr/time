import { Card, Text, Button, Stack } from '@mantine/core';
import { ActivityTypeGetDto } from '../../constants/types';

type ActivityTypeCardProps = {
  activityType: ActivityTypeGetDto;
  onEdit: (id: number) => void;
};

const ActivityTypeCard = ({ activityType, onEdit }: ActivityTypeCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full max-w-[380px]">
      <Stack gap="md">
        <Text fw={500} size="lg">
          {activityType.name}
        </Text>

        <Button
          variant="light"
          color="brand"
          fullWidth
          onClick={() => onEdit(activityType.id)}
        >
          Edit Activity Type
        </Button>
      </Stack>
    </Card>
  );
};

export default ActivityTypeCard;