import { Loader, Center, Stack, Text } from '@mantine/core';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  fullHeight?: boolean;
}

export const LoadingSpinner = ({ 
  size = 'md', 
  message = 'Loading...', 
  fullHeight = false 
}: LoadingSpinnerProps) => {
  const content = (
    <Stack align="center" gap="md">
      <Loader size={size} />
      {message && <Text size="sm" c="dimmed">{message}</Text>}
    </Stack>
  );

  if (fullHeight) {
    return (
      <Center style={{ height: '200px' }}>
        {content}
      </Center>
    );
  }

  return content;
};
