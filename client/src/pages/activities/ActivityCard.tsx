// import { Card, Group, Text, Badge, Stack, Button, Flex, Image } from '@mantine/core';
// import { ActivityGetDto } from '../../constants/types';

// type ActivityCardProps = {
//   activity: ActivityGetDto;
//   onEdit: (id: number) => void;
// };

// const PriceBar = ({ price }: { price: number }) => {
//   const segments = 4;
//   const filledSegments = price <= 15 ? 1 : price <= 40 ? 2 : price <= 80 ? 3 : 4;
  
//   return (
//     <Group gap={4}>
//       <Text size="sm" fw={500}>Expected cost: ${price.toFixed(2)}</Text>
//       <Group gap={2}>
//         {Array.from({ length: segments }).map((_, i) => (
//           <div
//             key={i}
//             style={{
//               width: '20px',
//               height: '8px',
//               backgroundColor: i < filledSegments ? 'var(--mantine-color-brand-6)' : '#E9ECEF',
//               borderRadius: '2px'
//             }}
//           />
//         ))}
//       </Group>
//     </Group>
//   );
// };

// const getPriceRating = (products: ActivityGetDto['products']): number => {
//   const minSpend = products.reduce((min, product) => {
//     if (product.name.toLowerCase().includes('ticket') || 
//         product.name.toLowerCase().includes('admission') ||
//         product.name.toLowerCase().includes('menu')) {
//       return Math.min(min, product.price);
//     }
//     return min;
//   }, Infinity);

//   return minSpend;
// };

// const ActivityCard = ({ activity, onEdit }: ActivityCardProps) => {
//   return (
//     <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full">
//       <Stack gap="xs">
//         <Image
//           src={activity.imageUrl || "/api/placeholder/400/200"}
//           height={200}
//           alt={activity.name}
//           radius="md"
//           fallbackSrc="/api/placeholder/400/200"
//         />
        
//         <Badge color="brand" size="lg" radius="sm">
//           {activity.activityType?.name}
//         </Badge>

//         <Text fw={700} size="xl">
//           {activity.name}
//         </Text>

//         <Text size="sm" c="dimmed">
//           {activity.location?.name} • {activity.location?.city}, {activity.location?.state}
//         </Text>

//         <Text size="sm">
//           {new Date(activity.startTime).toLocaleDateString()} at{' '}
//           {new Date(activity.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//         </Text>

//         <Group mt="xs">
//           {activity.tags?.map(tag => (
//             <Badge key={tag.id} color="brand" variant="light">
//               {tag.name}
//             </Badge>
//           ))}
//         </Group>

//         <Text fw={500} size="sm" mt="md">
//           Available Products ({activity.products?.length || 0}):
//         </Text>
//         <div className="grid grid-cols-2 gap-2">
//           {activity.products?.map(product => (
//             <Card 
//               key={product.id}
//               padding="xs"
//               radius="md"
//               withBorder
//               className="bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
//             >
//               <Stack gap={2}>
//                 <Group justify="space-between" align="center">
//                   <Text size="sm" fw={500} className="line-clamp-1">
//                     {product.name}
//                   </Text>
//                   <Badge size="sm" variant="light" color="brand">
//                     ${product.price.toFixed(2)}
//                   </Badge>
//                 </Group>
//                 {product.description && (
//                   <Text size="xs" c="dimmed" className="line-clamp-2">
//                     {product.description}
//                   </Text>
//                 )}
//                 {product.locationName && (
//                   <Text size="xs" c="dimmed" className="italic">
//                     Available at: {product.locationName}
//                   </Text>
//                 )}
//               </Stack>
//             </Card>
//           ))}
//         </div>

//         <Flex justify="space-between" align="center" mt="md">
//           <PriceBar price={getPriceRating(activity.products)} />
//           <Button 
//             variant="light"
//             color="brand"
//             onClick={() => onEdit(activity.id)}
//           >
//             Edit Activity
//           </Button>
//         </Flex>
//       </Stack>
//     </Card>
//   );
// };

