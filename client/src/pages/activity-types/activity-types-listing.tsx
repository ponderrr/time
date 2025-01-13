import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, ActivityTypeGetDto } from "../../constants/types";
import ActivityTypeCard from "./ActivityTypeCard";
import { ListingLayout } from "../../components/ListingLayout";

export const ActivityTypesListing = () => {
    const [activityTypes, setActivityTypes] = useState<ActivityTypeGetDto[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchActivityTypes();
    }, []);

    async function fetchActivityTypes() {
        const response = await axios.get<ApiResponse<ActivityTypeGetDto[]>>(
            "/api/activitytype"
        );

        if (response.data.hasErrors) {
            showNotification({ message: "Error fetching activity types." });
        }

        if (response.data.data) {
            setActivityTypes(response.data.data);
        }
    }

    const handleEdit = (id: number) => {
        navigate(routes.activityTypeUpdate.replace(":id", `${id}`));
    };

    return (
        <ListingLayout 
            title="Activity Types"
            onAddClick={() => navigate(routes.activityTypeCreate)}
        >
            {activityTypes?.map((activityType) => (
                <div key={activityType.id} className="flex justify-center w-full">
                    <ActivityTypeCard
                        activityType={activityType}
                        onEdit={handleEdit}
                    />
                </div>
            ))}
        </ListingLayout>
    );
};