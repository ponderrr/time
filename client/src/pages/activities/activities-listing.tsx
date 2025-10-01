import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, ActivityGetDto } from "../../constants/types";
import ActivityCard from "./ActivityCard";
import { ListingLayout } from "../../components/ListingLayout";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { CardSkeleton } from "../../components/CardSkeleton";
import { showErrorNotification, showSuccessNotification } from "../../utils/errorHandler";

export const ActivitiesListing = () => {
    const [activities, setActivities] = useState<ActivityGetDto[]>();
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<{ opened: boolean; id: number | null; name: string }>({
        opened: false,
        id: null,
        name: ''
    });
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchActivities();
    }, []);

    async function fetchActivities() {
        setLoading(true);
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
            showErrorNotification(error, "Failed to fetch activities");
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (id: number) => {
        navigate(routes.activityUpdate.replace(":id", `${id}`));
    };

    const handleDelete = (id: number) => {
        const activity = activities?.find(a => a.id === id);
        if (activity) {
            setDeleteModal({
                opened: true,
                id: id,
                name: activity.name
            });
        }
    };

    const confirmDelete = async () => {
        if (!deleteModal.id) return;
        
        setDeleting(true);
        try {
            await axios.delete(`/api/activity/${deleteModal.id}`);
            
            setActivities(prev => prev?.filter(a => a.id !== deleteModal.id));
            setDeleteModal({ opened: false, id: null, name: '' });
            
            showSuccessNotification("Activity deleted successfully");
        } catch (error) {
            showErrorNotification(error, "Failed to delete activity");
        } finally {
            setDeleting(false);
        }
    };

    const closeDeleteModal = () => {
        setDeleteModal({ opened: false, id: null, name: '' });
    };

    if (loading) {
        return (
            <ListingLayout 
                title="Activities"
                onAddClick={() => navigate(routes.activityCreate)}
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex justify-center w-full">
                        <CardSkeleton height={400} />
                    </div>
                ))}
            </ListingLayout>
        );
    }

    return (
        <ListingLayout 
            title="Activities"
            onAddClick={() => navigate(routes.activityCreate)}
        >
            {activities?.map((activity) => (
                <div key={activity.id} className="flex justify-center w-full">
                    <ActivityCard
                        activity={activity}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            ))}
            
            <ConfirmationModal
                opened={deleteModal.opened}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                title="Delete Activity"
                message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
                loading={deleting}
            />
        </ListingLayout>
    );
};