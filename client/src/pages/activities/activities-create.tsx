// import { Container, TextInput, Button, Space, Flex, Select, MultiSelect } from "@mantine/core";
// import { FormErrors, useForm } from "@mantine/form";
// import { showNotification } from "@mantine/notifications";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ApiResponse, ActivityCreateUpdateDto, OptionItemDto } from "../../constants/types";
// import { routes } from "../../routes";
// import { DateTimePicker } from '@mantine/dates';

// export const ActivitiesCreate = () => {
//     const navigate = useNavigate();
//     const [locationOptions, setLocationOptions] = useState<OptionItemDto[]>([]);
//     const [activityTypeOptions, setActivityTypeOptions] = useState<OptionItemDto[]>([]);
//     const [productOptions, setProductOptions] = useState<OptionItemDto[]>([]);
//     const [tagOptions, setTagOptions] = useState<OptionItemDto[]>([]);

//     const mantineForm = useForm<ActivityCreateUpdateDto>({
//         initialValues: {
//             name: "",
//             locationId: 0,
//             activityTypeId: 0,
//             startTime: new Date().toISOString(),  
//             endTime: new Date().toISOString(),    
//             products: [],
//             tags: [],
//             imageUrl: ""
//         },
//         validate: {
//             startTime: (value, values) => {
//                 if (!value) return 'Start time is required';
//                 if (new Date(value) < new Date()) return 'Start time must be in the future';
//                 return null;
//             },
//             endTime: (value, values) => {
//                 if (!value) return 'End time is required';
//                 if (new Date(value) <= new Date(values.startTime)) {
//                     return 'End time must be after start time';
//                 }
//                 return null;
//             }
//         }
//     });

   


//     useEffect(() => {
//         getLocationOptions();
//         getActivityTypeOptions();
//         getProductOptions();
//         getTagOptions();
//     }, []);
    
//     async function getLocationOptions() {
//         const response = await axios.get<ApiResponse<OptionItemDto[]>>("/api/location/options");
//         if (!response.data.hasErrors) {
//             setLocationOptions(response.data.data);
//         }
//     }
    
//     async function getActivityTypeOptions() {
//         const response = await axios.get<ApiResponse<OptionItemDto[]>>("/api/activitytype/options");
//         if (!response.data.hasErrors) {
//             setActivityTypeOptions(response.data.data);
//         }
//     }
    
//     async function getProductOptions() {
//         const response = await axios.get<ApiResponse<OptionItemDto[]>>("/api/product/options");
//         if (!response.data.hasErrors) {
//             setProductOptions(response.data.data);
//         }
//     }
    
//     async function getTagOptions() {
//         const response = await axios.get<ApiResponse<OptionItemDto[]>>("/api/tag/options");
//         if (!response.data.hasErrors) {
//             setTagOptions(response.data.data);
//         }
//     }

//     const submitActivity = async (values: ActivityCreateUpdateDto) => {
//         try {
//             const response = await axios.post<ApiResponse<ActivityCreateUpdateDto>>(
//                 "/api/activity",
//                 values
//             );
        
//             if (response.data.hasErrors) {
//                 const formErrors: FormErrors = {};
//                 response.data.errors.forEach(error => {
//                     formErrors[error.property] = error.message;
//                 });
//                 mantineForm.setErrors(formErrors);
//                 return;
//             }
        
//             showNotification({
//                 message: "Activity successfully created",
//                 color: "green",
//             });
//             navigate(routes.activityListing);
//         } catch (error) {
//             showNotification({
//                 message: "Error creating activity",
//                 color: "red",
//             });
//         }
//     };

//     return (
//         <Container>
//             <form onSubmit={mantineForm.onSubmit(submitActivity)}>
//                 <TextInput
//                     label="Activity Name"
//                     placeholder="Enter activity name"
//                     {...mantineForm.getInputProps("name")}
//                     required
//                 />

//                 <TextInput
//                     label="Image URL"
//                     placeholder="Enter URL for activity image"
//                     {...mantineForm.getInputProps("imageUrl")}
//                 />

//                 <Select
//                     label="Location"
//                     placeholder="Select a location"
//                     data={locationOptions}
//                     value={mantineForm.values.locationId.toString()}
//                     onChange={(value) => mantineForm.setFieldValue('locationId', parseInt(value || '0'))}
//                     required
//                 />

//                 <Select
//                     label="Activity Type"
//                     placeholder="Select an activity type"
//                     data={activityTypeOptions}
//                     value={mantineForm.values.activityTypeId.toString()}
//                     onChange={(value) => mantineForm.setFieldValue('activityTypeId', parseInt(value || '0'))}
//                     required
//                 />



//                 <DateTimePicker
//                     label="Start Time"
//                     placeholder="Select start time"
//                     value={mantineForm.values.startTime ? new Date(mantineForm.values.startTime) : null}
//                     onChange={(date) => {
//                         if (date) {
//                             mantineForm.setFieldValue('startTime', date.toISOString());
//                         }
//                     }}
//                     error={mantineForm.errors.startTime}
//                     required
//                     minDate={new Date()}
//                 />

