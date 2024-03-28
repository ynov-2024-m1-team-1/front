// import React, { useEffect, useState } from 'react';

const OrdersPage = () => {
    // const [orders, setOrders] = useState([]);

    // useEffect(() => {
    //     // Appel à l'API pour récupérer les commandes en cours
    //     const fetchOrders = async () => {
    //         try {
    //             const response = await fetch('/api/orders');
    //             const data = await response.json();
    //             setOrders(data);
    //         } catch (error) {
    //             console.error('Erreur lors de la récupération des commandes:', error);
    //         }
    //     };

    //     fetchOrders();
    // }, []);

    return (
        <div>
            <h1>Mes commandes en cours</h1>
            {/* {orders.length === 0 ? (
                <p>Aucune commande en cours.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <p>Numéro de commande : {order.orderNumber}</p>
                            <p>Date de commande : {order.orderDate}</p>
                        </li>
                    ))}
                </ul>
            )} */}
        </div>
    );
};

export default OrdersPage;