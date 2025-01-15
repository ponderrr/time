import { Container, TextInput, NumberInput, Textarea, Button, Space, Flex, Select } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiResponse, ProductCreateUpdateDto, OptionItemDto } from "../../constants/types";
import { routes } from "../../routes";

export const ProductsCreate = () => {
    const navigate = useNavigate();
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
            locationId: (value) => (value <= 0 ? "Location is required" : null),
        },
        transformValues: (values) => ({
            ...values,
            price: Number(values.price.toFixed(2))
        }),
    });

    useEffect(() => {
        fetchLocationOptions();
    }, []);

    async function fetchLocationOptions() {
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
    }

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

                <Select
                    label="Location"
                    placeholder="Select a location"
                    data={locationOptions}
                    value={form.values.locationId.toString()}
                    onChange={(value) => form.setFieldValue('locationId', parseInt(value || '0'))}
                    required
                    mt="md"
                />

                <NumberInput
                    label="Price"
                    placeholder="Enter price"
                    min={0.01}
                    step={0.01}
                    prefix="$"
                    decimalScale={2}
                    allowNegative={false}
                    {...form.getInputProps("price")}
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
                    required
                />

                <Space h="md" />
                <Flex gap="md">
                    <Button 
                        type="submit"
                        variant="outline"
                        color="green"
                    >
                        Create Product
                    </Button>
                    <Button 
                        variant="outline"
                        color="red"
                        onClick={() => navigate(routes.productListing)}
                    >
                        Cancel
                    </Button>
                </Flex>
            </form>
        </Container>
    );
};