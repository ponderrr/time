import { showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export const handleApiError = (
  error: unknown,
  fallbackMessage = "An error occurred"
): ApiError => {
  console.error("API Error:", error);

  if (error instanceof AxiosError) {
    const response = error.response;

    if (
      response?.data?.errors &&
      Array.isArray(response.data.errors) &&
      response.data.errors.length > 0
    ) {
      const firstError = response.data.errors[0];
      return {
        message: firstError.message || fallbackMessage,
        code: firstError.code,
        details: firstError.details,
      };
    }

    if (response?.data?.message) {
      return {
        message: response.data.message,
        code: response.status.toString(),
      };
    }

    switch (response?.status) {
      case 400:
        return {
          message: "Invalid request. Please check your input.",
          code: "400",
        };
      case 401:
        return {
          message: "You are not authorized. Please log in again.",
          code: "401",
        };
      case 403:
        return {
          message: "You do not have permission to perform this action.",
          code: "403",
        };
      case 404:
        return {
          message: "The requested resource was not found.",
          code: "404",
        };
      case 409:
        return {
          message: "This action conflicts with existing data.",
          code: "409",
        };
      case 422:
        return {
          message: "Validation failed. Please check your input.",
          code: "422",
        };
      case 429:
        return {
          message: "Too many requests. Please try again later.",
          code: "429",
        };
      case 500:
        return {
          message: "Server error. Please try again later.",
          code: "500",
        };
      case 503:
        return {
          message: "Service temporarily unavailable. Please try again later.",
          code: "503",
        };
      default:
        return {
          message: `Request failed with status ${response?.status}`,
          code: response?.status?.toString(),
        };
    }
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: fallbackMessage };
};

export const showErrorNotification = (
  error: unknown,
  fallbackMessage?: string
) => {
  const apiError = handleApiError(error, fallbackMessage);

  showNotification({
    message: apiError.message,
    color: "red",
    autoClose: 5000,
    withCloseButton: true,
  });

  return apiError;
};

export const showSuccessNotification = (message: string) => {
  showNotification({
    message,
    color: "green",
    autoClose: 3000,
    withCloseButton: true,
  });
};

export const showWarningNotification = (message: string) => {
  showNotification({
    message,
    color: "yellow",
    autoClose: 4000,
    withCloseButton: true,
  });
};
