import { Container, TextInput, NumberInput, Textarea, Button, Space, Flex, Select } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ApiResponse, ProductCreateUpdateDto, ProductGetDto, OptionItemDto } from "../../constants/types";
import { routes } from "../../routes";

export const ProductsUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [locationOptions, setLocationOptions] = useState<OptionItemDto[]>([]);
    
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

    useEffect(() => {
        fetchProduct();
        fetchLocationOptions();
    }, [id]);

    const fetchLocationOptions = async () => {
        try {
            const response = await axios.get<ApiResponse<OptionItemDto[]>>("/api/location/options");
            if (!response.data.hasErrors) {
                setLocationOptions(response.data.data);
            }
        } catch (error) {
            showNotification({
                message: "Error fetching locations",
                color: "red"
            });
        }
    };

    const fetchProduct = async () => {
        const response = await axios.get<ApiResponse<ProductGetDto>>(
            `/api/product/${id}`
        );

        if (response.data.hasErrors) {
            showNotification({
                message: "Error fetching product",
                color: "red",
            });
            return;
        }

        form.setValues(response.data.data);
    };

    const handleSubmit = async (values: ProductCreateUpdateDto) => {
        const response = await axios.put<ApiResponse<ProductCreateUpdateDto>>(
            `/api/product/${id}`,
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
            message: "Product updated successfully",
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
                <Select
                    label="Location"
                    placeholder="Select a location"
                    data={locationOptions}
                    value={form.values.locationId.toString()}
                    onChange={(value) => form.setFieldValue('locationId', parseInt(value || '0'))}
                    required
                    searchable
                    mt="md"
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
                    <Button type="submit">Update Product</Button>
                    <Button variant="light" onClick={() => navigate(routes.productListing)}>
                        Cancel
                    </Button>
                </Flex>
            </form>
        </Container>
    );
};