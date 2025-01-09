import { Container, TextInput, NumberInput, Textarea, Button, Space, Flex } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiResponse, ProductCreateUpdateDto } from "../../constants/types";
import { routes } from "../../routes";

export const ProductsCreate = () => {
    const navigate = useNavigate();
    const form = useForm<ProductCreateUpdateDto>({
        initialValues: {
            name: "",
            locationId: 0,
            price: 0,
            expectedQuantity: 0,
            minQuantity: 0,
            description: "",
        },
        validate: {
            name: (value) => (!value ? "Name is required" : null),
            price: (value) => (value <= 0 ? "Price must be greater than 0" : null),
            expectedQuantity: (value) => (value < 0 ? "Expected quantity cannot be negative" : null),
            minQuantity: (value) => (value < 0 ? "Minimum quantity cannot be negative" : null),
            locationId: (value) => (value <= 0 ? "Location ID must be greater than 0" : null),
        },
    });

    const handleSubmit = async (values: ProductCreateUpdateDto) => {
        const response = await axios.post<ApiResponse<ProductCreateUpdateDto>>(
            "/api/product",
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
            message: "Product created successfully",
            color: "green",
        });
        navigate(routes.productListing);
    };

    return (
        <Container>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Name"
                    placeholder="Enter product name"
                    {...form.getInputProps("name")}
                    required
                />
                <NumberInput
                    label="Location ID"
                    placeholder="Enter location ID"
                    {...form.getInputProps("locationId")}
                    min={1}
                    mt="md"
                    required
                />
                <NumberInput
                    label="Price"
                    placeholder="Enter price"
                    {...form.getInputProps("price")}
                    min={0.01}
                    decimalScale={2}
                    mt="md"
                    required
                />
                <NumberInput
                    label="Expected Quantity"
                    placeholder="Enter expected quantity"
                    {...form.getInputProps("expectedQuantity")}
                    min={0}
                    mt="md"
                />
                <NumberInput
                    label="Minimum Quantity"
                    placeholder="Enter minimum quantity"
                    {...form.getInputProps("minQuantity")}
                    min={0}
                    mt="md"
                />
                <Textarea
                    label="Description"
                    placeholder="Enter product description"
                    {...form.getInputProps("description")}
                    mt="md"
                />
                <Space h="md" />
                <Flex gap="md">
                    <Button type="submit">Create Product</Button>
                    <Button variant="light" onClick={() => navigate(routes.productListing)}>
                        Cancel
                    </Button>
                </Flex>
            </form>
        </Container>
    );
};