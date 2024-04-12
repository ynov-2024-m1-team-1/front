"use client";
import React, { useState, useEffect } from "react";
import TitlePage from "@/components/UI/TitlePage";
// import { getCheckoutSession } from "@/services/api/checkout.api";
import { useRouter } from "next/navigation";

const Cart = () => {
    const [product, setProduct] = useState([]);
    const [checkoutSessionURL, setCheckoutSessionURL] = useState("");
    const [shippingMethod, setShippingMethod] = useState("standard");
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("cart")) {
            const idsString = localStorage.getItem("cart");
            const idsArray = JSON.parse(idsString);

            idsArray.forEach((id) => {
                fetch(`https://team-api.faldin.xyz/api/products/${id}`)
                    .then((response) => response.json())
                    .then((responseData) => {
                        if (
                            responseData &&
                            responseData.data &&
                            responseData.data.products
                        ) {
                            const productData = responseData.data.products;
                            setProduct((prevState) => [
                                ...prevState,
                                productData,
                            ]);
                        } else {
                            console.error(
                                "Les données du produit sont manquantes ou incorrectes."
                            );
                        }
                    })
                    .catch((error) =>
                        console.error(
                            "Erreur lors de la récupération des détails du produit:",
                            error
                        )
                    );
            });
        } else {
            console.error("Le panier est vide.");
        }
    }, []);

    useEffect(() => {
        router.push(checkoutSessionURL);
    }, [checkoutSessionURL]);

    const removeItemFromCart = (itemId) => {
        const updatedProduct = product.filter((item) => item.id !== itemId);
        setProduct(updatedProduct);
        localStorage.setItem(
            "cart",
            JSON.stringify(updatedProduct.map((item) => item.id))
        );
    };

    const checkout = async (e) => {
        e.preventDefault();

        const productsArray = product.map((item) => item._id);
        const checkoutSessionURL = await getCheckoutSession(
            productsArray,
            shippingMethod
        );
        setCheckoutSessionURL(checkoutSessionURL);
    };

    const clearCart = () => {
        setProduct([]);
        localStorage.removeItem("cart");
    };

    return (
        <div className="container mx-auto">
            <TitlePage title="Cart" />
            <div className="min-h-screen">
                {product.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-s text-white uppercase bg-neutral-900 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nom
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Prix
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.length > 0 ? (
                                    product.map((item, index) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                                            key={index}
                                        >
                                            <td className="px-6 py-4">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.description}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.price}€
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                    onClick={() =>
                                                        removeItemFromCart(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-4"
                                        >
                                            Cart is empty
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot className="bg-neutral-900 dark:bg-gray-700 dark:text-gray-400 text-white text-center">
                                <tr className="text-s text-white uppercase bg-neutral-900 dark:bg-gray-700 dark:text-gray-400">
                                    <th
                                        scope="row"
                                        className="px-6 py-3 uppercase"
                                    >
                                        Total de produit
                                    </th>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-3 font-semibold"
                                    >
                                        {product.length}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <form onSubmit={checkout}>
                            <div class="flex items-center">
                                <input
                                    checked
                                    id="default-radio-1"
                                    type="radio"
                                    value="standard"
                                    name="default-radio"
                                    onClick={(e) => {
                                        setShippingMethod(e.target.value);
                                    }}
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    for="default-radio-2"
                                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    standard
                                </label>
                            </div>
                            <div class="flex items-center">
                                <input
                                    checked
                                    id="default-radio-2"
                                    type="radio"
                                    value="pick-up"
                                    name="default-radio"
                                    onClick={(e) => {
                                        setShippingMethod(e.target.value);
                                    }}
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    for="default-radio-2"
                                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    pick-up
                                </label>
                            </div>
                            <button type="submit">Checkout</button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <p>Cart is empty</p>
                    </div>
                )}
                <button onClick={clearCart}>Vider le panier</button>
                <br />
                <button>Annuler la transaction</button>
                <br />
                <button>Accepter la transaction</button>
            </div>
        </div>
    );
};

export default Cart;
