import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Navigation } from './components/Navigation';
import { Login } from './pages/auth/login';

// Activities
import { ActivitiesListing } from './pages/activities/activities-listing';
import { ActivitiesCreate } from './pages/activities/activities-create';
import { ActivitiesUpdate } from './pages/activities/activities-update';

// Activity Types
import { ActivityTypesListing } from './pages/activity-types/activity-types-listing';
import { ActivityTypesCreate } from './pages/activity-types/activity-types-create';
import { ActivityTypesUpdate } from './pages/activity-types/activity-types-update';

// Locations
import { LocationsListing } from './pages/locations/locations-listing';
import { LocationsCreate } from './pages/locations/locations-create';
import { LocationsUpdate } from './pages/locations/locations-update';

// Products
import { ProductsListing } from './pages/products/products-listing';
import { ProductsCreate } from './pages/products/products-create';
import { ProductsUpdate } from './pages/products/products-update';

// Tags
import { ActivityTagsListing } from './pages/tags/activity-tags-listing';
import { ActivityTagsCreate } from './pages/tags/activity-tags-create';
import { ActivityTagsUpdate } from './pages/tags/activity-tags-update';

import { routes } from './routes';

function App() {
 return (
   <MantineProvider>
     <Notifications />
     <Router>
       <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/*" element={
           <>
             <Navigation />
             <Routes>
               {/* Activities */}
               <Route path={routes.activityListing} element={<ActivitiesListing />} />
               <Route path={routes.activityCreate} element={<ActivitiesCreate />} />
               <Route path={routes.activityUpdate} element={<ActivitiesUpdate />} />

               {/* Activity Types */}
               <Route path={routes.activityTypeListing} element={<ActivityTypesListing />} />
               <Route path={routes.activityTypeCreate} element={<ActivityTypesCreate />} />
               <Route path={routes.activityTypeUpdate} element={<ActivityTypesUpdate />} />

               {/* Locations */}
               <Route path={routes.locationListing} element={<LocationsListing />} />
               <Route path={routes.locationCreate} element={<LocationsCreate />} />
               <Route path={routes.locationUpdate} element={<LocationsUpdate />} />

               {/* Products */}
               <Route path={routes.productListing} element={<ProductsListing />} />
               <Route path={routes.productCreate} element={<ProductsCreate />} />
               <Route path={routes.productUpdate} element={<ProductsUpdate />} />

               {/* Tags */}
               <Route path={routes.activityTagListing} element={<ActivityTagsListing />} />
               <Route path={routes.activityTagCreate} element={<ActivityTagsCreate />} />
               <Route path={routes.activityTagUpdate} element={<ActivityTagsUpdate />} />

               {/* Default route */}
               <Route path="/" element={<Navigate to="/login" />} />
             </Routes>
           </>
         } />
       </Routes>
     </Router>
   </MantineProvider>
 );
}

export default App;