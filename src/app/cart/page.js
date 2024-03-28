"use client";
import React, { useState, useEffect } from "react";
import { getProduct } from "@/services/api/product.api";
import { getCheckoutSession } from "@/services/api/checkoutSession.api";
import { useRouter } from "next/navigation";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [checkoutSessionURL, setCheckoutSessionURL] = useState("");
    const [shippingMethod, setShippingMethod] = useState("standard");

    const router = useRouter();

    useEffect(() => {
        recoverCart();
    }, []);

    useEffect(() => {
        router.push(checkoutSessionURL);
    }, [checkoutSessionURL]);

    const recoverCart = () => {
        const cart = localStorage.getItem("cart");
        if (cart) {
            setItems(JSON.parse(cart));
        }
    };

    const removeItemFromCart = (itemId) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        localStorage.setItem(
            "cart",
            JSON.stringify(items.filter((item) => item.id !== itemId))
        );
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem("cart");
    };

    const checkout = async (e) => {
        e.preventDefault();

        const productsArray = items.map((item) => item._id);
        const checkoutSessionURL = await getCheckoutSession(
            productsArray,
            shippingMethod
        );
        setCheckoutSessionURL(checkoutSessionURL);
    };

    return (
        <div>
            <h2>Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {items.map(
                        (item) => (
                            console.log(item),
                            (
                                <li key={item.id}>
                                    {item} -{" "}
                                    <button
                                        onClick={() =>
                                            removeItemFromCart(item.id)
                                        }
                                    >
                                        {" "}
                                        Remove
                                    </button>
                                </li>
                            )
                        )
                    )}
                </ul>
            )}
            <button onClick={clearCart}>Clear Cart</button>
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
    );
};

export default Cart;
