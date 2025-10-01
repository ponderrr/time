import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, ActivityTypeGetDto } from "../../constants/types";
import ActivityTypeCard from "./ActivityTypeCard";
import { ListingLayout } from "../../components/ListingLayout";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { CardSkeleton } from "../../components/CardSkeleton";

export const ActivityTypesListing = () => {
    const [activityTypes, setActivityTypes] = useState<ActivityTypeGetDto[]>();
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<{ opened: boolean; id: number | null; name: string }>({
        opened: false,
        id: null,
        name: ''
    });
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchActivityTypes();
    }, []);

    async function fetchActivityTypes() {
        setLoading(true);
        try {
            const response = await axios.get<ApiResponse<ActivityTypeGetDto[]>>(
                "/api/activitytype"
            );

            if (response.data.hasErrors) {
                showNotification({ message: "Error fetching activity types." });
                return;
            }

            if (response.data.data) {
                setActivityTypes(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching activity types:', error);
            showNotification({ 
                message: "Failed to fetch activity types.", 
                color: "red" 
            });
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (id: number) => {
        navigate(routes.activityTypeUpdate.replace(":id", `${id}`));
    };

    const handleDelete = (id: number) => {
        const activityType = activityTypes?.find(at => at.id === id);
        if (activityType) {
            setDeleteModal({
                opened: true,
                id: id,
                name: activityType.name
            });
        }
    };

    const confirmDelete = async () => {
        if (!deleteModal.id) return;
        
        setDeleting(true);
        try {
            await axios.delete(`/api/activitytype/${deleteModal.id}`);
            
            setActivityTypes(prev => prev?.filter(at => at.id !== deleteModal.id));
            setDeleteModal({ opened: false, id: null, name: '' });
            
            showNotification({
                message: "Activity type deleted successfully",
                color: "green"
            });
        } catch (error) {
            console.error('Error deleting activity type:', error);
            showNotification({
                message: "Failed to delete activity type",
                color: "red"
            });
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
                title="Activity Types"
                onAddClick={() => navigate(routes.activityTypeCreate)}
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex justify-center w-full">
                        <CardSkeleton height={200} />
                    </div>
                ))}
            </ListingLayout>
        );
    }

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
                        onDelete={handleDelete}
                    />
                </div>
            ))}
            
            <ConfirmationModal
                opened={deleteModal.opened}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                title="Delete Activity Type"
                message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
                loading={deleting}
            />
        </ListingLayout>
    );
};