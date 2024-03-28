"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMe } from '@/services/api/user.api';
import Button from '@/components/UI/Button';

const GetMe = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    console.log(user);

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await getMe(token); 
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const handleWishlistClick = () => {
        router.push('/user/wishlist'); 
    };

    const handleOrdersClick = () => {
        router.push('/user/orders'); 
    };
    
    useEffect(() => {
        fetchUser();
        
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            {loading ? (
                <p>Chargement en cours...</p>
            ) : user ? (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-3xl font-semibold mb-4">Mon Compte</h2>
                    <div className="border-t border-gray-200 pt-4">
                        <p className="text-lg"><span className="font-semibold">Nom:</span> {user.name}</p>
                        <p className="text-lg"><span className="font-semibold">Email:</span> {user.email}</p>
                        {/* Autres informations de l'utilisateur si nécessaire */}
                    </div>
                    <div className="mt-6 flex justify-center space-x-4">
                        <Button title="Mes commandes" onClick={handleOrdersClick} />
                        <Button title="Ma liste de souhaits" onClick={handleWishlistClick} />
                    </div>
                </div>
            ) : (
                <p>Utilisateur non trouvé.</p>
            )}
        </div>
    );
};

export default GetMe;
