"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProduct } from "@/services/api/product.api";
import Link from "next/link";
import TitlePage from "@/components/UI/TitlePage";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";

const Product = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        id: "",
        name: "",
        description: "",
        image: "",
        active: false,
        packshot: "",
        price: 0,
    });

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                let response = await getProduct(params.id);
                console.log(response);
                if (response) {
                    setProduct(response.data.products);
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
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(productForm);
    };

    return (
        <div className="container mx-auto">
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
                                    value={productForm.name}
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
                                    value={productForm.description}
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
                                        value={productForm.active}
                                        type={"checkbox"}
                                        onChange={(e) => handleChange(e)}
                                        isRequired={true}
                                    />
                                )}

                                <div>
                                    <p>Image actuelle : {product.image}</p>
                                    <Input
                                        label={"Nouvelle image"}
                                        name={"newImage"}
                                        value={productForm.newImage}
                                        placeholder={"Nouvelle image"}
                                        type={"image"}
                                        onChange={(e) => handleChange(e)}
                                        isRequired={true}
                                        className={
                                            "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                                        }
                                    />

                                    <p>Packshot actuel : {product.packshot}</p>
                                    <Input
                                        label={"Nouveau packshot"}
                                        name={"newPackshot"}
                                        value={productForm.newPackshot}
                                        placeholder={"Nouveau packshot"}
                                        type={"image"}
                                        onChange={(e) => handleChange(e)}
                                        isRequired={true}
                                        className={
                                            "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                                        }
                                    />
                                </div>

                                <Input
                                    label={"Prix"}
                                    name={"price"}
                                    value={productForm.price}
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
                                <Button
                                    type="submit"
                                    className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                                    title="Enregistrer"
                                />
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
