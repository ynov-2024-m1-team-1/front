'use client'
import React from "react";
import UserDetailEdit from "@/components/user/UserDetailEdit";
import Image from 'next/image';


const Details = () => {

    const fakeData = {
        name: "John",
        surname: "Doe",
        email: "email@john.com",
        phone: "0123456789",
        address: "123, rue de la rue",
        town: "Paris",
        postalCode: "75000",
    }

    const handleClick = () => {
        console.log("Save profile");
    }

    return (
        <div className="bg-gray-100">
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md xl:w-1/2">
                    <h2 className="text-2xl font-bold mb-6">Account details</h2>
                    <div className="flex justify-between">
                        <div className="grid grid-flow-row gap-4">
                            {Object.keys(fakeData).map((key, index) => {
                                return (
                                    <UserDetailEdit keyName={key} key={index} data={fakeData[key]} />
                                );
                            })}
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image src="/user.png" alt="profile picture" width={128} height={128} />
                            <button className="bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-700" onClick={handleClick}>Save profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;