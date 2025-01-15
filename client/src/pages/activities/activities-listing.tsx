// import { useEffect, useState } from "react";
// import { showNotification } from "@mantine/notifications";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { routes } from "../../routes";
// import { ApiResponse, ActivityGetDto } from "../../constants/types";
// import ActivityCard from "./ActivityCard";
// import { ListingLayout } from "../../components/ListingLayout";

// export const ActivitiesListing = () => {
//     const [activities, setActivities] = useState<ActivityGetDto[]>();
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchActivities();
//     }, []);

//     async function fetchActivities() {
//         const response = await axios.get<ApiResponse<ActivityGetDto[]>>(
//             "/api/activity"
//         );

//         if (response.data.hasErrors) {
//             showNotification({ message: "Error fetching activities." });
//         }

//         if (response.data.data) {
//             setActivities(response.data.data);
//         }
//     }

//     const handleEdit = (id: number) => {
//         navigate(routes.activityUpdate.replace(":id", `${id}`));
//     };

//     return (
//         <ListingLayout 
//             title="Activities"
//             onAddClick={() => navigate(routes.activityCreate)}
//         >
//             {activities?.map((activity) => (
//                 <div key={activity.id} className="flex justify-center w-full">
//                     <ActivityCard
//                         activity={activity}
//                         onEdit={handleEdit}
//                     />
//                 </div>
//             ))}
//         </ListingLayout>
//     );
// };

import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, ActivityGetDto } from "../../constants/types";
import ActivityCard from "./ActivityCard";
import { ListingLayout } from "../../components/ListingLayout";

export const ActivitiesListing = () => {
    const [activities, setActivities] = useState<ActivityGetDto[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchActivities();
    }, []);

    async function fetchActivities() {
        try {
            const response = await axios.get<ApiResponse<ActivityGetDto[]>>("/api/activity");

            if (response.data.hasErrors) {
                showNotification({ 
                    message: "Error fetching activities.", 
                    color: "red" 
                });
                return;
            }

            if (response.data.data) {
                console.log('Fetched activities:', response.data.data); // Debug log
                setActivities(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching activities:', error);
            showNotification({ 
                message: "Failed to fetch activities.", 
                color: "red" 
            });
        }
    }

    const handleEdit = (id: number) => {
        navigate(routes.activityUpdate.replace(":id", `${id}`));
    };

    return (
        <ListingLayout 
            title="Activity"
            onAddClick={() => navigate(routes.activityCreate)}
        >
            {activities?.map((activity) => (
                <div key={activity.id} className="flex justify-center w-full">
                    <ActivityCard
                        activity={activity}
                        onEdit={handleEdit}
                    />
                </div>
            ))}
        </ListingLayout>
    );
};