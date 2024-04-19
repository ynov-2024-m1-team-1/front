"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProduct } from "@/services/api/product.api";
import Link from "next/link";
import TitlePage from "@/components/UI/TitlePage";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import handleUpdate from "../page.js"
import { stringify } from "postcss";

const Product = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    // const [productForm, setProductForm] = useState({
    //     id: "",
    //     name: "",
    //     description: "",
    //     image: "",
    //     active: false,
    //     packshot: "",
    //     price: 0,
    // });

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
    }, [params]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e)
    };

    const handleUpdate = async (id) => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmM1NTJlNzE5ZTYwZTQ0Mjc3ZTI0MyIsImFkbWluIjp0cnVlLCJpYXQiOjE3MTI5MTYwNTYsImV4cCI6MTc0NDQ1MjA1Nn0.dfDN0S_-htGFENo2FhJD3Cj9CKuubl2GYsm_Me5sYDc";
            console.log(product)
            await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/update/${id}`,
                {
                    method: "POST",
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        "name": product.name,
                        "description": product.description,
                        "active": product.active,
                        "price": product.price,
                    })
                }
            );
        } catch (error) {
            console.error("Erreur lors de la modification du produit", error);
        }
    };

    return (
        <div className="container mx-auto bg-gray-100">
            <TitlePage title="Modification du Produit" />
            <div className="min-h-screen">
                <div className="mb-8">
                    {loading && <p>Loading...</p>}
                    {product && (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <p>Id produit actuel : {product._id}</p>
                                <Input
                                    label={"Nom produit"}
                                    name={"name"}
                                    value={product.name}
                                    placeholder={product.name}
                                    type={"text"}
                                    onChange={(e) => handleChange(e)}
                                    isRequired={true}
                                    className={
                                        "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                                    }
                                />

                                <Input
                                    label={"Description"}
                                    name={"description"}
                                    value={product.description}
                                    placeholder={product.description}
                                    type={"text"}
                                    onChange={(e) => handleChange(e)}
                                    isRequired={true}
                                    className={
                                        "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                                    }
                                />

                                {product.active === true ? (
                                    <Input
                                        label={"Masquer le produit"}
                                        name={"active"}
                                        type={"checkbox"}
                                        onChange={(e) => handleChange(e)}
                                        isRequired={true}
                                    />
                                ) : (
                                    <Input
                                        label={"Masquer le produit"}
                                        name={"active"}
                                        value={product.active}
                                        type={"checkbox"}
                                        onChange={(e) => handleChange(e)}
                                        isRequired={true}
                                    />
                                )}

                                <Input
                                    label={"Prix"}
                                    name={"price"}
                                    value={product.price}
                                    placeholder={product.price}
                                    type={"number"}
                                    onChange={(e) => handleChange(e)}
                                    isRequired={true}
                                    className={
                                        "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                                    }
                                />
                            </div>
                            <br />
                            <div className="inline-flex space-x-4 content-around">
                                <Link href={`/backoffice/products`}>
                                    <Button
                                        title="Annuler"
                                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                    />
                                </Link>
                                <Link href={`/backoffice/products`}>
                                    <Button
                                        type="submit"
                                        className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                                        onClick={() =>
                                            handleUpdate(product._id)
                                        }
                                        title="Enregistrer"
                                    />
                                </Link>
                            </div>
                        </form>
                    )}
                    <br />
                </div>
            </div>
        </div>
    );
};

export default Product;
