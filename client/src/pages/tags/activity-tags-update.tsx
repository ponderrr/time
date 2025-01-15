import { Container, TextInput, Button, Space, Flex } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ApiResponse, TagUpdateDto, TagGetDto } from "../../constants/types";
import { routes } from "../../routes";

interface UpdateTagForm {
    name: string;
}

export const ActivityTagsUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const form = useForm<UpdateTagForm>({
        initialValues: {
            name: "",
        },
        validate: {
            name: (value) => (!value ? "Name is required" : null),
        },
    });

    useEffect(() => {
        fetchTag();
    }, [id]);

    const fetchTag = async () => {
        const response = await axios.get<ApiResponse<TagGetDto>>(
            `/api/tag/${id}`
        );

        if (response.data.hasErrors) {
            showNotification({
                message: "Error fetching tag",
                color: "red",
            });
            return;
        }

        form.setValues({
            name: response.data.data.name
        });
    };

    const handleSubmit = async (values: UpdateTagForm) => {
        try {
            const submitData: TagUpdateDto = {
                name: values.name
            };

            const response = await axios.put<ApiResponse<TagUpdateDto>>(
                `/api/tag/${id}`,
                submitData
            );

            if (response.data.hasErrors) {
                const formErrors: FormErrors = {};
                response.data.errors.forEach(error => {
                    formErrors[error.property] = error.message;
                });
                form.setErrors(formErrors);
                return;
            }

            showNotification({
                message: "Tag updated successfully",
                color: "green",
            });
            navigate(routes.activityTagListing);
        } catch (error) {
            showNotification({
                message: "Error updating tag",
                color: "red",
            });
        }
    };

    return (
        <Container>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Tag Name"
                    placeholder="Enter tag name"
                    {...form.getInputProps("name")}
                    required
                />

                <Space h="md" />
                <Flex gap="md">
                    <Button 
                        type="submit"
                        variant="outline"
                        color="green"
                    >
                        Update Tag
                    </Button>
                    <Button 
                        variant="outline"
                        color="red"
                        onClick={() => navigate(routes.activityTagListing)}
                    >
                        Cancel
                    </Button>
                </Flex>
            </form>
        </Container>
    );
};