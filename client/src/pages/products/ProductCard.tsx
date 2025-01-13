import { Card, Group, Text, Badge, Stack, Button } from '@mantine/core';
import { ProductGetDto } from '../../constants/types';

type ProductCardProps = {
  product: ProductGetDto;
  onEdit: (id: number) => void;
};

const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full max-w-[380px]">
      <Stack gap="xs">
        <Group justify="space-between" mb="xs">
          <Text fw={500} size="lg">{product.name}</Text>
          <Badge color="brand" variant="light">
            ${product.price.toFixed(2)}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          Location: {product.locationName}
        </Text>
        
        <Text size="sm">
          Stock: {product.expectedQuantity} (Min: {product.minQuantity})
        </Text>
        
        <Text size="sm" lineClamp={2}>
          {product.description}
        </Text>

        <Button
          variant="light"
          color="brand"
          fullWidth
          mt="md"
          onClick={() => onEdit(product.id)}
        >
          Edit Product
        </Button>
      </Stack>
    </Card>
  );
};

export default ProductCard;