"use client";

import React, { useEffect, useState } from 'react';
import { getMe } from '@/services/api/user.api';

const GetMe = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
    
    useEffect(() => {
        fetchUser();
        
    }, []);

    return (
        <div>
            {loading ? (
                <p>Chargement en cours...</p>
            ) : user ? (
                <div>
                    <h2>Mon Compte</h2>
                    <p>Nom: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {/* Display other user information if necessary */}
                </div>
            ) : (
                <p>Utilisateur non trouvé.</p>
            )}
        </div>
    );
};

export default GetMe;
