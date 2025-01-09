import { Container, NumberInput, Button, Space, Flex } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiResponse, ActivityTagCreateUpdateDto } from "../../constants/types";
import { routes } from "../../routes";

export const ActivityTagsCreate = () => {
    const navigate = useNavigate();
    const form = useForm<ActivityTagCreateUpdateDto>({
        initialValues: {
            activityId: 0,
            tagId: 0,
        },
        validate: {
            activityId: (value) => (value <= 0 ? "Activity ID must be greater than 0" : null),
            tagId: (value) => (value <= 0 ? "Tag ID must be greater than 0" : null),
        },
    });

    const handleSubmit = async (values: ActivityTagCreateUpdateDto) => {
        const response = await axios.post<ApiResponse<ActivityTagCreateUpdateDto>>(
            "/api/activitytag",
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
            message: "Activity tag created successfully",
            color: "green",
        });
        navigate(routes.activityTagListing);
    };

    return (
        <Container>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <NumberInput
                    label="Activity ID"
                    placeholder="Enter activity ID"
                    {...form.getInputProps("activityId")}
                    min={1}
                    required
                />
                <NumberInput
                    label="Tag ID"
                    placeholder="Enter tag ID"
                    {...form.getInputProps("tagId")}
                    min={1}
                    mt="md"
                    required
                />
                <Space h="md" />
                <Flex gap="md">
    <Button type="submit">Create Activity Tag</Button>
    <Button variant="filled" color="red" onClick={() => navigate(routes.activityTagListing)}>
        Cancel
    </Button>
</Flex>
            </form>
        </Container>
    );
};