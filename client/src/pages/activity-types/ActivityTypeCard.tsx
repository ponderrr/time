import { Card, Text, Button } from '@mantine/core';
import { ActivityTypeGetDto } from '../../constants/types';

type ActivityTypeCardProps = {
  activityType: ActivityTypeGetDto;
  onEdit: (id: number) => void;
};

const ActivityTypeCard = ({ activityType, onEdit }: ActivityTypeCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg" fw={500} mb="md">
        {activityType.name}
      </Text>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => onEdit(activityType.id)}
      >
        Edit Activity Type
      </Button>
    </Card>
  );
};

export default ActivityTypeCard;