// import React, { useState, useEffect } from 'react';

const WishlistPage = ({wishlist}) => {
    console.log(wishlist);
    // const [wishlistItems, setWishlistItems] = useState([]);

    // useEffect(() => {
    //     // Code pour récupérer les éléments de la liste de souhaits depuis le backend
    //     // et les mettre à jour dans le state wishlistItems
    // }, []);

    return (
        <div>
            <h1>Ma liste de souhaits</h1>
            {/* {wishlistItems.length === 0 ? (
                <p>Aucun élément dans la liste de souhaits.</p>
            ) : (
                <ul>
                    {wishlistItems.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )} */}
        </div>
    );
};

export default WishlistPage;