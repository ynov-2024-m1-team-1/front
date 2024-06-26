"use client";

import TitlePage from "@/components/UI/TitlePage";
import { useEffect, useState } from "react";
import ProductTable from "@/components/UI/Table";
import useFetch from "@/hooks/useFetch";
import { getCookie } from "cookies-next";

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

    const confirmDelete = (itemId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
            handleDeleteProduct(itemId);
        }
    };
    

    const handleDeleteProduct = async (id) => {
        try {
            const token = getCookie("token");
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
        <div className="container mx-auto bg-gray-100">
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
                        handleDelete={(id) => confirmDelete(id)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductBackOffice;
