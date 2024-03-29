'use client';
import TitlePage from "@/components/UI/TitlePage";
import React, { useState, useEffect } from "react";
import UserTable from "@/components/UI/Table";
import useFetch from "@/hooks/useFetch";
import { getUsers } from "@/services/api/user.api";

const UserBackOffice = () => {

    const [users , setUsers] = useState(null)

    // const {fetchData, data, error, loading, typeofError} = useFetch({
    //     url: "/users",
    //     method: "GET",
    //     body: null,
    //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmM1NTJlNzE5ZTYwZTQ0Mjc3ZTI0MyIsImFkbWluIjp0cnVlLCJpYXQiOjE3MTEwMzU3MzgsImV4cCI6MTc0MjU3MTczOH0.tkyV116rstBp91zgR9iFzDRP0eDnQNc5TETAoFSXwok",
    // }); 

    

    useEffect(() => {
        getUsers(setUsers)
    }, [users]);

    const handleDeleteUser = (userId) => {
        const updatedUserList = userListTable.filter(user => user.id !== userId);
        setUserListTest(updatedUserList);
        console.log("L'utilisateur avec l'ID", userId, "a été supprimé avec succès.");
    };

    if (users === null)
        return (
        <div>
            <p>User list is empty !</p>
        </div>
        )

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
