import { Container } from "@mantine/core";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { ApiResponse, ProductGetDto } from "../../constants/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "./ProductCard";

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
        <Container>
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Products</h2>
                <button
                    onClick={() => navigate(routes.productCreate)}
                    className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>New Product</span>
                </button>
            </div>
            
            {products && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
};
