import { Card, Group, Text, Badge, Button, Stack } from '@mantine/core';
import { ProductGetDto } from '../../constants/types';

type ProductCardProps = {
  product: ProductGetDto;
  onEdit: (id: number) => void;
};

const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500}>{product.name}</Text>
        <Badge color="green" variant="light">
          ${product.price.toFixed(2)}
        </Badge>
      </Group>

      <Stack gap="xs">
        <Text size="sm" c="dimmed">
          Location: {product.locationName}
        </Text>
        <Text size="sm">
          Stock: {product.expectedQuantity} (Min: {product.minQuantity})
        </Text>
        <Text size="sm" lineClamp={2}>
          {product.description}
        </Text>
      </Stack>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => onEdit(product.id)}
      >
        Edit Product
      </Button>
    </Card>
  );
};

export default ProductCard;