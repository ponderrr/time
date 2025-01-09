import { Container, TextInput, Button, Space, Flex } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiResponse, LocationCreateUpdateDto } from "../../constants/types";
import { routes } from "../../routes";

export const LocationsCreate = () => {
    const navigate = useNavigate();
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
        },
    });

    const handleSubmit = async (values: LocationCreateUpdateDto) => {
        const response = await axios.post<ApiResponse<LocationCreateUpdateDto>>(
            "/api/location",
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
            message: "Location created successfully",
            color: "green",
        });
        navigate(routes.locationListing);
    };

    return (
        <Container>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Name"
                    {...form.getInputProps("name")}
                    required
                />
                <TextInput
                    label="City"
                    {...form.getInputProps("city")}
                    mt="md"
                />
                <TextInput
                    label="State"
                    {...form.getInputProps("state")}
                    mt="md"
                />
                <TextInput
                    label="Country"
                    {...form.getInputProps("country")}
                    mt="md"
                />
                <TextInput
                    label="Description"
                    {...form.getInputProps("description")}
                    mt="md"
                />
                <Space h="md" />
                <Flex gap="md">
                    <Button type="submit">Create Location</Button>
                    <Button variant="light" onClick={() => navigate(routes.locationListing)}>
                        Cancel
                    </Button>
                </Flex>
            </form>
        </Container>
    );
};