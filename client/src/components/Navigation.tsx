import { Group, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Group p="md" bg="gray.1">
      <Button variant="subtle" onClick={() => navigate(routes.activityListing)}>
        Activities
      </Button>
      <Button variant="subtle" onClick={() => navigate(routes.activityTypeListing)}>
        Activity Types
      </Button>
      <Button variant="subtle" onClick={() => navigate(routes.locationListing)}>
        Locations
      </Button>
      <Button variant="subtle" onClick={() => navigate(routes.productListing)}>
        Products
      </Button>
      <Button variant="subtle" onClick={() => navigate(routes.activityTagListing)}>
        Tags
      </Button>
    </Group>
  );
};