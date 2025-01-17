import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, AppShell, ActionIcon, Box } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useState } from 'react';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Navigation } from './components/Navigation';
import { theme } from './theme';
import { Login } from './pages/auth/login';

// Import your page components
import { ActivitiesListing } from './pages/activities/activities-listing';
import { ActivitiesCreate } from './pages/activities/activities-create';
import { ActivitiesUpdate } from './pages/activities/activities-update';
import { ActivityTypesListing } from './pages/activity-types/activity-types-listing';
import { ActivityTypesCreate } from './pages/activity-types/activity-types-create';
import { ActivityTypesUpdate } from './pages/activity-types/activity-types-update';
import { LocationsListing } from './pages/locations/locations-listing';
import { LocationsCreate } from './pages/locations/locations-create';
import { LocationsUpdate } from './pages/locations/locations-update';
import { ProductsListing } from './pages/products/products-listing';
import { ProductsCreate } from './pages/products/products-create';
import { ProductsUpdate } from './pages/products/products-update';
import { ActivityTagsListing } from './pages/tags/activity-tags-listing';
import { ActivityTagsCreate } from './pages/tags/activity-tags-create';
import { ActivityTagsUpdate } from './pages/tags/activity-tags-update';

import { routes } from './routes';

function App() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  const toggleColorScheme = () => {
    setColorScheme(previous => previous === 'dark' ? 'light' : 'dark');
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme={colorScheme}>
      <Notifications />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <AppShell
                header={{ height: 60 }}
                padding="md"
              >
                <AppShell.Header>
                  <Navigation />
                </AppShell.Header>
              
              <AppShell.Main className="bg-[#1A1B1E]">
                  <Box className="w-full">
                    <Box className="w-full">
                      <Routes>
                        <Route path={routes.activityListing} element={<ActivitiesListing />} />
                        <Route path={routes.activityCreate} element={<ActivitiesCreate />} />
                        <Route path={routes.activityUpdate} element={<ActivitiesUpdate />} />
                        
                        <Route path={routes.activityTypeListing} element={<ActivityTypesListing />} />
                        <Route path={routes.activityTypeCreate} element={<ActivityTypesCreate />} />
                        <Route path={routes.activityTypeUpdate} element={<ActivityTypesUpdate />} />
                        
                        <Route path={routes.locationListing} element={<LocationsListing />} />
                        <Route path={routes.locationCreate} element={<LocationsCreate />} />
                        <Route path={routes.locationUpdate} element={<LocationsUpdate />} />
                        
                        <Route path={routes.productListing} element={<ProductsListing />} />
                        <Route path={routes.productCreate} element={<ProductsCreate />} />
                        <Route path={routes.productUpdate} element={<ProductsUpdate />} />
                        
                        <Route path={routes.activityTagListing} element={<ActivityTagsListing />} />
                        <Route path={routes.activityTagCreate} element={<ActivityTagsCreate />} />
                        <Route path={routes.activityTagUpdate} element={<ActivityTagsUpdate />} />
                        
                        <Route path="/" element={<Navigate to="/login" />} />
                      </Routes>
                    </Box>
                  </Box>
                </AppShell.Main>
              </AppShell>
            }
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;