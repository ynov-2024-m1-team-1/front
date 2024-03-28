'use client';
import TitlePage from "@/components/UI/TitlePage";
import React, { useState, useEffect } from "react";
import UserTable from "@/components/UI/Table";
import useFetch from "@/hooks/useFetch";
import { getUsers } from "@/services/api/user.api";

const UserBackOffice = () => {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        getUsers(setUsers);
    }, []);

    const handleDeleteUser = (userId) => {
        const updatedUserList = userListTable.filter(user => user.id !== userId);
        setUserListTest(updatedUserList);
        console.log("L'utilisateur avec l'ID", userId, "a été supprimé avec succès.");
    };

    if (users === null)
        return (<div></div>)

    return (
        <div className="container mx-auto">
            <TitlePage title="Liste des utilisateurs" />
            <div className="min-h-screen">
                <div className="mb-8">
                    <UserTable data={users} type="user" handleDelete={handleDeleteUser} />
                </div>
            </div>
        </div>
    );
}

export default UserBackOffice;
