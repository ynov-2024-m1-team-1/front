'use client';
import TitlePage from "@/components/UI/TitlePage";
import React, { useState, useEffect } from "react";
import UserTable from "@/components/UI/Table";
// import { getUsers, deleteUser } from "@/services/api/user.api";

const UserBackOffice = () => {

    const {fetchData, data, error, loading, typeofError} = useFetch({
        url: "/users",
        method: "GET",
        body: null,
        token: null,
    }); 

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = (userId) => {
        const updatedUserList = userListTable.filter(user => user.id !== userId);
        setUserListTest(updatedUserList);
        console.log("L'utilisateur avec l'ID", userId, "a été supprimé avec succès.");
    };

    return (
        <div className="container mx-auto">
            <TitlePage title="Liste des utilisateurs" />
            <div className="min-h-screen">
                <div className="mb-8">
                    <UserTable data={data} type="user" handleDelete={handleDeleteUser} />
                </div>
            </div>
        </div>
    );
}

export default UserBackOffice;
