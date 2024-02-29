"use client";

import TitlePage from "@/components/UI/TitlePage";
import { useEffect } from "react";
import ProductTable from "@/components/UI/Table";
import useFetch from "@/hooks/useFetch";

const ProductBackOffice = () => {
    const { fetchData, data, error, loading, typeofError } = useFetch({
        url: "/products",
        method: "GET",
        body: null,
        token: null,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteProduct = (id) => {
        const updatedProducts = productsList.filter((id) => product.id !== id);
        setProductsList(updatedProducts);
        console.log("Suppression du produit", id);
    };

    return (
        <div className="container mx-auto">
            <TitlePage title="Liste des produits" />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!data && (
                <div>
                    <p>Type of Error: {typeofError}</p>
                </div>
            )}
            <div className="min-h-screen">
                <div className="mb-8">
                    <ProductTable
                        data={data}
                        type="product"
                        handleDelete={handleDeleteProduct}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductBackOffice;
