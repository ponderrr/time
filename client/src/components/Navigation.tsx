import { useNavigate } from 'react-router-dom';
import { Group, Button, Box, Image, Text } from '@mantine/core';
import { routes } from '../routes';
import { useAuth } from '../contexts/AuthContext';

export const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <Box className="h-[60px] bg-[#1A1B1E] px-4 flex items-center shadow-sm">
      <div className="w-[150px] h-[40px] flex items-center justify-start">
        <div className="w-full h-full flex items-center">
          <Image
            src="/admin-portal-logo.png"
            alt="Admin Portal"
            fit="contain"
            className="max-h-full"
            styles={{
              root: { height: '100%' }
            }}
          />
        </div>
      </div>
      <Group gap="md" ml="xl" className="flex-grow">
        <Button 
          variant="subtle" 
          className="text-white hover:bg-[#25262b] focus:outline-none"
          onClick={() => navigate(routes.activityListing)}
        >
          Activities
        </Button>
        
        <Button 
          variant="subtle"
          className="text-white hover:bg-[#25262b] focus:outline-none"
          onClick={() => navigate(routes.activityTypeListing)}
        >
          Activity Types
        </Button>
        
        <Button 
          variant="subtle"
          className="text-white hover:bg-[#25262b] focus:outline-none"
          onClick={() => navigate(routes.locationListing)}
        >
          Locations
        </Button>
        
        <Button 
          variant="subtle"
          className="text-white hover:bg-[#25262b] focus:outline-none"
          onClick={() => navigate(routes.productListing)}
        >
          Products
        </Button>
        
        <Button 
          variant="subtle"
          className="text-white hover:bg-[#25262b] focus:outline-none"
          onClick={() => navigate(routes.activityTagListing)}
        >
          Tags
        </Button>
      </Group>
      
      <Group gap="md">
        <Text size="sm" c="white">
          Welcome, {user?.username}
        </Text>
        <Button 
          variant="outline"
          color="red"
          size="sm"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout
        </Button>
      </Group>
    </Box>
  );
};