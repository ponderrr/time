import { Container, TextInput, Button, Space, Flex } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiResponse, ActivityTypeCreateUpdateDto } from "../../constants/types";
import { routes } from "../../routes";

export const ActivityTypesCreate = () => {
    const navigate = useNavigate();
    const form = useForm<ActivityTypeCreateUpdateDto>({
        initialValues: {
            name: "",
        },
        validate: {
            name: (value) => (!value ? "Name is required" : null),
        },
    });

    const handleSubmit = async (values: ActivityTypeCreateUpdateDto) => {
        const response = await axios.post<ApiResponse<ActivityTypeCreateUpdateDto>>(
            "/api/activitytype",
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
            message: "Activity type created successfully",
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
    <Button type="submit">Create Activity Type</Button>
    <Button variant="filled" color="red" onClick={() => navigate(routes.activityTypeListing)}>
        Cancel
    </Button>
</Flex>
            </form>
        </Container>
    );
};