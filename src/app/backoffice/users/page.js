"use client";
import TitlePage from "@/components/UI/TitlePage";
import React, { useState, useEffect } from "react";
import UserTable from "@/components/UI/Table";
import useFetch from "@/hooks/useFetch";
import { getUsers } from "@/services/api/user.api";

const UserBackOffice = () => {
    const [usersList, setUsersList] = useState(null)

    useEffect(() => {
        getUsers(setUsersList);
    }, []);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmM1NTJlNzE5ZTYwZTQ0Mjc3ZTI0MyIsImFkbWluIjp0cnVlLCJpYXQiOjE3MTI5MTYwNTYsImV4cCI6MTc0NDQ1MjA1Nn0.dfDN0S_-htGFENo2FhJD3Cj9CKuubl2GYsm_Me5sYDc";

    const confirmDelete = (itemId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
            handleDeleteUser(itemId);
        }
    };
    // useEffect(() => {
    //     getUsers(setUsersList);
    // }, [setUsersList]);

    const handleDeleteUser = async (id) => {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/delete/${id}`,
                {
                    method: "DELETE",
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            const updatedUsers = usersList.data.filter(
                (user) => user._id !== id
            );
            setUsersList(updatedUsers);
            window.location.reload();
            console.log("L'utilisateur avec l'ID", userId, "a été supprimé avec succès.");
        } catch (error) {
            console.error("Erreur lors de la suppression du user", error);
        }
    };

    if (usersList === null)
        return (<div></div>)

    return (
        <div className="container mx-auto">
            <TitlePage title="Liste des utilisateurs" />
            <div className="min-h-screen">
                <div className="mb-8">
                    <UserTable data={usersList} type="user" handleDelete={confirmDelete} />
                </div>
            </div>
        </div>
    );
};

export default UserBackOffice;
