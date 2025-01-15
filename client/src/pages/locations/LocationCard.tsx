import { Card, Group, Text, Badge, Stack, Button } from '@mantine/core';
import { LocationGetDto } from '../../constants/types';

type LocationCardProps = {
  location: LocationGetDto;
  onEdit: (id: number) => void;
};

const LocationCard = ({ location, onEdit }: LocationCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full max-w-[380px]">
      <Stack gap="xs">
        <Group justify="space-between" align="start">
          <Text fw={500} size="lg">{location.name}</Text>
          <Badge color="brand" variant="light">
            {location.country}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          {location.city}, {location.state}
        </Text>
        
        <Text size="sm" mt="xs">{location.description}</Text>

        <Button
          variant="light"
          color="brand"
          fullWidth
          mt="auto"
          onClick={() => onEdit(location.id)}
        >
          Edit Location
        </Button>
      </Stack>
    </Card>
  );
};

export default LocationCard;