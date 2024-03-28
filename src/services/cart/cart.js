export const addItemToCart = (id) => {
    try {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        localStorage.setItem("cart", JSON.stringify([...cart, id]));
    } catch (error) {
        console.error("Error adding item to cart:", error);
    }
};

export const removeItemFromCart = (itemId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter((item) => item.id !== itemId);

    localStorage.setItem('cart', JSON.stringify(cart));
};

export const clearCart = () => {
    localStorage.removeItem('cart');
};
