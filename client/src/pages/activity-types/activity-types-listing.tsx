import { Container, Button, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, ActivityTypeGetDto } from "../../constants/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ActivityTypeCard from "./ActivityTypeCard";

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
        <Container>
            <Group justify="space-between" mb="xl">
                <h2 className="text-2xl font-bold">Activity Types</h2>
                <Button
                    variant="light"
                    color="blue"
                    onClick={() => navigate(routes.activityTypeCreate)}
                    leftSection={<FontAwesomeIcon icon={faPlus} />}
                >
                    New Activity Type
                </Button>
            </Group>
            
            {activityTypes && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {activityTypes.map((activityType) => (
                        <ActivityTypeCard
                            key={activityType.id}
                            activityType={activityType}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
};