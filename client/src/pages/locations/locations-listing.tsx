import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, LocationGetDto } from "../../constants/types";
import { ListingLayout } from "../../components/ListingLayout";
import LocationCard from "./LocationCard";

export const LocationsListing = () => {
    const [locations, setLocations] = useState<LocationGetDto[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchLocations();
    }, []);

    async function fetchLocations() {
        const response = await axios.get<ApiResponse<LocationGetDto[]>>(
            "/api/location"
        );

        if (response.data.hasErrors) {
            showNotification({ message: "Error fetching locations." });
        }

        if (response.data.data) {
            setLocations(response.data.data);
        }
    }

    const handleEdit = (id: number) => {
        navigate(routes.locationUpdate.replace(":id", `${id}`));
    };

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
                    />
                </div>
            ))}
        </ListingLayout>
    );
};