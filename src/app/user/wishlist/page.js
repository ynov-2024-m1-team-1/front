// import React, { useState, useEffect } from 'react';
"use client";

import TitlePage from "@/components/UI/TitlePage";
import { useEffect, useState } from "react";
import WhishlistTable from "@/components/UI/Table";
import useFetch from "@/hooks/useFetch";

const WishlistPage = () => {
    const { fetchData, data, error, loading, typeofError } = useFetch({
        url: "/whishlists",
        method: "GET",
        body: null,
        token: null,
    });
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        // Code pour récupérer les éléments de la liste de souhaits depuis le backend
        // et les mettre à jour dans le state wishlistItems
        if (data) {
            console.log("Data", data)
            setWishlistItems(data.data.products);
        }
    }, [data]);
    const handleDeleteProductFromWhishlist = async (id) => {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/whishlist/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const updatedWhishlists = wishlistItems.filter(
                (whishlist) => whishlist._id !== id
            );
            setWishlistItems(updatedWhishlists);
            console.log("Suppression du produit de la whishlist", id);
        } catch (error) {
            console.error("Erreur lors de la suppression du produit de la whishlist", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="container mx-auto">
            <TitlePage title="Liste des produits de la whishlist" />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!data && (
                <div>
                    <p>Type of Error: {typeofError}</p>
                </div>
            )}
            <div className="min-h-screen">
                <div className="mb-8">
                    <WhishlistTable
                        data={data}
                        type="whishlist"
                        handleDelete={(id) => handleDeleteProductFromWhishlist(id)}
                    />
                </div>
            </div>
        </div>
        // <div>
        //     <h1>Ma liste de souhaits</h1>
        //     {wishlistItems.length === 0 ? (
        //         <p>Aucun élément dans la liste de souhaits.</p>
        //     ) : (
        //         <ul>
        //             {wishlistItems.map((item) => (
        //                 <li key={item._id}>{item.name}</li>
        //             ))}
        //         </ul>
        //     )}
        // </div>
    );
};

export default WishlistPage;