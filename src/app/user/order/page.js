"use client";
import React, { useEffect, useState } from "react";
import OrderTable from "@/components/UI/Table";
import jwt from "jsonwebtoken";
// import useFetch from "@/hooks/useFetch";
import { getUser } from "@/services/api/user.api";

const UserProfilePage = () => {
    const [userData, setUserData] = useState(null);

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmM1NTJlNzE5ZTYwZTQ0Mjc3ZTI0MyIsImFkbWluIjp0cnVlLCJpYXQiOjE3MTE2MjAyNTgsImV4cCI6MTc0MzE1NjI1OH0.63XbGzX5Qx0YVGfCjM1BJF9pX0MhdxTjjOwrUo4sjwE";
    const dec = jwt.decode(token);
    const userId = dec.id;

    useEffect(() => {
        const fetchOrder = async () => {
            let order = await getUser(userId);
            if (order) {
                setUserData(order.data);
            }
        };
        if (userId) {
            fetchOrder();
        }
    }, [userId]);

    // const { fetchData, data, error, loading, typeofError } = useFetch({
    //     url: `/users/${userId}`,
    //     method: "GET",
    //     body: null,
    //     token: null,
    // });

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     if (data) {
    //         setUserData(data);
    //     }
    // }, [data]);

    console.log("User data", userData);
    return (
        <div>
            <h1>Mes commandes</h1>
            <div className="min-h-screen">
                <div className="mb-8">
                    <OrderTable data={userData} type="order" />
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
