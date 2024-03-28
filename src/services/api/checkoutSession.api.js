export async function getCheckoutSession(productsArray, shippingMethod) {
    const token = localStorage.getItem("token");

    try {
        if (!token) {
            throw new Error("Token not found");
        }
        const orderId = await createOrder(productsArray, shippingMethod, token);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/order/createCheckoutSession?orderId=${orderId}`,
            {
                cache: "no-store",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
            }
        );
        const data = await res.json();
        return data.data;
    } catch (err) {
        return err;
    }
}

async function createOrder(productsArray, shippingMethod, token) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/order`,
            {
                method: "POST",
                cache: "no-store",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    products: productsArray,
                    shippingMethod: shippingMethod,
                    price: 500,
                }),
            }
        );
        const data = await res.json();
        return data.data._id;
    } catch (err) {
        return err;
    }
}
