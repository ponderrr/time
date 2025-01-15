import { Container, TextInput, Button, Space, Flex } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiResponse, TagCreateDto } from "../../constants/types";
import { routes } from "../../routes";

interface CreateTagForm {
    name: string;
}

export const ActivityTagsCreate = () => {
    const navigate = useNavigate();

    const form = useForm<CreateTagForm>({
        initialValues: {
            name: "",
        },
        validate: {
            name: (value) => (!value ? "Name is required" : null),
        },
    });

    const handleSubmit = async (values: CreateTagForm) => {
        try {
            const submitData: TagCreateDto = {
                name: values.name
            };

            const response = await axios.post<ApiResponse<TagCreateDto>>(
                "/api/tag",
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
                message: "Tag created successfully",
                color: "green",
            });
            navigate(routes.activityTagListing);
        } catch (error) {
            showNotification({
                message: "Error creating tag",
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
                        Create Tag
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