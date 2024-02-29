"use client";

import React from "react";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProduct } from "@/services/api/product.api";
import TitlePage from "@/components/UI/TitlePage";

const Product = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                let response = await getProduct(params.id);
                if (response) {
                    setProduct(response.data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        if (params.id) {
            fetchProduct();
        }
    }, []);

    return (
        <div className="container mx-auto">
            <TitlePage title="Liste des produits" />
            <div className="min-h-screen">
                <div className="mb-8">
                    {loading && <p>Loading...</p>}
                    <p>Product</p>
                    {product && (
                        <div>
                            <p>{product.name}</p>
                            <p>{product.description}</p>
                            <p>{product.image}</p>
                            <p>{product.active}</p>
                            <p>{product.packshot}</p>
                            <p>{product.price}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