// export default ActivityCard;

import { Card, Group, Text, Badge, Stack, Button, Flex, Image } from '@mantine/core';
import { ActivityGetDto } from '../../constants/types';

type ActivityCardProps = {
  activity: ActivityGetDto;
  onEdit: (id: number) => void;
};

const PriceBar = ({ price }: { price: number }) => {
  const segments = 4;
  const filledSegments = price <= 15 ? 1 : price <= 40 ? 2 : price <= 80 ? 3 : 4;
  
  return (
    <Group gap={4}>
      <Text size="sm" fw={500}>Expected cost: ${price.toFixed(2)}</Text>
      <Group gap={2}>
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '20px',
              height: '8px',
              backgroundColor: i < filledSegments ? 'var(--mantine-color-brand-6)' : '#E9ECEF',
              borderRadius: '2px'
            }}
          />
        ))}
      </Group>
    </Group>
  );
};

const getPriceRating = (products: ActivityGetDto['products']): number => {
  if (!products || products.length === 0) return 0;
  
  const minSpend = products.reduce((min, product) => {
    if (product.name.toLowerCase().includes('ticket') || 
        product.name.toLowerCase().includes('admission') ||
        product.name.toLowerCase().includes('menu')) {
      return Math.min(min, product.price);
    }
    return min;
  }, Infinity);

  return minSpend === Infinity ? 0 : minSpend;
};

const ActivityCard = ({ activity, onEdit }: ActivityCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full">
      <Stack gap="xs">
        <div className="w-full h-[200px] relative overflow-hidden rounded-md">
          <Image
            src={activity.imageUrl || "/api/placeholder/400/200"}
            alt={activity.name}
            className="w-full h-full object-cover"
            fallbackSrc="/api/placeholder/400/200"
          />
        </div>
        
        <Badge color="brand" size="lg" radius="sm">
          {activity.activityType?.name}
        </Badge>

        <Text fw={700} size="xl">
          {activity.name}
        </Text>

        <Text size="sm" c="dimmed">
          {activity.location?.name} • {activity.location?.city}, {activity.location?.state}
        </Text>

        <Text size="sm">
          {new Date(activity.startTime).toLocaleDateString()} at{' '}
          {new Date(activity.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>

        <Group mt="xs">
          {activity.tags?.map(tag => (
            <Badge key={tag.id} color="brand" variant="light">
              {tag.name}
            </Badge>
          ))}
        </Group>

        {activity.products && activity.products.length > 0 && (
          <>
            <Text fw={500} size="sm" mt="md">
              Available Products ({activity.products.length}):
            </Text>
            <div className="grid grid-cols-2 gap-2">
              {activity.products.map(product => (
                <Card 
                  key={product.id}
                  padding="xs"
                  radius="md"
                  withBorder
                  className="bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
                >
                  <Stack gap={2}>
                    <Group justify="space-between" align="center">
                      <Text size="sm" fw={500} className="line-clamp-1">
                        {product.name}
                      </Text>
                      <Badge size="sm" variant="light" color="brand">
                        ${product.price.toFixed(2)}
                      </Badge>
                    </Group>
                    {product.description && (
                      <Text size="xs" c="dimmed" className="line-clamp-2">
                        {product.description}
                      </Text>
                    )}
                    {product.locationName && (
                      <Text size="xs" c="dimmed" className="italic">
                        Available at: {product.locationName}
                      </Text>
                    )}
                  </Stack>
                </Card>
              ))}
            </div>
          </>
        )}

        <PriceBar price={getPriceRating(activity.products)} />
        
        <Button 
          variant="light"
          color="brand"
          fullWidth
          onClick={() => onEdit(activity.id)}
          className="mt-4"
        >
          Edit Activity
        </Button>
      </Stack>
    </Card>
  );
};

export default ActivityCard;