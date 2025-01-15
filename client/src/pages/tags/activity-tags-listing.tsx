import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, TagGetDto } from "../../constants/types";
import { ListingLayout } from "../../components/ListingLayout";
import ActivityTagCard from "./ActivityTagCard";

export const ActivityTagsListing = () => {
    const [tags, setTags] = useState<TagGetDto[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await axios.get<ApiResponse<TagGetDto[]>>("/api/tag");
            
            if (response.data.hasErrors) {
                showNotification({ 
                    message: "Error fetching tags", 
                    color: "red" 
                });
                return;
            }

            if (response.data.data) {
                console.log('Fetched tags:', response.data.data); // Debug log
                setTags(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching tags:', error);
            showNotification({ 
                message: "Failed to fetch tags", 
                color: "red" 
            });
        }
    };

    const handleEdit = (id: number) => {
        navigate(routes.activityTagUpdate.replace(":id", `${id}`));
    };

    // Add error boundary for debugging
    if (!tags) {
        return <div>No tags available</div>;
    }

    return (
        <ListingLayout 
            title="Tags"
            onAddClick={() => navigate(routes.activityTagCreate)}
        >
            {tags.map((tag) => (
                <div key={tag.id} className="flex justify-center w-full">
                    <ActivityTagCard
                        tag={tag}
                        onEdit={handleEdit}
                    />
                </div>
            ))}
        </ListingLayout>
    );
};