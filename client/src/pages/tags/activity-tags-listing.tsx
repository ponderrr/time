// import { Container, Button, Group, Box } from "@mantine/core";
// import { useEffect, useState } from "react";
// import { showNotification } from "@mantine/notifications";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { routes } from "../../routes";
// import { ApiResponse, ActivityTagGetDto } from "../../constants/types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import ActivityTagCard from "./ActivityTagCard";

// export const ActivityTagsListing = () => {
//     const [activityTags, setActivityTags] = useState<ActivityTagGetDto[]>();
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchActivityTags();
//     }, []);

//     async function fetchActivityTags() {
//         const response = await axios.get<ApiResponse<ActivityTagGetDto[]>>(
//             "/api/activitytag"
//         );

//         if (response.data.hasErrors) {
//             showNotification({ message: "Error fetching activity tags." });
//         }

//         if (response.data.data) {
//             setActivityTags(response.data.data);
//         }
//     }

//     const handleEdit = (id: number) => {
//         navigate(routes.activityTagUpdate.replace(":id", `${id}`));
//     };

//     return (
//         <Container size="lg">
//             <Group justify="space-between" mb="xl">
//                 <h2 className="text-2xl font-bold">Activity Tags</h2>
//                 <Button
//                     variant="light"
//                     color="brand"
//                     onClick={() => navigate(routes.activityTagCreate)}
//                     leftSection={<FontAwesomeIcon icon={faPlus} />}
//                 >
//                     New Activity Tag
//                 </Button>
//             </Group>
            
//             <Box mx="auto" style={{ maxWidth: '1200px' }}>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
//                     {activityTags?.map((activityTag) => (
//                         <ActivityTagCard
//                             key={activityTag.id}
//                             activityTag={activityTag}
//                             onEdit={handleEdit}
//                         />
//                     ))}
//                 </div>
//             </Box>
//         </Container>
//     );
// };

import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, ActivityTagGetDto } from "../../constants/types";
import ActivityTagCard from "./ActivityTagCard";
import { ListingLayout } from "../../components/ListingLayout";

export const ActivityTagsListing = () => {
    const [activityTags, setActivityTags] = useState<ActivityTagGetDto[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchActivityTags();
    }, []);

    async function fetchActivityTags() {
        const response = await axios.get<ApiResponse<ActivityTagGetDto[]>>(
            "/api/activitytag"
        );

        if (response.data.hasErrors) {
            showNotification({ message: "Error fetching activity tags." });
        }

        if (response.data.data) {
            setActivityTags(response.data.data);
        }
    }

    const handleEdit = (id: number) => {
        navigate(routes.activityTagUpdate.replace(":id", `${id}`));
    };

    return (
        <ListingLayout 
            title="Activity Tags"
            onAddClick={() => navigate(routes.activityTagCreate)}
        >
            {activityTags?.map((activityTag) => (
                <div key={activityTag.id} className="flex justify-center w-full">
                    <ActivityTagCard
                        activityTag={activityTag}
                        onEdit={handleEdit}
                    />
                </div>
            ))}
        </ListingLayout>
    );
};