import { Card, Group, Text, Badge, Button, Stack } from '@mantine/core';
import { LocationGetDto } from '../../constants/types';

type LocationCardProps = {
  location: LocationGetDto;
  onEdit: (id: number) => void;
};

const LocationCard = ({ location, onEdit }: LocationCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full max-w-[380px]">
      <Stack gap="xs">
        <Group justify="space-between">
          <Text fw={500} size="lg">{location.name}</Text>
          <Badge color="brand" variant="light">
            {location.state}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          {location.city}, {location.country}
        </Text>
        <Text size="sm">{location.description}</Text>

        <Button
          variant="light"
          color="brand"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => onEdit(location.id)}
        >
          Edit Location
        </Button>
      </Stack>
    </Card>
  );
};

export default LocationCard;