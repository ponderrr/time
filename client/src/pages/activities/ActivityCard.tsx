import { Card, Group, Text, Badge, Stack, Flex, Button, Image } from '@mantine/core';
import { ActivityGetDto } from '../../constants/types';

type ActivityCardProps = {
  activity: ActivityGetDto;
  onEdit: (id: number) => void;
};

const PriceBar = ({ price }: { price: number }) => {
  const segments = 4;
  const filledSegments = price <= 15 ? 1 : price <= 40 ? 2 : price <= 80 ? 3 : 4;
  
  return (
    <Group gap={4}>
      <Text size="sm" fw={500}>Expected cost: ${price.toFixed(2)}</Text>
      <Group gap={2}>
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '20px',
              height: '8px',
              backgroundColor: i < filledSegments ? '#228BE6' : '#E9ECEF',
              borderRadius: '2px'
            }}
          />
        ))}
      </Group>
    </Group>
  );
};

const getPriceRating = (products: ActivityGetDto['products']): number => {
  const minSpend = products.reduce((min, product) => {
    if (product.name.toLowerCase().includes('ticket') || 
        product.name.toLowerCase().includes('admission') ||
        product.name.toLowerCase().includes('menu')) {
      return Math.min(min, product.price);
    }
    return min;
  }, Infinity);

  return minSpend;
};

const ActivityCard = ({ activity, onEdit }: ActivityCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full">
      <Stack gap="xs">
        <Image
          src={activity.imageUrl || "/api/placeholder/400/200"}
          height={200}
          alt={activity.name}
          radius="md"
          fallbackSrc="/api/placeholder/400/200"
        />
        
        <Badge color="blue" size="lg" radius="sm">
          {activity.activityType?.name}
        </Badge>

        <Text fw={700} size="xl">
          {activity.name}
        </Text>

        <Text size="sm" c="dimmed">
          {activity.location?.name} • {activity.location?.city}, {activity.location?.state}
        </Text>

        <Text size="sm">
          {new Date(activity.startTime).toLocaleDateString()} at{' '}
          {new Date(activity.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>

        <Group mt="xs">
          {activity.tags?.map(tag => (
            <Badge key={tag.id} color="gray" variant="light">
              {tag.name}
            </Badge>
          ))}
        </Group>

        <Text fw={500} size="sm" mt="md">
  Available Products ({activity.products?.length || 0}):
</Text>
<div className="grid grid-cols-2 gap-2">
  {activity.products?.map(product => (
    <Card 
      key={product.id}
      padding="xs"
      radius="md"
      withBorder
      className="bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
    >
      <Stack gap={2}>
        <Group justify="space-between" align="center">
          <Text size="sm" fw={500} className="line-clamp-1">
            {product.name}
          </Text>
          <Badge size="sm" variant="light">
            ${product.price.toFixed(2)}
          </Badge>
        </Group>
        {product.description && (
          <Text size="xs" c="dimmed" className="line-clamp-2">
            {product.description}
          </Text>
        )}
        {product.locationName && (
          <Text size="xs" c="dimmed" className="italic">
            Available at: {product.locationName}
          </Text>
        )}
      </Stack>
    </Card>
  ))}
</div>

        <Flex justify="space-between" align="center" mt="md">
          <PriceBar price={getPriceRating(activity.products)} />
          <Button 
            variant="light"
            color="blue"
            onClick={() => onEdit(activity.id)}
          >
            Edit Activity
          </Button>
        </Flex>
      </Stack>
    </Card>
  );
};

export default ActivityCard;