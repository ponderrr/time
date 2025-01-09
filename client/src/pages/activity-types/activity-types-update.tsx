import { Container, TextInput, Button, Space, Flex } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ApiResponse, ActivityTypeCreateUpdateDto, ActivityTypeGetDto } from "../../constants/types";
import { routes } from "../../routes";

export const ActivityTypesUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const form = useForm<ActivityTypeCreateUpdateDto>({
        initialValues: {
            name: "",
        },
        validate: {
            name: (value) => (!value ? "Name is required" : null),
        },
    });

    useEffect(() => {
        fetchActivityType();
    }, [id]);

    const fetchActivityType = async () => {
        const response = await axios.get<ApiResponse<ActivityTypeGetDto>>(
            `/api/activitytype/${id}`
        );

        if (response.data.hasErrors) {
            showNotification({
                message: "Error fetching activity type",
                color: "red",
            });
            return;
        }

        form.setValues(response.data.data);
    };

    const handleSubmit = async (values: ActivityTypeCreateUpdateDto) => {
        const response = await axios.put<ApiResponse<ActivityTypeCreateUpdateDto>>(
            `/api/activitytype/${id}`,
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
            message: "Activity type updated successfully",
            color: "green",
        });
        navigate(routes.activityTypeListing);
    };

    return (
        <Container>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Name"
                    placeholder="Enter activity type name"
                    {...form.getInputProps("name")}
                    required
                />
                <Space h="md" />
                <Flex gap="md">
                    <Button type="submit">Update Activity Type</Button>
                    <Button variant="light" onClick={() => navigate(routes.activityTypeListing)}>
                        Cancel
                    </Button>
                </Flex>
            </form>
        </Container>
    );
};