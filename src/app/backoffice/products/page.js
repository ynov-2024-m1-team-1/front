"use client";

import TitlePage from "@/components/UI/TitlePage";
import { useEffect, useState } from "react";
import ProductTable from "@/components/UI/Table";
import useFetch from "@/hooks/useFetch";

const ProductBackOffice = () => {
    const { fetchData, data, error, loading, typeofError } = useFetch({
        url: "/products",
        method: "GET",
        body: null,
        token: null,
    });

    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        if (data) {
            setProductsList(data.data.products);
        }
    }, [data]);

    const handleDeleteProduct = async (id) => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmM1NTJlNzE5ZTYwZTQ0Mjc3ZTI0MyIsImFkbWluIjp0cnVlLCJpYXQiOjE3MTI5MTYwNTYsImV4cCI6MTc0NDQ1MjA1Nn0.dfDN0S_-htGFENo2FhJD3Cj9CKuubl2GYsm_Me5sYDc";
            await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/delete/${id}`,
                {
                    method: "DELETE",
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            const updatedProducts = productsList.filter(
                (product) => product._id !== id
            );
            setProductsList(updatedProducts);
            console.log("Suppression du produit", id);
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la suppression du produit", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                        handleDelete={(id) => handleDeleteProduct(id)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductBackOffice;
