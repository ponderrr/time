import {
    Button,
    Container,
    Flex,
    Space,
    TextInput,
    Select,
    MultiSelect
} from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../config/axios";
import { ApiResponse, ActivityCreateUpdateDto, ActivityGetDto, ActivityUpdateDto, OptionItemDto } from "../../constants/types";
import { routes } from "../../routes";
import { DateTimePicker } from '@mantine/dates';

export const ActivitiesUpdate = () => {
    const [activity, setActivity] = useState<ActivityGetDto>();
    const [locationOptions, setLocationOptions] = useState<OptionItemDto[]>([]);
    const [activityTypeOptions, setActivityTypeOptions] = useState<OptionItemDto[]>([]);
    const [productOptions, setProductOptions] = useState<OptionItemDto[]>([]);
    const [tagOptions, setTagOptions] = useState<OptionItemDto[]>([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const mantineForm = useForm<ActivityUpdateDto>({
        initialValues: {
            name: "",
            locationId: 0,
            activityTypeId: 0,
            startTime: "",
            endTime: "",
            products: [],
            tags: [],
            imageUrl: ""
        },
    });

    useEffect(() => {
        fetchActivity();
        getLocationOptions();
        getActivityTypeOptions();
        getProductOptions();
        getTagOptions();
    }, [id]);

    async function fetchActivity() {
        const response = await axios.get<ApiResponse<ActivityGetDto>>(
            `/api/activity/${id}`
        );

        if (response.data.hasErrors) {
            showNotification({ message: "Error finding activity", color: "red" });
        }

        if (response.data.data) {
            setActivity(response.data.data);
            mantineForm.setValues({
                ...response.data.data,
                startTime: new Date(response.data.data.startTime).toISOString(),
                endTime: new Date(response.data.data.endTime).toISOString(),
                products: response.data.data.products.map(p => p.id),
                tags: response.data.data.tags.map(t => t.id),
                imageUrl: response.data.data.imageUrl 
            });
            mantineForm.resetDirty();
        }
    }

    async function getLocationOptions() {
        const response = await axios.get<ApiResponse<OptionItemDto[]>>(
            "/api/location/options"
        );

        if (response.data.hasErrors) {
            showNotification({ message: "Error getting locations", color: "red" });
            return;
        }

        setLocationOptions(response.data.data);
    }

    async function getActivityTypeOptions() {
        const response = await axios.get<ApiResponse<OptionItemDto[]>>(
            "/api/activitytype/options"
        );

        if (response.data.hasErrors) {
            showNotification({ message: "Error getting activity types", color: "red" });
            return;
        }

        setActivityTypeOptions(response.data.data);
    }

    async function getProductOptions() {
        const response = await axios.get<ApiResponse<OptionItemDto[]>>(
            "/api/product/options"
        );

        if (response.data.hasErrors) {
            showNotification({ message: "Error getting products", color: "red" });
            return;
        }

        setProductOptions(response.data.data);
    }

    async function getTagOptions() {
        const response = await axios.get<ApiResponse<OptionItemDto[]>>(
            "/api/tag/options"
        );

        if (response.data.hasErrors) {
            showNotification({ message: "Error getting tags", color: "red" });
            return;
        }

        setTagOptions(response.data.data);
    }

    const submitActivity = async (values: ActivityCreateUpdateDto) => {
        const response = await axios.put<ApiResponse<ActivityGetDto>>(
            `/api/activity/${id}`,
            values
        );

        if (response.data.hasErrors) {
            const formErrors = response.data.errors.reduce(
                (prev, curr) => {
                    Object.assign(prev, { [curr.property]: curr.message });
                    return prev;
                },
                {} as FormErrors
            );

            mantineForm.setErrors(formErrors);
            return;
        }

        showNotification({
            message: "Activity successfully updated",
            color: "green",
        });
        navigate(routes.activityListing);
    };

    return (
        <Container>
            {activity && (
                <form onSubmit={mantineForm.onSubmit(submitActivity)}>
                    <TextInput
                        label="Activity Name"
                        placeholder="Enter activity name"
                        {...mantineForm.getInputProps("name")}
                        required
                    />

                    <TextInput
                        label="Image URL"
                        placeholder="Enter image URL"
                        {...mantineForm.getInputProps("imageUrl")}
                    />

                    <Select
                        label="Location"
                        placeholder="Select a location"
                        data={locationOptions}
                        value={mantineForm.values.locationId.toString()}
                        onChange={(value) => mantineForm.setFieldValue('locationId', parseInt(value || '0'))}
                        required
                    />

                    <Select
                        label="Activity Type"
                        placeholder="Select an activity type"
                        data={activityTypeOptions}
                        value={mantineForm.values.activityTypeId.toString()}
                        onChange={(value) => mantineForm.setFieldValue('activityTypeId', parseInt(value || '0'))}
                        required
                    />

                    <DateTimePicker
                        label="Start Time"
                        placeholder="Select start time"
                        value={mantineForm.values.startTime ? new Date(mantineForm.values.startTime) : null}
                        onChange={(date) => {
                        if (date) {
                        mantineForm.setFieldValue('startTime', date.toISOString());
                        }
                    }}
                    error={mantineForm.errors.startTime}
                    required
                    minDate={new Date()}
                    />

                    <DateTimePicker
                        label="End Time"
                        placeholder="Select end time"
                        value={mantineForm.values.endTime ? new Date(mantineForm.values.endTime) : null}
                        onChange={(date) => {
                        if (date) {
                        mantineForm.setFieldValue('endTime', date.toISOString());
                        }
                    }}
                    error={mantineForm.errors.endTime}
                    required
                    minDate={new Date(mantineForm.values.startTime)}
                    />

                    <MultiSelect
                        label="Products"
                        placeholder="Select products"
                        data={productOptions}
                        value={mantineForm.values.products?.map(id => id.toString()) || []}
                        onChange={(values) => mantineForm.setFieldValue('products', values.map(v => parseInt(v)))}
                    />

                    <MultiSelect
                        label="Tags"
                        placeholder="Select tags"
                        data={tagOptions}
                        value={mantineForm.values.tags?.map(id => id.toString()) || []}
                        onChange={(values) => mantineForm.setFieldValue('tags', values.map(v => parseInt(v)))}
                    />
            
                    <Space h={10} />
                    <Flex gap="md">
    <Button type="submit">Update Activity</Button>
    <Button variant="filled" color="red" onClick={() => navigate(routes.activityListing)}>
        Cancel
    </Button>
</Flex>
                </form>
            )}
        </Container>
    );
};