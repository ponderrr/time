import { Card, Group, Text, Badge, Stack, Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { ProductGetDto } from "../../constants/types";
import { ConfirmationModal } from "../../components/ConfirmationModal";

type ProductCardProps = {
  product: ProductGetDto;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const handleDeleteClick = () => {
    setDeleteModalOpened(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(product.id);
    setDeleteModalOpened(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpened(false);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="w-full max-w-[380px]"
    >
      <Stack gap="xs">
        <Group justify="space-between" mb="xs">
          <Text fw={500} size="lg">
            {product.name}
          </Text>
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

        <Group gap="xs" mt="md">
          <Button
            variant="light"
            color="brand"
            flex={1}
            onClick={() => onEdit(product.id)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            color="red"
            flex={1}
            onClick={handleDeleteClick}
            aria-label={`Delete product ${product.name}`}
            leftSection={<IconTrash size={16} />}
          >
            Delete
          </Button>
        </Group>
      </Stack>

      <ConfirmationModal
        opened={deleteModalOpened}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
      />
    </Card>
  );
};

export default ProductCard;
