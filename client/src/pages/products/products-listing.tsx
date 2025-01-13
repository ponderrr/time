import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, ProductGetDto } from "../../constants/types";
import ProductCard from "./ProductCard";
import { ListingLayout } from "../../components/ListingLayout";

export const ProductsListing = () => {
    const [products, setProducts] = useState<ProductGetDto[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const response = await axios.get<ApiResponse<ProductGetDto[]>>(
            "/api/product"
        );

        if (response.data.hasErrors) {
            showNotification({ message: "Error fetching products." });
        }

        if (response.data.data) {
            setProducts(response.data.data);
        }
    }

    const handleEdit = (id: number) => {
        navigate(routes.productUpdate.replace(":id", `${id}`));
    };

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
                    />
                </div>
            ))}
        </ListingLayout>
    );
};