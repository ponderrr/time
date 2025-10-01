import { Card, Text, Button, Stack, Group } from "@mantine/core";
import { ActivityTypeGetDto } from "../../constants/types";

type ActivityTypeCardProps = {
  activityType: ActivityTypeGetDto;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const ActivityTypeCard = ({ activityType, onEdit, onDelete }: ActivityTypeCardProps) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="w-full max-w-[380px]"
    >
      <Stack gap="md">
        <Text fw={500} size="lg">
          {activityType.name}
        </Text>

        <Group gap="xs">
          <Button
            variant="light"
            color="brand"
            flex={1}
            onClick={() => onEdit(activityType.id)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            color="red"
            flex={1}
            onClick={() => onDelete(activityType.id)}
          >
            Delete
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default ActivityTypeCard;
