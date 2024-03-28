"use client";
import React, { useState, useEffect } from "react";
import { getProduct } from "@/services/api/product.api";
import { getCheckoutSession } from "@/services/api/checkoutSession.api";
import { useRouter } from "next/navigation";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [checkoutSessionURL, setCheckoutSessionURL] = useState("");

    const router = useRouter();

    useEffect(() => {
        recoverCart();
    }, []);

    useEffect(() => {
        console.log(checkoutSessionURL);
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
        const productsArray = items.map((item) => item.id);
        const shippingMethod = "standard";
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
                <radio>
                    <label>
                        <input type="radio" name="shipping" value="standard" />
                        Standard
                    </label>
                    <label>
                        <input type="radio" name="shipping" value="pick-up" />
                        pick-up
                    </label>
                </radio>
                <button type="submit">Checkout</button>
            </form>
        </div>
    );
};

export default Cart;
