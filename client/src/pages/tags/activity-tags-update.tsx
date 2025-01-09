import { Container, NumberInput, Button, Space, Flex } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ApiResponse, ActivityTagCreateUpdateDto, ActivityTagGetDto } from "../../constants/types";
import { routes } from "../../routes";

export const ActivityTagsUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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

    useEffect(() => {
        fetchActivityTag();
    }, [id]);

    const fetchActivityTag = async () => {
        const response = await axios.get<ApiResponse<ActivityTagGetDto>>(
            `/api/activitytag/${id}`
        );

        if (response.data.hasErrors) {
            showNotification({
                message: "Error fetching activity tag",
                color: "red",
            });
            return;
        }

        form.setValues(response.data.data);
    };

    const handleSubmit = async (values: ActivityTagCreateUpdateDto) => {
        const response = await axios.put<ApiResponse<ActivityTagCreateUpdateDto>>(
            `/api/activitytag/${id}`,
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
            message: "Activity tag updated successfully",
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
                    <Button type="submit">Update Activity Tag</Button>
                    <Button variant="light" onClick={() => navigate(routes.activityTagListing)}>
                        Cancel
                    </Button>
                </Flex>
            </form>
        </Container>
    );
};