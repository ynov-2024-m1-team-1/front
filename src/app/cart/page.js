"use client";
import React, { useState, useEffect } from "react";
import TitlePage from "@/components/UI/TitlePage";
import { getCheckoutSession } from "@/services/api/checkoutSession.api";
import { useRouter } from "next/navigation";
import { getProduct } from "@/services/api/product.api";
import { hasCookie } from "cookies-next";

const Cart = () => {
    const [product, setProduct] = useState(null);
    const [checkoutSessionURL, setCheckoutSessionURL] = useState("");
    const [shippingMethod, setShippingMethod] = useState("standard");
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const cart = JSON.parse(localStorage.getItem("cart"));

            if (!cart) {
                setProduct([]);
                return;
            }

            const productPromises = cart.map(async (id) => {
                const productRes = await getProduct(id);
                return productRes.data;
            });
            const products = await Promise.all(productPromises);
            setProduct(products);
        };

        fetchData();
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

        
        if (!hasCookie("token")) {
            router.push("/auth/login");
            return;
        }

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
                {product && product.length > 0 ? (
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
                            <div className="flex items-center">
                                <input
                                    defaultChecked
                                    id="default-radio-1"
                                    type="radio"
                                    value="standard"
                                    name="default-radio"
                                    onClick={(e) => {
                                        setShippingMethod(e.target.value);
                                    }}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="default-radio-2"
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    standard
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="default-radio-2"
                                    type="radio"
                                    value="pick-up"
                                    name="default-radio"
                                    onClick={(e) => {
                                        setShippingMethod(e.target.value);
                                    }}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="default-radio-2"
                                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    pick-up
                                </label>
                            </div>
                            <button type="submit">
                                Accepter la transaction
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <p>Cart is empty</p>
                    </div>
                )}
                <button onClick={clearCart}>Vider le panier</button>
                <br />
            </div>
        </div>
    );
};

export default Cart;
