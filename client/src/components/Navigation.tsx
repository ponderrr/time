// import { useNavigate } from 'react-router-dom';
// import { Group, Button } from '@mantine/core';
// import { routes } from '../routes';

// export const Navigation = () => {
//   const navigate = useNavigate();

//   return (
//     <Group justify="center" h="100%" px="xl">
//       <Button 
//         variant="subtle" 
//         color="brand"
//         onClick={() => navigate(routes.activityListing)}
//       >
//         Activities
//       </Button>
      
//       <Button 
//         variant="subtle"
//         color="brand"
//         onClick={() => navigate(routes.activityTypeListing)}
//       >
//         Activity Types
//       </Button>
      
//       <Button 
//         variant="subtle"
//         color="brand"
//         onClick={() => navigate(routes.locationListing)}
//       >
//         Locations
//       </Button>
      
//       <Button 
//         variant="subtle"
//         color="brand"
//         onClick={() => navigate(routes.productListing)}
//       >
//         Products
//       </Button>
      
//       <Button 
//         variant="subtle"
//         color="brand"
//         onClick={() => navigate(routes.activityTagListing)}
//       >
//         Tags
//       </Button>
//     </Group>
//   );
// };

// import { useNavigate } from 'react-router-dom';
// import { Group, Button, Box } from '@mantine/core';
// import { routes } from '../routes';

// const Logo = () => (
//   <svg 
//     width="40" 
//     height="40" 
//     viewBox="0 0 40 40" 
//     fill="none" 
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <rect width="40" height="40" rx="8" fill="#FFC300"/>
//     <path d="M10 20L20 10L30 20L20 30L10 20Z" fill="white"/>
//     <circle cx="20" cy="20" r="4" fill="#FFC300"/>
//   </svg>
// );

// interface NavigationProps {
//   isDark: boolean;
// }

// export const Navigation = ({ isDark }: NavigationProps) => {
//   const navigate = useNavigate();

//   return (
//     <Box className={`h-full px-4 flex items-center shadow-sm ${
//       isDark ? 'bg-[#1A1B1E]' : 'bg-white'
//     }`}>
//       <Logo />
//       <Group gap="md" ml="xl">
//         <Button 
//           variant="subtle" 
//           color="brand"
//           className={`hover:bg-yellow-50 focus:outline-none ${
//             isDark ? 'hover:bg-[#25262b]' : 'hover:bg-yellow-50'
//           }`}
//           onClick={() => navigate(routes.activityListing)}
//         >
//           Activities
//         </Button>
        
//         <Button 
//           variant="subtle"
//           color="brand"
//           className={`hover:bg-yellow-50 focus:outline-none ${
//             isDark ? 'hover:bg-[#25262b]' : 'hover:bg-yellow-50'
//           }`}
//           onClick={() => navigate(routes.activityTypeListing)}
//         >
//           Activity Types
//         </Button>
        
//         <Button 
//           variant="subtle"
//           color="brand"
//           className={`hover:bg-yellow-50 focus:outline-none ${
//             isDark ? 'hover:bg-[#25262b]' : 'hover:bg-yellow-50'
//           }`}
//           onClick={() => navigate(routes.locationListing)}
//         >
//           Locations
//         </Button>
        
//         <Button 
//           variant="subtle"
//           color="brand"
//           className={`hover:bg-yellow-50 focus:outline-none ${
//             isDark ? 'hover:bg-[#25262b]' : 'hover:bg-yellow-50'
//           }`}
//           onClick={() => navigate(routes.productListing)}
//         >
//           Products
//         </Button>
        
//         <Button 
//           variant="subtle"
//           color="brand"
//           className={`hover:bg-yellow-50 focus:outline-none ${
//             isDark ? 'hover:bg-[#25262b]' : 'hover:bg-yellow-50'
//           }`}
//           onClick={() => navigate(routes.activityTagListing)}
//         >
//           Tags
//         </Button>
//       </Group>
//     </Box>
//   );
// };

import { useNavigate } from 'react-router-dom';
import { Group, Button, Box, Image } from '@mantine/core';
import { routes } from '../routes';

export const Navigation = () => {
  const navigate = useNavigate();

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
    </Box>
  );
};