import { Card, Group, Text, Badge, Button, Stack } from '@mantine/core';
import { LocationGetDto } from '../../constants/types';

type LocationCardProps = {
  location: LocationGetDto;
  onEdit: (id: number) => void;
};

const LocationCard = ({ location, onEdit }: LocationCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500}>{location.name}</Text>
        <Badge color="blue" variant="light">
          {location.state}
        </Badge>
      </Group>

      <Stack gap="xs">
        <Text size="sm" c="dimmed">
          {location.city}, {location.country}
        </Text>
        <Text size="sm">{location.description}</Text>
      </Stack>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => onEdit(location.id)}
      >
        Edit Location
      </Button>
    </Card>
  );
};

export default LocationCard;