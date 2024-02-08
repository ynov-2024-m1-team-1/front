"use client";

import TitlePage from "@/components/UI/TitlePage";
import { useEffect, useState } from "react";
import ProductTable from "@/components/UI/Table";



const ProductBackOffice = () => {
    const [productsList, setProductsList] = useState([]);

    const product = [
        {id: 1, name: "Nom du produit", description: "Description du produit", image: "Image du produit", active: "Actif", packshot: "Packshot du produit", price: "Prix du produit"},
        {id: 2, name: "Nom du produit", description: "Description du produit", image: "Image du produit", active: "Actif", packshot: "Packshot du produit", price: "Prix du produit"},
        {id: 3, name: "Nom du produit", description: "Description du produit", image: "Image du produit", active: "Actif", packshot: "Packshot du produit", price: "Prix du produit"},
    ];

    useEffect(() => {
        // Fetch data from API or use static data
        const fetchData = async () => {
            try {
                // const response = await getProducts();
                // setProducts(response);
                setProductsList(product);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteProduct = (id) => {
        const updatedProducts = productsList.filter((id) => product.id !== id);
        setProductsList(updatedProducts);
        console.log("Suppression du produit", id);
    };

    return (
        <div className="container mx-auto">
            <TitlePage title="Liste des utilisateurs" />
            <div className="min-h-screen">
                <div className="mb-8">
                    <ProductTable data={productsList} type="product" handleDelete={handleDeleteProduct} />
                </div>
            </div>
        </div>
    );
};

export default ProductBackOffice;
