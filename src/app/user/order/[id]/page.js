"use client"
import React, { useEffect, useState } from "react";
import OrderTable from "@/components/UI/Table";



const UserProfilePage = () => {
    

    return (
        <div>
            <h1>Ma commande</h1>
            <div className="min-h-screen">
                <div className="mb-8">
                    <OrderTable data={userData} type="orderDetail" />
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
