import { Container, Button, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, ActivityGetDto } from "../../constants/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ActivityCard from "./ActivityCard";

export const ActivitiesListing = () => {
    const [activities, setActivities] = useState<ActivityGetDto[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchActivities();
    }, []);

    async function fetchActivities() {
        const response = await axios.get<ApiResponse<ActivityGetDto[]>>(
            "/api/activity"
        );

        if (response.data.hasErrors) {
            showNotification({ message: "Error fetching activities." });
        }

        if (response.data.data) {
            setActivities(response.data.data);
        }
    }

    const handleEdit = (id: number) => {
        navigate(routes.activityUpdate.replace(":id", `${id}`));
    };

    return (
        <Container>
            <Group justify="space-between" mb="xl">
                <h2 className="text-2xl font-bold">Activities</h2>
                <Button
                    variant="light"
                    color="blue"
                    onClick={() => navigate(routes.activityCreate)}
                    leftSection={<FontAwesomeIcon icon={faPlus} />}
                >
                    New Activity
                </Button>
            </Group>
            
            {activities && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {activities.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
};