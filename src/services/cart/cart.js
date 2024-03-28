export const addItemToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const index = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (index !== -1) {
        cart[index].quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeItemFromCart = (itemId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart = cart.filter((item) => item.id !== itemId);

    localStorage.setItem('cart', JSON.stringify(cart));
};

export const clearCart = () => {
    localStorage.removeItem('cart');
};