//                 <DateTimePicker
//                     label="End Time"
//                     placeholder="Select end time"
//                     value={mantineForm.values.endTime ? new Date(mantineForm.values.endTime) : null}
//                     onChange={(date) => {
//                         if (date) {
//                             mantineForm.setFieldValue('endTime', date.toISOString());
//                         }
//                     }}
//                     error={mantineForm.errors.endTime}
//                     required
//                     minDate={new Date(mantineForm.values.startTime)}
//                 />

//                 <MultiSelect
//                     label="Products"
//                     placeholder="Select products"
//                     data={productOptions}
//                     value={mantineForm.values.products?.map(id => id.toString()) || []}
//                     onChange={(values) => mantineForm.setFieldValue('products', values.map(v => parseInt(v)))}
//                 />

//                 <MultiSelect
//                     label="Tags"
//                     placeholder="Select tags"
//                     data={tagOptions}
//                     value={mantineForm.values.tags?.map(id => id.toString()) || []}
//                     onChange={(values) => mantineForm.setFieldValue('tags', values.map(v => parseInt(v)))}
//                 />
                
//                 <Space h="md" />
//                 <Flex gap="md">
//                     <Button type="submit">Create Activity</Button>
//                     <Button variant="filled" color="red" onClick={() => navigate(routes.activityListing)}>
//                         Cancel
//                     </Button>
//                 </Flex>
//             </form>
//         </Container>
//     );
// };

import { Container, TextInput, Button, Space, Flex, Select, MultiSelect } from "@mantine/core";
import { FormErrors, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiResponse, ActivityCreateUpdateDto, OptionItemDto } from "../../constants/types";
import { routes } from "../../routes";
import { DateTimePicker } from '@mantine/dates';

export const ActivitiesCreate = () => {
    const navigate = useNavigate();
    const [locationOptions, setLocationOptions] = useState<OptionItemDto[]>([]);
    const [activityTypeOptions, setActivityTypeOptions] = useState<OptionItemDto[]>([]);
    const [productOptions, setProductOptions] = useState<OptionItemDto[]>([]);
    const [tagOptions, setTagOptions] = useState<OptionItemDto[]>([]);

    const mantineForm = useForm<ActivityCreateUpdateDto>({
        initialValues: {
            name: "",
            locationId: 0,
            activityTypeId: 0,
            startTime: new Date().toISOString(),  
            endTime: new Date().toISOString(),    
            products: [],
            tags: [],
            imageUrl: ""
        },
        validate: {
            startTime: (value, values) => {
                if (!value) return 'Start time is required';
                if (new Date(value) < new Date()) return 'Start time must be in the future';
                return null;
            },
            endTime: (value, values) => {
                if (!value) return 'End time is required';
                if (new Date(value) <= new Date(values.startTime)) {
                    return 'End time must be after start time';
                }
                return null;
            }
        }
    });

    useEffect(() => {
        getLocationOptions();
        getActivityTypeOptions();
        getProductOptions();
        getTagOptions();
    }, []);
    
    async function getLocationOptions() {
        const response = await axios.get<ApiResponse<OptionItemDto[]>>("/api/location/options");
        if (!response.data.hasErrors) {
            setLocationOptions(response.data.data);
        }
    }
    
    async function getActivityTypeOptions() {
        const response = await axios.get<ApiResponse<OptionItemDto[]>>("/api/activitytype/options");
        if (!response.data.hasErrors) {
            setActivityTypeOptions(response.data.data);
        }
    }
    
    async function getProductOptions() {
        const response = await axios.get<ApiResponse<OptionItemDto[]>>("/api/product/options");
        if (!response.data.hasErrors) {
            setProductOptions(response.data.data);
        }
    }
    
    async function getTagOptions() {
        const response = await axios.get<ApiResponse<OptionItemDto[]>>("/api/tag/options");
        if (!response.data.hasErrors) {
            setTagOptions(response.data.data);
        }
    }

    const submitActivity = async (values: ActivityCreateUpdateDto) => {
        try {
            const response = await axios.post<ApiResponse<ActivityCreateUpdateDto>>(
                "/api/activity",
                values
            );
        
            if (response.data.hasErrors) {
                const formErrors: FormErrors = {};
                response.data.errors.forEach(error => {
                    formErrors[error.property] = error.message;
                });
                mantineForm.setErrors(formErrors);
                return;
            }
        
            showNotification({
                message: "Activity successfully created",
                color: "green",
            });
            navigate(routes.activityListing);
        } catch (error) {
            showNotification({
                message: "Error creating activity",
                color: "red",
            });
        }
    };

    return (
        <Container>
            <form onSubmit={mantineForm.onSubmit(submitActivity)}>
                <TextInput
                    label="Activity Name"
                    placeholder="Enter activity name"
                    {...mantineForm.getInputProps("name")}
                    required
                />

                <TextInput
                    label="Image URL"
                    placeholder="Enter URL for activity image"
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
                
                <Space h="md" />
                <Flex gap="md">
                    <Button 
                        type="submit"
                        variant="outline"
                        color="green"
                    >
                        Create Activity
                    </Button>
                    <Button 
                        variant="outline"
                        color="red"
                        onClick={() => navigate(routes.activityListing)}
                    >
                        Cancel
                    </Button>
                </Flex>
            </form>
        </Container>
    );
};