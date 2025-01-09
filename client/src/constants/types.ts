export interface ApiResponse<T> {
    data: T;
    hasErrors: boolean;
    errors: Array<{
        property: string;
        message: string;
    }>;
}

export interface OptionItemDto {
    label: string;
    value: string;
}

// Activity Types
export interface ActivityGetDto {
    id: number;
    name: string;
    locationId: number;
    activityTypeId: number;
    startTime: string;
    endTime: string;
    imageUrl: string;
    location: LocationGetDto;
    activityType: ActivityTypeGetDto;
    products: ProductGetDto[];
    tags: TagGetDto[];
}

export interface ActivityCreateUpdateDto {
    name: string;
    locationId: number;
    activityTypeId: number;
    startTime: string;
    endTime: string;
    imageUrl: string;
    products: number[];
    tags: number[];
}

// Location Types
export interface LocationGetDto {
    id: number;
    name: string;
    city: string;
    state: string;
    country: string;
    description: string;
}

export interface LocationCreateUpdateDto {
    name: string;
    city: string;
    state: string;
    country: string;
    description: string;
}

// Product Types
export interface ProductGetDto {
    id: number;
    name: string;
    locationId: number;
    locationName: string;
    price: number;
    expectedQuantity: number;
    minQuantity: number;
    description: string;
}

export interface ProductCreateUpdateDto {
    name: string;
    locationId: number;
    price: number;
    expectedQuantity: number;
    minQuantity: number;
    description: string;
}

// Activity Type Types
export interface ActivityTypeGetDto {
    id: number;
    name: string;
}

export interface ActivityTypeCreateUpdateDto {
    name: string;
}

// Tag Types
export interface TagGetDto {
    id: number;
    name: string;
}

export interface TagCreateUpdateDto {
    name: string;
}

// Activity Tag Types
export interface ActivityTagGetDto {
    id: number;
    activityId: number;
    tagId: number;
}

export interface ActivityTagCreateUpdateDto {
    activityId: number;
    tagId: number;
}

// Review Types
export interface ReviewGetDto {
    id: number;
    locationId: number;
    rating: number;
    comment: string;
}

export interface ReviewCreateUpdateDto {
    locationId: number;
    rating: number;
    comment: string;
}

// User Activity Types
export interface UserActivityGetDto {
    id: number;
    userId: number;
    activityId: number;
    dateBooked: string;
}

export interface UserActivityCreateUpdateDto {
    userId: number;
    activityId: number;
    dateBooked: string;
}