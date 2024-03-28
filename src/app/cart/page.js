  "use client";
  import React, { useState, useEffect } from 'react';
  import TitlePage from "@/components/UI/TitlePage";

  const Cart = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
      if (localStorage.getItem('cart')) {
        const idsString = localStorage.getItem('cart');
        const idsArray = JSON.parse(idsString);
    
        idsArray.forEach(id => {
          fetch(`https://team-api.faldin.xyz/api/products/${id}`)
            .then(response => response.json())
            .then(responseData => {
              if (responseData && responseData.data && responseData.data.products) {
                const productData = responseData.data.products;
                setProduct(prevState => [...prevState, productData]);
              } else {
                console.error('Les données du produit sont manquantes ou incorrectes.');
              }
            })
            .catch(error => console.error('Erreur lors de la récupération des détails du produit:', error));
        });
      } else {
        console.log("Pas d'array d'IDs dans le localStorage avec la clé 'cart'.");
      }
    }, []);

    const removeItemFromCart = (itemId) => {
      const updatedProduct = product.filter((item) => item.id !== itemId);
      setProduct(updatedProduct);
      localStorage.setItem("cart", JSON.stringify(updatedProduct.map(item => item.id)));
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
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className='text-s text-white uppercase bg-neutral-900 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Nom</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Prix</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {product.length > 0 ? (
                  product.map((item, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900" key={index}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.description}</td>
                      <td className="px-6 py-4">{item.price}€</td>
                      <td className="px-6 py-4">
                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => removeItemFromCart(item.id)}>Supprimer</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">Pas d'articles dans le panier.</td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-neutral-900 dark:bg-gray-700 dark:text-gray-400 text-white text-center">
                <tr className="text-s text-white uppercase bg-neutral-900 dark:bg-gray-700 dark:text-gray-400">
                  <th scope="row" className="px-6 py-3 uppercase">Total de produit</th>
                  <td colSpan="4" className="px-6 py-3 font-semibold">{product.length}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          ) : (
            <div>
              <p>Pas d'articles dans le panier.</p>
            </div>
          )}
          <button onClick={clearCart}>Vider le panier</button>
          <br/>
          <button>Annuler la transaction</button>
          <br/>
          <button>Accepter la transaction</button>
        </div>
      </div>
    );
  };

  export default Cart;
