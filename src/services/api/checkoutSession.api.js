export async function getCheckoutSession(productsArray, shippingMethod) {
    const orderId = createOrder(productsArray, shippingMethod);

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token not found");
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/order/createCheckoutSession?orderId=${orderId}`,
            {
                cache: "no-store",
                Authorization: `Bearer ${token}`,
            }
        );
        const data = await res.json();
        return data.data;
    } catch (err) {
        return err;
    }
}

async function createOrder(productsArray, shippingMethod) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/order`,
            {
                method: "POST",
                cache: "no-store",
                Authorization: `Bearer ${token}`,
                body: {
                    price: 500,
                    products: productsArray,
                    shippingMethod: shippingMethod,
                },
            }
        );
        const data = await res.json();
        return data.data._id;
    } catch (err) {
        return err;
    }
}
