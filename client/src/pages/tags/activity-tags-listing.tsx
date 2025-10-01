import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, TagGetDto } from "../../constants/types";
import { ListingLayout } from "../../components/ListingLayout";
import ActivityTagCard from "./ActivityTagCard";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { CardSkeleton } from "../../components/CardSkeleton";

export const ActivityTagsListing = () => {
    const [tags, setTags] = useState<TagGetDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<{ opened: boolean; id: number | null; name: string }>({
        opened: false,
        id: null,
        name: ''
    });
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id: number) => {
        navigate(routes.activityTagUpdate.replace(":id", `${id}`));
    };

    const handleDelete = (id: number) => {
        const tag = tags?.find(t => t.id === id);
        if (tag) {
            setDeleteModal({
                opened: true,
                id: id,
                name: tag.name
            });
        }
    };

    const confirmDelete = async () => {
        if (!deleteModal.id) return;
        
        setDeleting(true);
        try {
            await axios.delete(`/api/tag/${deleteModal.id}`);
            
            setTags(prev => prev?.filter(t => t.id !== deleteModal.id));
            setDeleteModal({ opened: false, id: null, name: '' });
            
            showNotification({
                message: "Tag deleted successfully",
                color: "green"
            });
        } catch (error) {
            console.error('Error deleting tag:', error);
            showNotification({
                message: "Failed to delete tag",
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
                title="Tags"
                onAddClick={() => navigate(routes.activityTagCreate)}
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex justify-center w-full">
                        <CardSkeleton height={300} />
                    </div>
                ))}
            </ListingLayout>
        );
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
                        onDelete={handleDelete}
                    />
                </div>
            ))}
            
            <ConfirmationModal
                opened={deleteModal.opened}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                title="Delete Tag"
                message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
                loading={deleting}
            />
        </ListingLayout>
    );
};