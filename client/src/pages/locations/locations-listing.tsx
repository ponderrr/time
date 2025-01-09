import { Container } from "@mantine/core";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, LocationGetDto } from "../../constants/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
        <Container>
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Locations</h2>
                <button
                    onClick={() => navigate(routes.locationCreate)}
                    className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>New Location</span>
                </button>
            </div>
            
            {locations && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {locations.map((location) => (
                        <LocationCard
                            key={location.id}
                            location={location}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
};