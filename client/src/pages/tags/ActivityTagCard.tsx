import { Card, Text, Stack, Button, Group } from "@mantine/core";
import { useState } from "react";
import { TagGetDto } from "../../constants/types";
import { ConfirmationModal } from "../../components/ConfirmationModal";

type ActivityTagCardProps = {
  tag: TagGetDto;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const ActivityTagCard = ({ tag, onEdit, onDelete }: ActivityTagCardProps) => {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  if (!tag) return null;

  const handleDeleteClick = () => {
    setDeleteModalOpened(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(tag.id);
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
      className="w-full h-full"
    >
      <Stack gap="xs">
        <Text fw={500} size="lg">
          {tag.name}
        </Text>

        <Text size="sm" c="dimmed">
          Used in Activities:
        </Text>
        <div className="flex flex-col gap-2">
          {tag.activities && tag.activities.length > 0 ? (
            tag.activities.map((activity) => (
              <Card
                key={activity.id}
                padding="xs"
                radius="md"
                withBorder
                className="bg-[#2C2E33] hover:bg-[#373A40] transition-colors duration-200"
              >
                <Stack gap={2}>
                  <Group justify="space-between" align="center">
                    <Text size="sm" fw={500} className="text-white">
                      {activity.name}
                    </Text>
                  </Group>
                  <Text size="xs" c="dimmed">
                    {`${activity.city}, ${activity.state}`}
                  </Text>
                  <Text size="xs" c="dimmed" className="italic">
                    {new Date(activity.startTime).toLocaleString()}
                  </Text>
                </Stack>
              </Card>
            ))
          ) : (
            <Text size="sm" c="dimmed" fs="italic">
              Not used in any activities
            </Text>
          )}
        </div>

        <Group gap="xs" mt="auto">
          <Button
            variant="light"
            color="brand"
            flex={1}
            onClick={() => onEdit(tag.id)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            color="red"
            flex={1}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Group>
      </Stack>

      <ConfirmationModal
        opened={deleteModalOpened}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Tag"
        message={`Are you sure you want to delete the tag "${tag.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
      />
    </Card>
  );
};

export default ActivityTagCard;
