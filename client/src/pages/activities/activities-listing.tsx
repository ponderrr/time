import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import {
  ApiResponse,
  ActivityGetDto,
  PagedResult,
} from "../../constants/types";
import ActivityCard from "./ActivityCard";
import { ListingLayout } from "../../components/ListingLayout";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { CardSkeleton } from "../../components/CardSkeleton";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../utils/errorHandler";
import { Pagination } from "../../components/Pagination";
import { SearchInput } from "../../components/SearchInput";
import { Stack } from "@mantine/core";

export const ActivitiesListing = () => {
  const [pagedData, setPagedData] =
    useState<PagedResult<ActivityGetDto> | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    opened: boolean;
    id: number | null;
    name: string;
  }>({
    opened: false,
    id: null,
    name: "",
  });
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, [currentPage, pageSize, searchTerm]);

  async function fetchActivities() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await axios.get<
        ApiResponse<PagedResult<ActivityGetDto>>
      >(`/api/activity?${params}`);

      if (response.data.hasErrors) {
        showNotification({
          message: "Error fetching activities.",
          color: "red",
        });
        return;
      }

      if (response.data.data) {
        console.log("Fetched activities:", response.data.data); // Debug log
        setPagedData(response.data.data);
      }
    } catch (error) {
      showErrorNotification(error, "Failed to fetch activities");
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (id: number) => {
    navigate(routes.activityUpdate.replace(":id", `${id}`));
  };

  const handleDelete = (id: number) => {
    const activity = pagedData?.items.find((a) => a.id === id);
    if (activity) {
      setDeleteModal({
        opened: true,
        id: id,
        name: activity.name,
      });
    }
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;

    setDeleting(true);
    try {
      await axios.delete(`/api/activity/${deleteModal.id}`);

      setPagedData((prev) =>
        prev
          ? {
              ...prev,
              items: prev.items.filter((a) => a.id !== deleteModal.id),
              totalCount: prev.totalCount - 1,
            }
          : null
      );
      setDeleteModal({ opened: false, id: null, name: "" });

      showSuccessNotification("Activity deleted successfully");
    } catch (error) {
      showErrorNotification(error, "Failed to delete activity");
    } finally {
      setDeleting(false);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({ opened: false, id: null, name: "" });
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  if (loading) {
    return (
      <ListingLayout
        title="Activities"
        onAddClick={() => navigate(routes.activityCreate)}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex justify-center w-full">
            <CardSkeleton height={400} />
          </div>
        ))}
      </ListingLayout>
    );
  }

  return (
    <ListingLayout
      title="Activities"
      onAddClick={() => navigate(routes.activityCreate)}
    >
      <Stack gap="md">
        <SearchInput
          onSearch={handleSearch}
          placeholder="Search activities, locations, or types..."
        />

        {pagedData?.items.map((activity) => (
          <div key={activity.id} className="flex justify-center w-full">
            <ActivityCard
              activity={activity}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ))}

        {pagedData && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagedData.totalPages}
            totalItems={pagedData.totalCount}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </Stack>

      <ConfirmationModal
        opened={deleteModal.opened}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Activity"
        message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
        loading={deleting}
      />
    </ListingLayout>
  );
};
