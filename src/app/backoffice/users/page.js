"use client";
import TitlePage from "@/components/UI/TitlePage";
import React, { useState, useEffect } from "react";
import UserTable from "@/components/UI/Table";
import { getUsers } from "@/services/api/user.api";
import { getCookie } from "cookies-next";

const UserBackOffice = () => {
    const [usersList, setUsersList] = useState(null);

    useEffect(() => {
        getUsers(setUsersList);
    }, []);

    const token = getCookie("token");

    const confirmDelete = (itemId) => {
        if (
            window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")
        ) {
            handleDeleteUser(itemId);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/delete/${id}`,
                {
                    method: "DELETE",
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const updatedUsers = usersList.data.filter(
                (user) => user._id !== id
            );
            setUsersList(updatedUsers);
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la suppression du user", error);
        }
    };

    if (usersList === null) return <div></div>;

    return (
        <div className="container mx-auto bg-gray-100">
            <TitlePage title="Liste des utilisateurs" />
            <div className="min-h-screen">
                <div className="mb-8">
                    <UserTable
                        data={usersList}
                        type="user"
                        handleDelete={confirmDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserBackOffice;
