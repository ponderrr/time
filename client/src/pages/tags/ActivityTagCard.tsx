// import { Card, Group, Text, Button, Badge, Stack } from '@mantine/core';
// import { ActivityTagGetDto } from '../../constants/types';

// type ActivityTagCardProps = {
//   activityTag: ActivityTagGetDto;
//   onEdit: (id: number) => void;
// };

// const ActivityTagCard = ({ activityTag, onEdit }: ActivityTagCardProps) => {
//   return (
//     <Card shadow="sm" padding="lg" radius="md" withBorder w="100%" maw={350}>
//       <Stack gap="md">
//         <Group justify="space-between">
//           <Text fw={500} size="lg">Activity Tag #{activityTag.id}</Text>
//           <Badge color="brand" variant="light">
//             Activity #{activityTag.activityId}
//           </Badge>
//         </Group>

//         <Text size="sm" c="dimmed">
//           Tag ID: {activityTag.tagId}
//         </Text>

//         <Button
//           variant="light"
//           color="brand"
//           fullWidth
//           onClick={() => onEdit(activityTag.id)}
//         >
//           Edit Activity Tag
//         </Button>
//       </Stack>
//     </Card>
//   );
// };

// export default ActivityTagCard;

import { Card, Group, Text, Badge, Stack, Button } from '@mantine/core';
import { ActivityTagGetDto } from '../../constants/types';

type ActivityTagCardProps = {
  activityTag: ActivityTagGetDto;
  onEdit: (id: number) => void;
};

const ActivityTagCard = ({ activityTag, onEdit }: ActivityTagCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full max-w-[380px]">
      <Stack gap="md">
        <Group justify="space-between">
          <Text fw={500} size="lg">Activity Tag #{activityTag.id}</Text>
          <Badge color="brand" variant="light">
            Activity #{activityTag.activityId}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          Tag ID: {activityTag.tagId}
        </Text>

        <Button
          variant="light"
          color="brand"
          fullWidth
          onClick={() => onEdit(activityTag.id)}
        >
          Edit Activity Tag
        </Button>
      </Stack>
    </Card>
  );
};

export default ActivityTagCard;