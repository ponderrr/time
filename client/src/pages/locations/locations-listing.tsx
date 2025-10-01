import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, LocationGetDto } from "../../constants/types";
import { ListingLayout } from "../../components/ListingLayout";
import LocationCard from "./LocationCard";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { CardSkeleton } from "../../components/CardSkeleton";

export const LocationsListing = () => {
    const [locations, setLocations] = useState<LocationGetDto[]>();
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<{ opened: boolean; id: number | null; name: string }>({
        opened: false,
        id: null,
        name: ''
    });
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLocations();
    }, []);

    async function fetchLocations() {
        setLoading(true);
        try {
            const response = await axios.get<ApiResponse<LocationGetDto[]>>(
                "/api/location"
            );

            if (response.data.hasErrors) {
                showNotification({ message: "Error fetching locations." });
                return;
            }

            if (response.data.data) {
                setLocations(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
            showNotification({ 
                message: "Failed to fetch locations.", 
                color: "red" 
            });
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (id: number) => {
        navigate(routes.locationUpdate.replace(":id", `${id}`));
    };

    const handleDelete = (id: number) => {
        const location = locations?.find(l => l.id === id);
        if (location) {
            setDeleteModal({
                opened: true,
                id: id,
                name: location.name
            });
        }
    };

    const confirmDelete = async () => {
        if (!deleteModal.id) return;
        
        setDeleting(true);
        try {
            await axios.delete(`/api/location/${deleteModal.id}`);
            
            setLocations(prev => prev?.filter(l => l.id !== deleteModal.id));
            setDeleteModal({ opened: false, id: null, name: '' });
            
            showNotification({
                message: "Location deleted successfully",
                color: "green"
            });
        } catch (error) {
            console.error('Error deleting location:', error);
            showNotification({
                message: "Failed to delete location",
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
                title="Locations"
                onAddClick={() => navigate(routes.locationCreate)}
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex justify-center w-full">
                        <CardSkeleton height={250} />
                    </div>
                ))}
            </ListingLayout>
        );
    }

    return (
        <ListingLayout 
            title="Locations"
            onAddClick={() => navigate(routes.locationCreate)}
        >
            {locations?.map((location) => (
                <div key={location.id} className="flex justify-center w-full">
                    <LocationCard
                        location={location}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            ))}
            
            <ConfirmationModal
                opened={deleteModal.opened}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                title="Delete Location"
                message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
                loading={deleting}
            />
        </ListingLayout>
    );
};