import { Card, Skeleton, Stack, Group } from '@mantine/core';

interface CardSkeletonProps {
  height?: number;
  showButtons?: boolean;
}

export const CardSkeleton = ({ height = 300, showButtons = true }: CardSkeletonProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full">
      <Stack gap="xs">
        <Skeleton height={200} radius="md" />
        
        <Skeleton height={20} width="60%" radius="sm" />
        
        <Skeleton height={16} width="80%" radius="sm" />
        
        <Skeleton height={16} width="70%" radius="sm" />
        
        <Group gap="xs" mt="xs">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} height={16} width={60} radius="sm" />
          ))}
        </Group>
        
        <Skeleton height={16} width="90%" radius="sm" mt="md" />
        
        {showButtons && (
          <Group gap="xs" mt="md">
            <Skeleton height={36} flex={1} radius="sm" />
            <Skeleton height={36} flex={1} radius="sm" />
          </Group>
        )}
      </Stack>
    </Card>
  );
};
