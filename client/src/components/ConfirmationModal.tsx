import { Modal, Button, Text, Group, Stack } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

interface ConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
  loading?: boolean;
}

export const ConfirmationModal = ({
  opened,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  confirmColor = "red",
  loading = false,
}: ConfirmationModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={loading ? () => {} : onClose}
      closeOnEscape={!loading}
      closeOnClickOutside={!loading}
      withCloseButton={!loading}
      title={
        <Group gap="xs">
          <IconAlertTriangle size={20} color="var(--mantine-color-red-6)" />
          <Text fw={600}>{title}</Text>
        </Group>
      }
      centered
      size="sm"
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          {message}
        </Text>

        <Group justify="flex-end" gap="xs">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button color={confirmColor} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
