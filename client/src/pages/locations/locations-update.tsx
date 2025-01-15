import { Container, TextInput, Button, Space, Flex } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ApiResponse, LocationCreateUpdateDto, LocationGetDto } from "../../constants/types";
import { routes } from "../../routes";

export const LocationsUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const form = useForm<LocationCreateUpdateDto>({
        initialValues: {
            name: "",
            city: "",
            state: "",
            country: "",
            description: "",
        },
        validate: {
            name: (value) => (!value ? "Name is required" : null),
            city: (value) => (!value ? "City is required" : null),
            state: (value) => (!value ? "State is required" : null),
            country: (value) => (!value ? "Country is required" : null),
            description: (value) => (!value ? "Description is required" : null),
        },
    });

    useEffect(() => {
        fetchLocation();
    }, [id]);

    const fetchLocation = async () => {
        const response = await axios.get<ApiResponse<LocationGetDto>>(
            `/api/location/${id}`
        );

        if (response.data.hasErrors) {
            showNotification({
                message: "Error fetching location",
                color: "red",
            });
            return;
        }

        form.setValues(response.data.data);
    };

    const handleSubmit = async (values: LocationCreateUpdateDto) => {
        const response = await axios.put<ApiResponse<LocationCreateUpdateDto>>(
            `/api/location/${id}`,
            values
        );

        if (response.data.hasErrors) {
            const formErrors: FormErrors = response.data.errors.reduce(
                (prev, curr) => {
                    Object.assign(prev, { [curr.property]: curr.message });
                    return prev;
                },
                {} as FormErrors
            );
            form.setErrors(formErrors);
            return;
        }

        showNotification({
            message: "Location updated successfully",
            color: "green",
        });
        navigate(routes.locationListing);
    };

    return (
        <Container>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Name"
                    placeholder="Enter location name"
                    {...form.getInputProps("name")}
                    required
                />
                <TextInput
                    label="City"
                    placeholder="Enter city"
                    {...form.getInputProps("city")}
                    mt="md"
                    required
                />
                <TextInput
                    label="State"
                    placeholder="Enter state"
                    {...form.getInputProps("state")}
                    mt="md"
                    required
                />
                <TextInput
                    label="Country"
                    placeholder="Enter country"
                    {...form.getInputProps("country")}
                    mt="md"
                    required
                />
                <TextInput
                    label="Description"
                    placeholder="Enter description"
                    {...form.getInputProps("description")}
                    mt="md"
                    required
                />
                <Space h="md" />
                <Flex gap="md">
                    <Button 
                        type="submit"
                        variant="outline"
                        color="green"
                    >
                        Update Location
                    </Button>
                    <Button 
                        variant="outline"
                        color="red"
                        onClick={() => navigate(routes.locationListing)}
                    >
                        Cancel
                    </Button>
                </Flex>
            </form>
        </Container>
    );
};