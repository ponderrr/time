import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, ProductGetDto } from "../../constants/types";
import ProductCard from "./ProductCard";
import { ListingLayout } from "../../components/ListingLayout";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { CardSkeleton } from "../../components/CardSkeleton";

export const ProductsListing = () => {
    const [products, setProducts] = useState<ProductGetDto[]>();
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<{ opened: boolean; id: number | null; name: string }>({
        opened: false,
        id: null,
        name: ''
    });
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoading(true);
        try {
            const response = await axios.get<ApiResponse<ProductGetDto[]>>(
                "/api/product"
            );

            if (response.data.hasErrors) {
                showNotification({ message: "Error fetching products." });
                return;
            }

            if (response.data.data) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            showNotification({ 
                message: "Failed to fetch products.", 
                color: "red" 
            });
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (id: number) => {
        navigate(routes.productUpdate.replace(":id", `${id}`));
    };

    const handleDelete = (id: number) => {
        const product = products?.find(p => p.id === id);
        if (product) {
            setDeleteModal({
                opened: true,
                id: id,
                name: product.name
            });
        }
    };

    const confirmDelete = async () => {
        if (!deleteModal.id) return;
        
        setDeleting(true);
        try {
            await axios.delete(`/api/product/${deleteModal.id}`);
            
            setProducts(prev => prev?.filter(p => p.id !== deleteModal.id));
            setDeleteModal({ opened: false, id: null, name: '' });
            
            showNotification({
                message: "Product deleted successfully",
                color: "green"
            });
        } catch (error) {
            console.error('Error deleting product:', error);
            showNotification({
                message: "Failed to delete product",
                color: "red"
            });
        } finally {
            setDeleting(false);
        }
    };

    const closeDeleteModal = () => {
        setDeleteModal({ opened: false, id: null, name: '' });
    };

    if (loading) {
        return (
            <ListingLayout 
                title="Products"
                onAddClick={() => navigate(routes.productCreate)}
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex justify-center w-full">
                        <CardSkeleton height={250} />
                    </div>
                ))}
            </ListingLayout>
        );
    }

    return (
        <ListingLayout 
            title="Products"
            onAddClick={() => navigate(routes.productCreate)}
        >
            {products?.map((product) => (
                <div key={product.id} className="flex justify-center w-full">
                    <ProductCard
                        product={product}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            ))}
            
            <ConfirmationModal
                opened={deleteModal.opened}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                title="Delete Product"
                message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
                loading={deleting}
            />
        </ListingLayout>
    );
};